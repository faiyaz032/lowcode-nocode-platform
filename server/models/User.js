import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, 'Name must be required'] },
  email: { type: String, required: [true, 'Email must be required'], unique: true },
  password: { type: String, required: [true, 'Password must be required'] },
  role: { type: String },
});

const User = mongoose.model('User', userSchema);

export default User;
