'use server';
import bcrypt from 'bcrypt';
import db from '../lib/db';
import { DBUser, User } from '@/reusable/models/User';
import { getFormValues } from '../lib/serverUtils';
import { handleMailVerification } from './handleMailVerification';

type formData = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export default async function signUp(formData: FormData): Promise<boolean> {
  try {
    await db();
    const { username, password, name, email } = getFormValues<formData>(formData);
    const hashedPassword = await bcrypt.hash(password, 10);

    const user: User = await DBUser.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    await handleMailVerification(email, user.id);

    return true;
  } catch (e: any) {
    console.error(e.errorResponse);
    throw new Error('Ocurrió un error al crear un nuevo usuario.');
  }
}
