import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,
     createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged} from 'firebase/auth';
import {getFirestore, getDoc, doc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDy7oMz3T6GvOm5tHwaikL0N1HElZivxuM",
    authDomain: "roa-clothing-dm.firebaseapp.com",
    projectId: "roa-clothing-dm",
    storageBucket: "roa-clothing-dm.appspot.com",
    messagingSenderId: "790168471120",
    appId: "1:790168471120:web:38d71af5b580921b343355"
}

export const firebaseApp = initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase());
        batch.set(docRef, object);
    })

    await batch.commit();

    console.log('done');
}

export const getCategoriesAndDocuments =  async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapShot) => {
        const {title, items} = docSnapShot.data();
        acc[title.toLowerCase()] = items;

        return acc;
    }, {})

    return categoryMap;
}

export const createUserDocFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const creatAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                creatAt,
                ...additionalInfo
            });
        } catch(error){
            console.log('error creating user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
 
    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return;
 
    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListerner = (callback) => onAuthStateChanged(auth, callback)