import mongoose from 'mongoose';

const permissionSchema = new mongoose.Schema({
  title: { type: String, required: [true, 'title must be required'] },
  collectionName: { type: String, required: true }, //games
  docRef: { type: String, default: null },
  actions: [String], //read
});

const Permission = mongoose.model('Permission', permissionSchema);

export default Permission;
