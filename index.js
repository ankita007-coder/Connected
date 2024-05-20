// import 'express-async-errors'
// import express from 'express';
// import * as dotenv from 'dotenv';
// dotenv.config()
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser'
// import authRouter from './routers/authRouter.js'
// import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
// import cloudinary from 'cloudinary';

// const app = express();

// app.use(express.json());

// app.use(cookieParser());


          
// cloudinary.config({ 
//   cloud_name: process.env.CLOUD_NAME, 
//   api_key: process.env.API_KEY, 
//   api_secret: process.env.API_SECRET 
// });

// app.use('/api/v1/auth',authRouter);


// app.use(errorHandlerMiddleware)
// const PORT = process.env.PORT || 5000;

// try {
//     await mongoose.connect(process.env.MONGODB_URI)
//     app.listen(PORT, function(){
//         console.log('listening on port',PORT);
//     })
// } catch (error) {
//     console.error(error)
// }

import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'express-async-errors';
import { NotFoundError } from './errors/customErrors.js'; // Import the necessary custom errors

import authRouter from './routers/authRouter.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import cloudinary from 'cloudinary';
import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';
dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

// Cloudinary configuration
cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.API_KEY, 
  api_secret: process.env.API_SECRET 
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user',userRouter);
app.use('/api/v1/post',postRouter);
// Error handling middleware
app.use(errorHandlerMiddleware);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, { useNewUrlParser: true,
  useUnifiedTopology: true,
 })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server once MongoDB connection is established
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Handle 404 errors
app.use((req, res, next) => {
  throw new NotFoundError('Route not found');
});
