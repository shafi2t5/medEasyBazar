import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyAfVtPb0xRVcwUvk6vkyUZ4YZRqoS65bi8',
  authDomain: 'api-project-70997319889.firebaseapp.com',
  databaseURL: 'https://api-project-70997319889.firebaseio.com',
  projectId: 'api-project-70997319889',
  storageBucket: 'api-project-70997319889.appspot.com',
  messagingSenderId: '70997319889',
  appId: '1:70997319889:web:4694c9be2f2c4f087225f0',
  measurementId: 'G-8RSQ31HHLQ',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
