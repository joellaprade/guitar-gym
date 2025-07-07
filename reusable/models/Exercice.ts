import { Schema, model, models, InferSchemaType, Types } from 'mongoose';

const exerciceSchema = new Schema({
  title: { type: String, required: true },
  bpm: { type: Number, required: true },
  timeSignature: { type: String, required: true },
  measures: { type: Number, required: true },
  keywords: [{ type: String }],
  userId: { type: Types.ObjectId, required: true, ref: 'User' },
});

export const Exercice = models.Exercice || model('Exercice', exerciceSchema);

export type Exercice = InferSchemaType<typeof exerciceSchema> & {
  _id: Types.ObjectId;
  save: () => Promise<void>;
};
