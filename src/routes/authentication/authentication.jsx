import SignUpForm from "../../components/sign-up-form/sign-up";
import SignIn from "../../components/sign-in/sign-in";
import './authentication.scss';

export default function Authentication(){
    return(
        <div className="auth-container">
            <SignIn />
            <SignUpForm />
        </div>
    );
}