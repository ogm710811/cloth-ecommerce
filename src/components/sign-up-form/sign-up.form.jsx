import { useState } from 'react';
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';
import FormInput from '../form-input/form-input.component';
import './sign-up-form.styles.scss';


const SignUpForm = () => {
  const initialFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  // const {setCurrentUser} = useContext(UserContext)

  const [formFields, setFormFields] = useState(initialFormFields);
  const {displayName, email, password, confirmPassword} = formFields;

  const changeHandler = (e) => {
    setFormFields({...formFields, [e.target.name]: e.target.value});
  };

  const resetFormFields = () => {
    setFormFields(initialFormFields);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords don\'t match');
    }
    try {
      const {user} = await createAuthUserWithEmailAndPassword(email, password);
      await createUserDocumentFromAuth(user, {displayName});
      // setCurrentUser(user)
      resetFormFields();
    } catch (e) {
      if (e.code === 'auth/email-already-in-use') {
        alert('Email already in use');
      } else {
        console.log('error creating user with email and password', e);
      }
      resetFormFields();
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don&apos;t have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="Display Name"
          inputOptions={{
            required: true,
            type: 'text',
            id: 'displayName',
            name: 'displayName',
            value: displayName,
            onChange: changeHandler
          }}

        />
        <FormInput
          label="Email"
          inputOptions={{
            required: true,
            type: 'email',
            id: 'email',
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
            id: 'password',
            name: 'password',
            value: password,
            onChange: changeHandler
          }}
        />
        <FormInput
          label="Confirm Password"
          inputOptions={{
            required: true,
            type: 'password',
            id: 'confirmPassword',
            name: 'confirmPassword',
            value: confirmPassword,
            onChange: changeHandler
          }}
        />

        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  );
};

export default SignUpForm;