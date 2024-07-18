import {createUserDocumentFromGoogleAuth, signInWithGooglePopup} from "../../utils/firebase.utils";

const SignIn = () => {
    const logGoogleUser = async () => {
      const { user } = await signInWithGooglePopup()
      await createUserDocumentFromGoogleAuth(user)
    }
    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign in with Google</button>
        </div>
    )
}

export default SignIn;