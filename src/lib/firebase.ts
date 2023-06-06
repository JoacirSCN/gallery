import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBpYyBpYyTp3uXNOv1GTrJPIdYsk7poSpo',
  authDomain: 'd5reactgallery-2070d.firebaseapp.com',
  projectId: 'd5reactgallery-2070d',
  storageBucket: 'd5reactgallery-2070d.appspot.com',
  messagingSenderId: '938283561764',
  appId: '1:938283561764:web:c2f43541b8b7bbc0c379b1',
}

const firebaseApp = initializeApp(firebaseConfig)
export const storage = getStorage(firebaseApp)
