import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User, signOut } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit, DocumentData } from 'firebase/firestore';
import firebaseConfig from '../firebase-applet-config.json';

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Provider with Drive Scopes for user's Google Drive images and files
export const provider = new GoogleAuthProvider();
provider.addScope('https://www.googleapis.com/auth/drive.readonly');
provider.addScope('https://www.googleapis.com/auth/drive.metadata.readonly');
provider.addScope('https://www.googleapis.com/auth/drive.file');

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // Token might have expired or not fetched yet. Let's default to no token cached
        if (onAuthFailure) onAuthFailure();
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

// Sign in with Google
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Drive access token from authentication.');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = (): string | null => {
  return cachedAccessToken;
};

export const setAccessToken = (token: string | null) => {
  cachedAccessToken = token;
};

export const logout = async () => {
  await signOut(auth);
  cachedAccessToken = null;
};

// --- Firestore Helpers for Internal Lab Project Files & Data ---
export const saveInternalFile = async (fileData: {
  title: string;
  description: string;
  uploadedBy: string;
  category: string;
  fileSize: string;
  downloadUrl?: string;
}) => {
  try {
    const docRef = await addDoc(collection(db, 'internal_files'), {
      ...fileData,
      uploadedAt: new Date().toISOString(),
    });
    return docRef.id;
  } catch (error) {
    console.error('Error saving file metadata to Firestore:', error);
    throw error;
  }
};

export const fetchInternalFiles = async (): Promise<any[]> => {
  try {
    const q = query(collection(db, 'internal_files'), orderBy('uploadedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const files: any[] = [];
    querySnapshot.forEach((doc) => {
      files.push({ id: doc.id, ...doc.data() });
    });
    return files;
  } catch (error) {
    console.error('Error fetching internal files from Firestore:', error);
    // Return mock initial files if database collection is empty or fails (e.g. index build)
    return [];
  }
};
