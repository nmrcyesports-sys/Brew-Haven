import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyByFdo9SX_TYpmCQUt81t3DbQbtw95HFY0",
  authDomain: "brew-haven-4ed29.firebaseapp.com",
  projectId: "brew-haven-4ed29",
  storageBucket: "brew-haven-4ed29.firebasestorage.app",
  messagingSenderId: "444549694528",
  appId: "1:444549694528:web:a3c5ad8a10d9a630878ba5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app, "ai-studio-baf45168-aefa-442c-8ae6-54e5cbf06b4e");
export const googleProvider = new GoogleAuthProvider();
