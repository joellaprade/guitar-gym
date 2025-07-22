import { cookies } from 'next/headers';
import { DBSession } from '../models/Session';
import { User } from '../models/User';
import crypto from 'crypto';
import { cache } from 'react';
import db from './db';

export const createSession = async ({
  name,
  username,
  email,
  id: userId,
}: User): Promise<DBSession | null> => {
  const cookieStore = await cookies();
  const sessionToken = crypto.randomBytes(8).toString('hex');

  const session = await DBSession.create({
    sessionToken,
    userId,
    user: {
      name,
      username,
      email,
    },
  });

  cookieStore.set('sessionToken', sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  cookieStore.set('userId', userId.toString(), {
    httpOnly: true,
    secure: true,
    sameSite: 'none',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return session;
};

export const getSession = cache(async (): Promise<DBSession | null> => {
  try {
    await db();
    const cookieStore = await cookies();
    let sessionToken = cookieStore.get('sessionToken')?.value;

    if (sessionToken) {
      const session = await DBSession.findOne({ sessionToken });
      return session;
    } else return null;
  } catch (e) {
    console.error(e);
    return null;
  }
});

// export const getPlayer = cache(async (): Promise<Player | null> => {
//   try {
//     await db();
//     const cookieStore = await cookies();
//     let userId = cookieStore.get('userId')?.value;

//     if (userId) {
//       const player: any = await Player.findOne({ userId }).lean<Player | null>();
//       if (!player) return null;
//       player.gameReqs = player.gameReqs.map((req: any) => ({ ...req.sender, gameId: req.gameId }));
//       return player;
//     } else return null;
//   } catch (e) {
//     console.error(e);
//     return null;
//   }
// });
