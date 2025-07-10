import { Schema, model, models, InferSchemaType, Types } from 'mongoose';

const workoutSchema = new Schema({
  title: { type: String, required: true },
  exercises: [{ type: Schema.Types.Mixed }],
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
});

export const Workout = models.Workout || model('Workout', workoutSchema);

export type Workout = InferSchemaType<typeof workoutSchema> & {
  _id: Types.ObjectId;
  save: () => Promise<void>;
};
