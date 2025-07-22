import { Schema, model, models, InferSchemaType, Types, HydratedDocument } from 'mongoose';

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  active: { type: Boolean, default: false },
});

export type User = InferSchemaType<typeof userSchema> & { id: string };

export const DBUser = models.User || model('User', userSchema);
export type DBUser = HydratedDocument<User>;
