import { Schema, model, models, InferSchemaType, Types } from 'mongoose';

const exerciseSchema = new Schema({
  title: { type: String, required: true },
  bpm: { type: Number, required: true },
  timeSignature: { type: String, required: true },
  measures: { type: Number, required: true },
  keywords: [{ type: String }],
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
});

export const Exercise = models.Exercise || model('Exercise', exerciseSchema);

export type Exercise = InferSchemaType<typeof exerciseSchema> & {
  _id: Types.ObjectId;
  save: () => Promise<void>;
};
