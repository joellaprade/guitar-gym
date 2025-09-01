'use client';

import { verifyMail } from '@/reusable/actions/verifyMail';
import BackArrow from '@/reusable/components/BackArrow';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useEffect } from 'react';

const Page = () => {
  const { data, loading, runAction } = useFetchServerAction(verifyMail);

  useEffect(() => {
    if (data) window.location.href = '/home';
  });

  return (
    <div className="vertical-container mx-8">
      <BackArrow link={'/'} />
      <h2 className="mt-48">Write down the code sent to your email </h2>
      <form className="vertical-container w-full flex-grow justify-center" action={runAction}>
        <input className="my-5" name="code" placeholder="Código" type="text" />
        <button type={loading ? 'button' : 'submit'} className={`${loading ? 'opacity-50' : ''} big main`}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
};

export default Page;
