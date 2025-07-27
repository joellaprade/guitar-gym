'use client';

import { useState } from 'react';

type ServerAction<T> = (() => Promise<T>) | ((formData: FormData) => Promise<T>);

export default function useFetchServerAction<T>(serverAction: ServerAction<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runAction = async (formData?: FormData) => {
    setLoading(true);
    try {
      const res = formData
        ? await (serverAction as (formData: FormData) => Promise<T>)(formData)
        : await (serverAction as () => Promise<T>)();
      setData(res);
    } catch (e: any) {
      if (e.message == 'NEXT_REDIRECT') return;
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, runAction, setError };
}
