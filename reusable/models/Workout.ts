import { Schema, model, models, InferSchemaType, HydratedDocument } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  exercises: [{ type: Object }],
  userId: { type: String, required: true },
});

export type Workout = InferSchemaType<typeof workoutSchema> & { id: string };

export const DBWorkout = models.Workout || model('Workout', workoutSchema);
export type DBWorkout = HydratedDocument<Workout>;
