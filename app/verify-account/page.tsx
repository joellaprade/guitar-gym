'use client';

import { verifyMail } from '@/reusable/actions/verifyMail';
import BackArrow from '@/reusable/components/BackArrow';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useEffect } from 'react';

const Page = () => {
  const { data, loading, fetchData } = useFetchServerAction(verifyMail);

  useEffect(() => {
    if (data) window.location.href = '/home';
  });

  return (
    <div className="vertical-container">
      <BackArrow link={'/'} />
      <h2 className="mt-48">Introdusca el código que se envió a su correo</h2>
      <form className="vertical-container justify-center w-full flex-grow" action={fetchData}>
        <input className="my-5" name="code" placeholder="Código" type="text" />
        <button
          type={loading ? 'button' : 'submit'}
          className={`${loading ? 'opacity-50' : ''} big main`}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
};

export default Page;
