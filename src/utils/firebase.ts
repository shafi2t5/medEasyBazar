import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBDmvX2dsSkGVobsaaX5OnAJxgnJwR_EEg',
  authDomain: 'phone-number-validation-94959.firebaseapp.com',
  projectId: 'phone-number-validation-94959',
  storageBucket: 'phone-number-validation-94959.appspot.com',
  messagingSenderId: '922736946567',
  appId: '1:922736946567:web:21b65c48e0676fac9df722',
  measurementId: 'G-HMD983T7FJ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
