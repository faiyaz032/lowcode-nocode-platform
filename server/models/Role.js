import mongoose from 'mongoose';

const roleSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'title must be required'] },
  permissions: [{ type: mongoose.Schema.ObjectId, ref: 'Permission' }],
});

const Role = mongoose.model('Role', roleSchema);

export default Role;
