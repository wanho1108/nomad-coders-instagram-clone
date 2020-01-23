import React, { useState } from 'react';
import AuthPresenter from './AuthPresenter';
import useInput from '../../hooks/useInput';
import { useMutation } from 'react-apollo-hooks';
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from './AuthQueries';
import { toast } from 'react-toastify';

export default () => {
  const [action, setAction] = useState('logIn');
  const email = useInput('');
  const username = useInput('');
  const firstName = useInput('');
  const lastName = useInput('');
  const secret = useInput('');
  const [requestSecretMutation] = useMutation(LOG_IN, {
    variables: {
      email: email.value
    }
  });
  const [createAccountMutation] = useMutation(CREATE_ACCOUNT, {
    variables: {
      email: email.value,
      username: username.value,
      firstName: firstName.value,
      lastNmae: lastName.value
    }
  });
  const [confirmSecretMutation] = useMutation(CONFIRM_SECRET, {
    variables: {
      secret: secret.value,
      email: email.value
    }
  });
  const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
  const submitHandler = async e => {
    e.preventDefault();

    if (action === 'logIn') {
      if (email.value !== '') {
        try {
          const { data: { requestSecret } } = await requestSecretMutation();
          if (!requestSecret) {
            toast.error(`You don't have an account yet, create one`);
            setTimeout(() => setAction('signUp'), 3000);
          } else {
            toast.success('Check your inbox for your login secret');
            setAction('confirm');
          }
        } catch {
          toast.error(`Can't request secret, try agin`);
        }
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
        try {
          const { data: { createAccount } } = await createAccountMutation();
          if (!createAccount) {
            toast.error(`Can't create account`);
          } else {
            toast.success('Account create! log In now');
            setTimeout(() => setAction('logIn'), 3000);
          }
        } catch (e) {
          toast.error(e.message);
        }
      } else {
        toast.error('All field are required');
      }
    } else if (action === 'confirm') {
      if (secret.value !== '') {
        try {
          const { data: { confirmSecret: token } } = await confirmSecretMutation();

          if (token !== '' && token !== undefined) {
            localLogInMutation({ variables: { token }});
          } else {
            throw Error();
          }
        } catch {
          toast.error(`Can't confirm secret, check agin`);
        }
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
      secret={secret}
      submitHandler={submitHandler}
    />
  );
}