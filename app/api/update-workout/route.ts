import db from '@/reusable/lib/db';
import { DBWorkout } from '@/reusable/models/Workout';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const workout = await req.json();

    await db();
    const workoutDB: InstanceType<typeof DBWorkout> | null = await DBWorkout.findById(workout.id);
    if (!workoutDB) return NextResponse.json({ error: 'Workout not found' }, { status: 404 });

    workoutDB.exercises = workout.exercises;
    await workoutDB.save();

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Failed to update workout' }, { status: 500 });
  }
}
