'use server';

import { cookies } from 'next/headers';
import { DBVerificationCode } from '../models/VerificationCode';
import { DBUser } from '../models/User';
import { createSession } from '../lib/auth';
import { getFormValues } from '../lib/utils';

type formData = {
  code: string;
};

export const verifyMail = async (formData: FormData) => {
  const { code } = getFormValues<formData>(formData);
  const cookieStore = await cookies();
  const userId = cookieStore.get('userId')?.value;

  const verificationCode = await DBVerificationCode.findOne({ userId });
  if (verificationCode === null || verificationCode.code !== code) return false;

  const user: DBUser | null = await DBUser.findById(userId);
  if (user === null) return false;

  user.active = true;
  await user.save();
  await createSession(user);

  return true;
};
