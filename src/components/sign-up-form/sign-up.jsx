import { useState, useContext } from "react";

import FormInput from "../form-input/form-input";
import Button from "../button/button";
import { UserContext } from "../../context/user";
import { createAuthUserWithEmailAndPassword, createUserDocFromAuth } from "../../utils/firebase/firebase";

import './sign-up.scss'


// eslint-disable-next-line react-refresh/only-export-components
export const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

export default function SignUpForm (){
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;
    const { setCurrentUser } = useContext(UserContext);

    console.log(formFields);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(password !== confirmPassword){
            alert('Password do not match');
            return;
        }

        try{
            const {user}= await createAuthUserWithEmailAndPassword(email, password);
            setCurrentUser(user);

            await createUserDocFromAuth(user, {displayName});
            resetFormFields();
        } catch (error){
            if(error.code === 'auth/email-already-in-use'){
                alert('Email ALready in use');
            } else{
                console.log(`User creation encountered an ${error}`);
            }

            resetFormFields();
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;

        setFormFields({...formFields, [name]: value});
    }

    return(
        <div className="sign-up-container">
            <h2>Don&apos;t have an account?</h2>

            <span>Sign up with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput label='Display Name' inputOptions ={{
                    type: "text", 
                    required: true,
                    onChange: handleChange, 
                    name:"displayName",
                    value:displayName
                }}/>
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
                <FormInput label='Confirm Password' inputOptions = {{
                    type: "password", 
                    required: true,
                    onChange: handleChange, 
                    name:"confirmPassword",
                    value: confirmPassword
                }}/>

                {// eslint-disable-next-line react/no-children-prop
                <Button type="submit" buttonText={`SIGN UP`}/> 
                }
            </form>
        </div>
    )
}