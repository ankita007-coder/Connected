// import express from 'express';
// import * as dotenv from 'dotenv';
// import mongoose from 'mongoose';
// import cookieParser from 'cookie-parser';
// import 'express-async-errors';
// import { NotFoundError } from './errors/customErrors.js';
// import http from 'http';

// import authRouter from './routers/authRouter.js';
// import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
// import cloudinary from 'cloudinary';
// import userRouter from './routers/userRouter.js';
// import postRouter from './routers/postRouter.js';
// import groupRouter from './routers/groupRouter.js';
// import { Server as SocketIOServer } from 'socket.io';
// import Chat from './models/Chat.js';

// dotenv.config();

// const app = express();
// const server = http.createServer(app);
// const io = new SocketIOServer(server);

// app.use(express.json());
// app.use(cookieParser());

// // Cloudinary configuration
// cloudinary.config({
//   cloud_name: process.env.CLOUD_NAME,
//   api_key: process.env.API_KEY,
//   api_secret: process.env.API_SECRET
// });

// // Routes
// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/user', userRouter);
// app.use('/api/v1/post', postRouter);
// app.use('/api/v1/group', groupRouter);

// // Handle 404 errors
// app.use((req, res, next) => {
//   throw new NotFoundError('Route not found');
// });

// // Error handling middleware
// app.use(errorHandlerMiddleware);

// // MongoDB connection
// const MONGODB_URI = process.env.MONGODB_URI;
// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
//     // Start the server once MongoDB connection is established
//     const PORT = process.env.PORT || 5000;
//     server.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((error) => {
//     console.error('Error connecting to MongoDB:', error);
//   });

// io.on('connection', (socket) => {
//   console.log('a user connected');

//   socket.on('joinRoom', ({ roomId, username }) => {
//     socket.join(roomId);
//     console.log(`${username} joined room ${roomId}`);

//     Chat.find({ roomId }).then(messages => {
//       socket.emit('initialMessages', messages);
//     });
//   });

//   socket.on('chatMessage', (msg) => {
//     const message = new Chat(msg);
//     message.save().then(() => {
//       io.to(msg.roomId).emit('chatMessage', msg); // Broadcast to all in the room
//     });
//   });

//   socket.on('disconnect', () => {
//     console.log('user disconnected');
//   });
// });
import express from 'express';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import 'express-async-errors';
import { NotFoundError } from './errors/customErrors.js';
import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import cloudinary from 'cloudinary';

import authRouter from './routers/authRouter.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import userRouter from './routers/userRouter.js';
import postRouter from './routers/postRouter.js';
import groupRouter from './routers/groupRouter.js';
import Chat from './models/Chat.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: "http://localhost:5173", 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true
  }
});

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  methods: ["GET", "POST"],
  credentials: true
}));

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

// Routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/post', postRouter);
app.use('/api/v1/group', groupRouter);

// Handle 404 errors
app.use((req, res, next) => {
  throw new NotFoundError('Route not found');
});

// Error handling middleware
app.use(errorHandlerMiddleware);

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
  // Start the server once MongoDB connection is established
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('joinRoom', ({ roomId, username }) => {
    socket.join(roomId);
    console.log(`${username} joined room ${roomId}`);

    Chat.find({ roomId }).then(messages => {
      socket.emit('initialMessages', messages);
    });
  });

  socket.on('chatMessage', (msg) => {
    const message = new Chat(msg);
    message.save().then(() => {
      io.to(msg.roomId).emit('chatMessage', msg);
    });
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
