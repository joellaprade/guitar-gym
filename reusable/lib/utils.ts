import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getFormValues<T extends Record<string, any>>(formData: FormData): T {
  const result: Record<string, any> = {};

  for (const [key, value] of formData.entries()) {
    if (key.endsWith('[]')) {
      const cleanKey = key.slice(0, -2);
      if (!result[cleanKey]) {
        result[cleanKey] = [];
      }
      result[cleanKey].push(value);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}

export const multiFetch = async <T>(
  server: 'express' | 'nextjs',
  url: string,
  reqType?: 'GET' | 'POST' | 'PUT' | 'DELETE',
  bodyData?: object | FormData
): Promise<T> => {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  let baseUrl = '';
  const isFormData = bodyData instanceof FormData;
  const body = bodyData ? (isFormData ? bodyData : JSON.stringify(bodyData)) : undefined;

  switch (server) {
    case 'express':
      baseUrl = process.env.NEXT_PUBLIC_EXPRESS_BACKEND_URL!;
      break;
    case 'nextjs':
      baseUrl = process.env.NEXT_PUBLIC_NEXT_BACKEND_URL!;
      break;
  }
  try {
    const res = await fetch(baseUrl + url, {
      method: reqType || 'GET',
      headers: isFormData ? {} : { 'Content-Type': 'application/json' },
      body,
      credentials: 'include',
    });

    if (!res.ok) {
      const err = await res.json();
      console.error(err.err);
      throw new Error(`Couldn\'t fetch data boi: ${err.err}`);
    }

    return await res.json();
  } catch (e) {
    console.error(e);
    return {} as T;
  }
};
