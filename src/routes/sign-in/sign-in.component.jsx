import {createUserDocumentFromAuth, signInWithGooglePopup} from "../../utils/firebase.utils";
import SignUpFormComponent from "../../components/sign-up-form/sign-up-form.component";

const SignIn = () => {
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup()
      await createUserDocumentFromAuth(user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>

            <SignUpFormComponent />
        </div>
    )
}

export default SignIn;