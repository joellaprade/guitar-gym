import { Schema, model, models, InferSchemaType, HydratedDocument } from 'mongoose';

const exerciseSchema = new Schema({
  title: { type: String, required: true },
  bpm: { type: Number, required: true },
  timeSignature: { type: String, required: true },
  measures: { type: Number, required: true },
  description: { type: String },
  keywords: [{ type: String }],
  userId: { type: String, required: true },
  isExercise: { type: Boolean, default: true },
});

export type Exercise = InferSchemaType<typeof exerciseSchema> & { id: string };

export const DBExercise = models.Exercise || model('Exercise', exerciseSchema);
export type DBExercise = HydratedDocument<Exercise>;
