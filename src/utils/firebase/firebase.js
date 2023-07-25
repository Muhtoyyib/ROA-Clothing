import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect,} from 'firebase/auth';
import {getFirestore, getDoc, doc, setDoc} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDy7oMz3T6GvOm5tHwaikL0N1HElZivxuM",
    authDomain: "roa-clothing-dm.firebaseapp.com",
    projectId: "roa-clothing-dm",
    storageBucket: "roa-clothing-dm.appspot.com",
    messagingSenderId: "790168471120",
    appId: "1:790168471120:web:38d71af5b580921b343355"
}

const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapShot = await getDoc(userDocRef);
    console.log(userSnapShot);
    console.log(userSnapShot.exists());

    if(!userSnapShot.exists()){
        const {displayName, email} = userAuth;
        const creatAt = new Date();

        try{
            await setDoc(userDocRef, {
                displayName, email, creatAt
            });
        } catch(error){
            console.log('error creating user', error.message);
        }

        return userDocRef;
    }
}
