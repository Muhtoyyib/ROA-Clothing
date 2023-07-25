import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase";

export default function SignIn(){
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();

        const userDocRef = await createUserDocFromAuth(user);
    }
    return(
        <>
            <h1>SignIn</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
        </>
    );
}