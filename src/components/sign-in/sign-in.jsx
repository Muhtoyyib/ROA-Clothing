import { useState} from "react";
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword} from "../../utils/firebase/firebase";

import FormInput from "../form-input/form-input";
import Button from "../button/button";
import './sign-in.scss'


// eslint-disable-next-line react-refresh/only-export-components
export const defaultFormFields = {
    email: '',
    password: '',
}

export default function SignInForm (){
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {email, password} = formFields;

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try{
            await signInAuthUserWithEmailAndPassword(email, password);

            resetFormFields();
        } catch (error){

            switch(error.code){
                case 'auth/wrong-password': alert('Incorrect Password');
                break;
                case 'auth/user-not-found': alert('User does not exist');
                break;
                default: console.log(error);
            }
        }

    }

    const signInWithGoogle = async () => {
        await signInWithGooglePopup();
    }

    return(
        <div className="sign-in-container">
            <h2>Already have an account?</h2>

            <span className="sign-in-paragraph">Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Email' inputOptions = {{
                    type: "email", 
                    required: true,
                    onChange: handleChange, 
                    name:"email",
                    value: email
                }} />
                <FormInput label='Password' inputOptions = {{
                    type: "password", 
                    required: true,
                    onChange: handleChange, 
                    name:"password",
                    value:password
                }}/>

                <div className="buttons-container">
                    <Button type='submit' buttonText={`SIGN IN`}/>
                    <Button type='button' buttonText={`GOOGLE SIGN IN`} buttonType={`google`} onClick={signInWithGoogle}/>
                </div>
            </form>
        </div>
    )
}

// Using signInWithRedirect

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

{/*
    <button onClick={logGoogleUser}>Sign in with Google Popup</button>
    <button onClick={signInWithGoogleRedirect}>Sign in with Google Popup</button>
*/}

            // import { useEffect } from "react";
// import { getRedirectResult } from "firebase/auth";
{ /*auth, signInWithGoogleRedirect */}