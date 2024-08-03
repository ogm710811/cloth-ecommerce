import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch
} from 'firebase/firestore';

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBp-6wihwXQc2uV8h6pijuUlAZNmKObhms',
  authDomain: 'cloth-ecommerce-db-c6326.firebaseapp.com',
  projectId: 'cloth-ecommerce-db-c6326',
  storageBucket: 'cloth-ecommerce-db-c6326.appspot.com',
  messagingSenderId: '697071047534',
  appId: '1:697071047534:web:9f3fc371e7fe1bca7e277f'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account'
});

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey)
  const batch = writeBatch(db);

  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef, obj.title.toLowerCase());
    batch.set(newDocRef, obj);
  });

  await batch.commit();
  console.log('Add collection and docs DONE')
}

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const {title, items} = docSnapshot.data();
    acc[title.toLowerCase()] = items
    return acc;
  }, {})

  return categoryMap;
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  const usersDocumentRef = doc(db, 'users', userAuth.uid);
  // console.log(usersDocumentRef)

  const usersSnapshot = await getDoc(usersDocumentRef);
  // console.log(usersSnapshot);
  // console.log(usersSnapshot.exists());

  if (!usersSnapshot.exists()) {
    try {
      await setDoc(usersDocumentRef, {
        displayName: userAuth.displayName,
        email: userAuth.email,
        createdAt: new Date(),
        ...additionalInformation
      });
    } catch (error) {
      console.error('error setting Firebase user document', error.message);
    }
  }
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}

export const singInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => {
  return await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth, callback)
}