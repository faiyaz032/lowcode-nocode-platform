import mongoose from 'mongoose';
import app from './app.js';

function connectDatabase() {
  mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
  console.log('Database connected successfully');
}

const PORT = 5000 || process.env.PORT;
app.listen(PORT, () => {
  connectDatabase();
  console.log(`Server is alive on PORT:${PORT}`);
});
