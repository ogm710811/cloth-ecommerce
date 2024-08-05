import { useState } from 'react';
import { signInWithGooglePopup, singInUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-in-form.styles.scss';


const SignInForm = () => {
  const initialFormFields = {
    email: '',
    password: ''
  };

  const [formFields, setFormFields] = useState(initialFormFields);
  const {email, password} = formFields;

  // const {setCurrentUser} = useContext(UserContext)

  const changeHandler = (e) => {
    setFormFields({...formFields, [e.target.name]: e.target.value});
  };

  const resetFormFields = () => {
    setFormFields(initialFormFields);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await singInUserWithEmailAndPassword(email, password);
      // const {user} = await singInUserWithEmailAndPassword(email, password);
      // console.log(user)
      // setCurrentUser(user)
      resetFormFields();
    } catch (e) {
      switch (e.code) {
      case 'auth/invalid-credential':
        alert('Invalid credentials, try again');
        break;
      default:
        console.log('error sign in user with email and password', e);
      }
      resetFormFields();
    }
  };

  const signWithGoogleHandler = async () => {
    await signInWithGooglePopup();
    // const { user } = await signInWithGooglePopup()
    // await createUserDocumentFromAuth(user)
    // setCurrentUser(user)
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Email"
          inputOptions={{
            required: true,
            type: 'email',
            id: 'email-in',
            name: 'email',
            value: email,
            onChange: changeHandler
          }}
        />
        <FormInput
          label="Password"
          inputOptions={{
            required: true,
            type: 'password',
            id: 'password-in',
            name: 'password',
            value: password,
            onChange: changeHandler
          }}
        />
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonStyle="google"
            onClick={signWithGoogleHandler}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;