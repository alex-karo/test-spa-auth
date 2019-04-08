import * as mongoose from 'mongoose';

export const TokenSchema = new mongoose.Schema({
  userId: String,
  token: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
