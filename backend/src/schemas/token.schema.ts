import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  userId: String,
  token: String,
  createdAt: { type: Date, default: Date.now },
});

export interface Token extends mongoose.Document {
  userId: string;
  token: string;
  createdAt: Date;
}
