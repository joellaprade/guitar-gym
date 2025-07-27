'use server';

import db from '../lib/db';
import { cookies } from 'next/headers';
import { DBSession } from '../models/Session';

export default async (): Promise<boolean> => {
  await db();

  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('sessionToken')?.value;

  const session = await DBSession.findOneAndDelete({ sessionToken });

  cookieStore.set('sessionToken', '', { maxAge: 0, path: '/' });
  cookieStore.set('userId', '', { maxAge: 0, path: '/' });

  if (session) {
    return true;
  } else {
    throw new Error('No se pudo encontrar la session.');
  }
};
