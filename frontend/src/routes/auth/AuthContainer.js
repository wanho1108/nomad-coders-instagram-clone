import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, CREATE_ACCOUNT } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
  const [action, setAction] = useState('logIn');
  const email = useInput('');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const [requestSecret] = useMutation(LOG_IN, {
    variables: {
      email: email.value
    },
    update: ({ data }) => {
      const { requestSecret } = data;
      if (!requestSecret) {
        toast.error(`You don't have an account yet, create one`);
        setTimeout(() => setAction('signUp'), 3000);
      }
    }
  });
  const [createAccount] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastNmae: lastName.value
    }
  })
  const submitHandler = e => {
    e.preventDefault();

    if (action === 'logIn') {
      if (email.value !== '') {
        requestSecret();
      } else {
        toast.error('Email is required');
      }
    } else if (action === 'signUp') {
      if (
        email.value !== ''
        && username.value !== ''
        && firstName.value !== ''
        && lastName.value !== ''
      ) {
        createAccount();
      } else {
        toast.error('All field are required');
      }
    }
  };

  return (
    <AuthPresenter
      action={action}
      setAction={setAction}
      email={email}
      username={username}
      firstName={firstName}
      lastName={lastName}
      submitHandler={submitHandler}
    />
  );
}