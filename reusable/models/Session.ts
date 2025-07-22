import { Schema, model, models, InferSchemaType, HydratedDocument } from 'mongoose';

const sessionSchema = new Schema({
  sessionToken: { type: String, required: true, unique: true },
  userId: { type: String, required: true },
  user: {
    required: true,
    type: {
      name: { type: String, required: true },
      username: { type: String, required: true },
      email: { type: String, required: true },
    },
  },
  createdAt: { type: Date, default: Date.now, expires: 86400 },
});

export type Session = InferSchemaType<typeof sessionSchema> & { id: string };

export const DBSession = models.Session || model('Session', sessionSchema);
export type DBSession = HydratedDocument<Session>;
