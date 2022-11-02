import { useState } from 'react';
import Router from 'next/router';
import InputElement from '../../components/UIElements/InputElement/InputElement';
import ButtonElement from '../../components/UIElements/ButtonElement/ButtonElement';
import useRequest from '../../hooks/useRequest';

const defaultState = {
  email: '',
  password: '',
};

const SignupForm = () => {
  const [formState, setFormState] = useState(defaultState);
  const [errors, sendRequest] = useRequest({
    method: 'post',
    url: '/api/users/signup',
    body: formState,
    onSuccess: () => Router.push('/'),
  });

  const updateState = (type, input) => {
    setFormState(prevState => ({ ...prevState, [type]: input.target.value }));
  };

  const onSubmit = () => {
    sendRequest();
  };

  return (
    <div className={'signup-container'}>
      <h1 className={'primary-color'}>Sign Up</h1>
      <InputElement
        label={'Email Address:'}
        inputType={'text'}
        value={formState.email}
        insertFunc={updateState.bind(this, 'email')}
        name={'email'}
        placeholder={'Email'}
      />
      <InputElement
        label={'Password:'}
        inputType={'text'}
        value={formState.password}
        insertFunc={updateState.bind(this, 'password')}
        name={'password'}
        placeholder={'Password'}
      />
      {errors}
      <ButtonElement title={'Submit'} onClick={onSubmit} />
    </div>
  );
};

export default SignupForm;
