import mongoose from 'mongoose';
import app from './app.js';

function connectDatabase() {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('Database connected successfully');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is alive on PORT:${PORT}`);
});
