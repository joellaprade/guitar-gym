import { Schema, model, models, InferSchemaType, HydratedDocument } from 'mongoose';

export const exerciseSchema = new Schema({
  title: { type: String, required: true },
  bpm: { type: Number, required: true },
  timeSignature: [{ type: Number, required: true }],
  measures: { type: Number },
  seconds: { type: Number },
  description: { type: String },
  video: { type: Object },
  keywords: [{ type: String }],
  userId: { type: String, required: true },
});

export type Exercise = InferSchemaType<typeof exerciseSchema> & { id: string };

export const DBExercise = models.Exercise || model('Exercise', exerciseSchema);
export type DBExercise = HydratedDocument<Exercise>;
