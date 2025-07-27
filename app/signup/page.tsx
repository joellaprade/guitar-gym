'use client';

import signUp from '@/reusable/actions/signUp';
import BackArrow from '@/reusable/components/BackArrow';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useEffect, useState } from 'react';

const SignUp = () => {
  const [isValid, setIsValid] = useState(false);
  const [fData, setFData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  });

  const { data, loading, error, runAction } = useFetchServerAction(signUp);

  const updateData = (fData: string, field: string) => {
    setFData((prevState) => ({ ...prevState, [field]: fData }));
  };

  const validateFData = () => {
    const { name, email, username, password, confirmPassword } = fData;
    if (
      !name ||
      !email ||
      !username ||
      !password ||
      !confirmPassword ||
      password !== confirmPassword
    ) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  };

  useEffect(validateFData, [fData]);
  useEffect(() => {
    if (data) window.location.href = '/verify-account';
  }, [data]);

  return (
    <div className="vertical-container">
      <BackArrow link={'/'} />
      <h1 className="mt-24">Create Account</h1>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          runAction(formData);
        }}
        className="vertical-container justify-center gap-4"
      >
        <input
          value={fData.name}
          onChange={(e) => {
            updateData(e.target.value, 'name');
          }}
          name="name"
          type="text"
          placeholder="Your Name"
        />
        <input
          value={fData.email}
          onChange={(e) => {
            updateData(e.target.value.toLowerCase(), 'email');
          }}
          name="email"
          type="email"
          placeholder="Email"
        />
        <input
          value={fData.username}
          onChange={(e) => {
            updateData(e.target.value.toLowerCase(), 'username');
          }}
          name="username"
          type="text"
          placeholder="Username"
        />
        <input
          value={fData.password}
          onChange={(e) => {
            updateData(e.target.value, 'password');
          }}
          name="password"
          type="password"
          placeholder="Password"
        />
        <input
          value={fData.confirmPassword}
          onChange={(e) => {
            updateData(e.target.value, 'confirmPassword');
          }}
          type="password"
          placeholder="Confirm Password"
        />
        <span className={`${!error && 'hidden'} error`}>{error}</span>{' '}
        <button
          type={`${isValid && !loading ? 'submit' : 'button'}`}
          className={`big main mt-4 ${isValid && !loading ? '' : 'opacity-50'}`}
        >
          {loading ? 'Sending...' : 'Create Account'}
        </button>
      </form>
    </div>
  );
};

export default SignUp;
