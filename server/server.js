import mongoose from 'mongoose';
import app from './app.js';

async function connectDatabase() {
  await mongoose.connect(`${process.env.MONGODB_CONNECTION_STRING}`);
  console.log('Database connected successfully');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDatabase();
  console.log(`Server is alive on PORT:${PORT}`);
});
