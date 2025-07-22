import { Schema, model, models, InferSchemaType, HydratedDocument } from 'mongoose';

const breakSchema = new Schema({
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  isExercise: { type: Boolean, default: false },
});

export type Break = InferSchemaType<typeof breakSchema> & { id: string };

export const DBBreak = models.Break || model('Break', breakSchema);
export type DBBreak = HydratedDocument<Break>;
