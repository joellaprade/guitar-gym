import { Schema, model, models, InferSchemaType, HydratedDocument, Types } from 'mongoose';
import { Exercise } from './Exercise';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  exercises: [
    {
      _id: {
        type: Types.ObjectId,
        ref: 'Exercise',
        required: true,
      },
      bpm: { type: Number, required: true },
    },
  ],
  userId: { type: String, required: true },
});

export type Workout = { title: string; id: string; userId: string; exercises: Exercise[] };

export const DBWorkout = models.Workout || model('Workout', workoutSchema);
export type DBWorkout = HydratedDocument<Workout>;
