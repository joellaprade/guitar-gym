'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import login from '@/reusable/actions/login';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import BackArrow from '@/reusable/components/BackArrow';

export default function Page() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isValid, setIsValid] = useState(false);

  const { data, loading, error, runAction, setError } = useFetchServerAction(login);

  const checkIsValid = () => {
    if (!username || !password) {
      setIsValid(false);
      return;
    }

    setIsValid(true);
  };

  useEffect(checkIsValid, [username, password]);
  useEffect(() => {
    if (typeof data === 'string') {
      setError(data);
      return;
    }
    if (data) window.location.href = '/home';
  }, [data]);

  return (
    <div className="vertical-container">
      <BackArrow link={'/'} />
      <h1 className="mt-24">Login</h1>
      <form
        className="vertical-container justify-center gap-4 w-full"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          runAction(formData);
        }}
      >
        <input
          value={username}
          onChange={(e) => setUsername(e.target.value.toLowerCase())}
          type="text"
          placeholder="Username"
          name="username"
        />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          name="password"
        />
        <span className={`${!error && 'hidden'} error`}>{error}</span>{' '}
        <Link className="link text-center" href={'/change-password/request'}>
          Forgot Password?
        </Link>
        <button
          type={`${isValid && !loading ? 'submit' : 'button'}`}
          className={`big main mt-6 ${isValid && !loading ? '' : 'opacity-50'}`}
        >
          {loading ? 'Sending...' : 'Login'}
        </button>
      </form>
    </div>
  );
}
