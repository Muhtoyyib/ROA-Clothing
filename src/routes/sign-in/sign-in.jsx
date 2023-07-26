// import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
{ /*auth, signInWithGoogleRedirect */}
import SignUpForm from "../../components/sign-up-form/sign-up";
import { signInWithGooglePopup, createUserDocFromAuth } from "../../utils/firebase/firebase";

export default function SignIn(){
        // useEffect(() => {
        //    const fetchData = async () => {
        //     const {user} = await getRedirectResult(auth);

        //     if(user){
        //         const userDocRef = await createUserDocFromAuth(user);  
        //         console.log(userDocRef);
        //     }
        //    }

        //    fetchData();
        // }, [])
    
    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();

        const userDocRef = await createUserDocFromAuth(user);

        console.log(userDocRef);
    }
    
    return(
        <>
            <h1>SignIn</h1>
            <button onClick={logGoogleUser}>Sign in with Google Popup</button>
            {/*<button onClick={signInWithGoogleRedirect}>Sign in with Google Popup</button>*/}

            <SignUpForm />
        </>
    );
}