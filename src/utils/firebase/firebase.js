import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword} from 'firebase/auth';
import {getFirestore, getDoc, doc, setDoc} from 'firebase/firestore'

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
