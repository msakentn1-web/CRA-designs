import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import firebaseConfig from '../../firebase-applet-config.json';

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
// Add required scopes
provider.addScope('https://www.googleapis.com/auth/drive');
provider.addScope('https://www.googleapis.com/auth/gmail.send');
provider.addScope('https://www.googleapis.com/auth/gmail.readonly');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else {
        // If we have a user but no cached token (e.g. on page refresh), 
        // we might need to prompt login again to get a fresh access token,
        // or wait for the user to click login to fetch it.
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Google Sign-in popup to retrieve credentials
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to get access token from Google Auth');
    }
    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Workspace Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const logoutWorkspace = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// ==========================================
// Google Drive API Helpers
// ==========================================

export interface DriveFile {
  id: string;
  name: string;
  mimeType: string;
  webViewLink: string;
  iconLink?: string;
  modifiedTime: string;
  size?: string;
}

export const listDriveFiles = async (accessToken: string): Promise<DriveFile[]> => {
  try {
    const response = await fetch(
      'https://www.googleapis.com/drive/v3/files?pageSize=15&fields=files(id,name,mimeType,webViewLink,iconLink,modifiedTime,size)&q=trashed=false&orderBy=modifiedTime%20desc',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Drive API error: ${response.status} - ${errorText}`);
    }
    const data = await response.json();
    return data.files || [];
  } catch (error) {
    console.error('Error listing Drive files:', error);
    throw error;
  }
};

// Create a workspace folder for the agency to group uploads
export const getOrCreateWorkspaceFolder = async (accessToken: string): Promise<string> => {
  try {
    // Check if folder already exists
    const searchRes = await fetch(
      `https://www.googleapis.com/drive/v3/files?q=name='CRA_DESIGN_WORKSPACE'%20and%20mimeType='application/vnd.google-apps.folder'%20and%20trashed=false&fields=files(id)`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const searchData = await searchRes.json();
    if (searchData.files && searchData.files.length > 0) {
      return searchData.files[0].id;
    }

    // Create the folder if it doesn't exist
    const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: 'CRA_DESIGN_WORKSPACE',
        mimeType: 'application/vnd.google-apps.folder',
        description: 'مجلد ملفات التصميم والتواصل مع CRA DESIGN',
      }),
    });
    const createData = await createRes.json();
    return createData.id;
  } catch (error) {
    console.error('Error creating workspace folder:', error);
    throw error;
  }
};

// Upload file to specific Google Drive folder
export const uploadFileToDrive = async (
  accessToken: string,
  file: File,
  folderId?: string
): Promise<DriveFile> => {
  try {
    const metadata: any = {
      name: file.name,
    };
    if (folderId) {
      metadata.parents = [folderId];
    }

    const boundary = 'foo_bar_baz_boundary';
    const delimiter = `\r\n--${boundary}\r\n`;
    const closeDelimiter = `\r\n--${boundary}--`;

    const fileReader = new FileReader();
    const fileDataPromise = new Promise<string>((resolve) => {
      fileReader.onload = () => {
        const binary = fileReader.result as string;
        resolve(binary);
      };
      fileReader.readAsBinaryString(file);
    });

    const binaryContent = await fileDataPromise;

    const multipartRequestBody =
      delimiter +
      'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
      JSON.stringify(metadata) +
      delimiter +
      `Content-Type: ${file.type || 'application/octet-stream'}\r\n` +
      'Content-Transfer-Encoding: binary\r\n\r\n' +
      binaryContent +
      closeDelimiter;

    const response = await fetch(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,mimeType,webViewLink,iconLink,modifiedTime,size',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': `multipart/related; boundary=${boundary}`,
        },
        body: multipartRequestBody,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Drive Upload error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error uploading file to Drive:', error);
    throw error;
  }
};

// ==========================================
// Gmail API Helpers
// ==========================================

export interface GmailMessage {
  id: string;
  snippet: string;
  subject?: string;
  from?: string;
  to?: string;
  date?: string;
  body?: string;
}

// Convert normal Base64 to web-safe Base64url encoding
const base64urlEncode = (str: string): string => {
  const binary = encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, p1) => {
    return String.fromCharCode(parseInt(p1, 16));
  });
  return btoa(binary)
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
};

// Send email using Gmail API
export const sendGmailMessage = async (
  accessToken: string,
  to: string,
  subject: string,
  htmlBody: string
): Promise<any> => {
  try {
    const emailParts = [
      `To: ${to}`,
      `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
      'MIME-Version: 1.0',
      'Content-Type: text/html; charset=utf-8',
      'Content-Transfer-Encoding: 7bit',
      '',
      htmlBody,
    ];
    const emailContent = emailParts.join('\r\n');
    const raw = base64urlEncode(emailContent);

    const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ raw }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gmail Send error: ${response.status} - ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

// List recent emails (messages) and fetch detail for each
export const listGmailMessages = async (accessToken: string): Promise<GmailMessage[]> => {
  try {
    // List messages
    const listRes = await fetch(
      'https://gmail.googleapis.com/gmail/v1/users/me/messages?maxResults=8',
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    if (!listRes.ok) {
      const errorText = await listRes.text();
      throw new Error(`Gmail List error: ${listRes.status} - ${errorText}`);
    }
    const listData = await listRes.json();
    const messages = listData.messages || [];

    // Fetch details for each message in parallel
    const detailPromises = messages.map(async (msg: { id: string }) => {
      try {
        const detailRes = await fetch(
          `https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`,
          {
            headers: { Authorization: `Bearer ${accessToken}` },
          }
        );
        if (!detailRes.ok) return null;
        const detailData = await detailRes.json();

        // Extract headers
        const headers = detailData.payload?.headers || [];
        const subject = headers.find((h: any) => h.name.toLowerCase() === 'subject')?.value || '(بدون عنوان)';
        const from = headers.find((h: any) => h.name.toLowerCase() === 'from')?.value || '';
        const to = headers.find((h: any) => h.name.toLowerCase() === 'to')?.value || '';
        const dateHeader = headers.find((h: any) => h.name.toLowerCase() === 'date')?.value || '';

        // Try to format date
        let formattedDate = dateHeader;
        try {
          const parsed = new Date(dateHeader);
          if (!isNaN(parsed.getTime())) {
            formattedDate = parsed.toLocaleString('ar-EG', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            });
          }
        } catch (_) {}

        return {
          id: msg.id,
          snippet: detailData.snippet || '',
          subject,
          from,
          to,
          date: formattedDate,
        };
      } catch (e) {
        console.error(`Error fetching message ${msg.id}:`, e);
        return null;
      }
    });

    const results = await Promise.all(detailPromises);
    return results.filter((r) => r !== null) as GmailMessage[];
  } catch (error) {
    console.error('Error listing Gmail messages:', error);
    throw error;
  }
};
