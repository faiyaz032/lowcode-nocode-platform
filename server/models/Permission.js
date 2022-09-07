import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'title must be required'] },
  collectionName: { type: String, required: true },
  documentRef: { type: String, default: null },
  actions: [String],
});

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
