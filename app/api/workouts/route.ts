import db from '@/reusable/lib/db';
import { DBWorkout } from '@/reusable/models/Workout';
import { populateWorkoutExercises } from '@/reusable/lib/serverUtils';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const userId = cookieStore.get('userId')?.value;
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    await db();

    const docs = await DBWorkout.find({ userId }).lean();
    const workouts = docs.map((doc: any) => {
      const { _id, ...rest } = doc;
      return { ...rest, id: _id.toString() };
    });

    const populated = await populateWorkoutExercises<any[]>(workouts);

    return NextResponse.json(populated);
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to fetch workouts' }, { status: 500 });
  }
}
