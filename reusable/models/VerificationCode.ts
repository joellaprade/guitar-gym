import { Schema, model, models, InferSchemaType, Types, HydratedDocument } from 'mongoose';

const VerificationCodeSchema = new Schema({
  userId: { type: String, required: true },
  code: { type: String, required: true },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
  },
  expiresAfter: {
    type: Date,
    index: { expires: 300 },
    default: () => new Date(Date.now() + 300),
  },
});

export type VerificationCode = InferSchemaType<typeof VerificationCodeSchema> & { id: string };

export const DBVerificationCode =
  models.VerificationCode || model('VerificationCode', VerificationCodeSchema);
export type DBVerificationCode = HydratedDocument<VerificationCode>;
