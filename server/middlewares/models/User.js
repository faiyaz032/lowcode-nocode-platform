import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Name must be required'] },
  email: { type: String, required: [true, 'Email must be required'], unique: true },
  password: { type: String, required: [true, 'Password must be required'] },
  role: { type: String },
});

//hash the password before saving the user doc
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) next();
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User = mongoose.model('User', userSchema);

export default User;
