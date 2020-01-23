import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN } from './AuthQueries';

export default () => {
  const [action, setAction] = useState('logIn');
  const email = useInput('');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const [requestSecret] = useMutation(LOG_IN, {
    variables: {
      email: email.value
    }
  });
  const loginHandler = e => {
    e.preventDefault();

    if (email !== '') {
      requestSecret();
    }
  };

  return (
    <AuthPresenter
      action={action}
      setActino={setAction}
      email={email}
      username={username}
      firstName={firstName}
      lastName={lastName}
      loginHandler={loginHandler}
    />
  );
}