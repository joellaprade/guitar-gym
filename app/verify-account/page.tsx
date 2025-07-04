'use client';

import { verifyMail } from '@/reusable/actions/verifyMail';
import useFetchServerAction from '@/reusable/hooks/useFetchServerAction';
import { useEffect } from 'react';

const Page = () => {
  const { data, loading, fetchData } = useFetchServerAction(verifyMail);

  useEffect(() => {
    if (data) window.location.href = '/';
  });

  return (
    <>
      <h2>Introdusca el código que se envió a su correo</h2>
      <form className="w-full" action={fetchData}>
        <input className="my-5" name="code" placeholder="Código" type="text" />
        <button
          type={loading ? 'button' : 'submit'}
          className={`${loading ? 'opacity-50' : ''} big-btn main-btn`}
        >
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
      </form>
    </>
  );
};

export default Page;
