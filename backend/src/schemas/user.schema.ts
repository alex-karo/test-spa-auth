import * as mongoose from 'mongoose';
import * as bcrypt from 'bcryptjs';

export const UserSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unicode: true},
  password: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
});

UserSchema.methods.setPassword = async function(password) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(password, salt);
};

UserSchema.methods.checkPassword = function(password) {
  return bcrypt.compare(password, this.password);
};

export interface User extends mongoose.Document {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: Date;

  setPassword(password: string): Promise<string>;
  checkPassword(password: string): Promise<boolean>;
}
