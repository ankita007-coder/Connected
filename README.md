Got it! I'll update the `README.md` file to reflect the use of Material UI and React Icons instead of Bootstrap. Additionally, I'll include the friend-related API routes as you requested.

---

## Overview

This project is a social networking web application built using the MERN stack (MongoDB, Express.js, React, Node.js). The platform includes features such as posting (both private and public), liking, commenting (with edit and delete options), creating and joining groups, adding friends, searching for users, and real-time chat.

## Features

- **User Authentication**: Sign up, log in, and log out functionalities.
- **Posts**: Create, edit, and delete private and public posts.
- **Comments**: Add, edit, and delete comments on posts.
- **Likes**: Like and unlike posts.
- **Groups**: Create and join groups, post within groups.
- **Friends**: Send, accept, and remove friend requests.
- **User Search**: Search for other users on the platform.
- **Real-Time Chat**: Instant messaging with friends.

## Tech Stack

- **Frontend**: React.js, Material UI, React Icons
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Real-Time Communication**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **Styling**: CSS, Material UI

## Getting Started

### Prerequisites

Ensure you have the following installed:

- Node.js
- npm (Node Package Manager) or yarn
- MongoDB

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/social-networking-app.git
   cd social-networking-app
   ```

2. **Install dependencies**

   For the backend:

   ```bash
   npm install
   ```

   For the frontend:

   ```bash
   cd client
   npm install
   ```

3. **Environment Variables**

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   MONGO_URI=<your-mongodb-uri>
   JWT_SECRET=<your-jwt-secret>
   ```

### Running the Application

1. **Start MongoDB**

   Ensure MongoDB is running on your system. If you installed it locally, you can start it with:

   ```bash
   mongod
   ```

2. **Start the backend server**

   ```bash
   npm start
   ```

   The backend server will run on `http://localhost:5000`.

3. **Start the frontend development server**

   ```bash
   cd client
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

### Folder Structure

```
social-networking-app/
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   ├── App.js
│   │   └── ...
│   └── ...
├── controllers/
├── models/
├── routes/
├── middleware/
├── server.js
├── .env
├── package.json
└── README.md
```

### API Endpoints

- **Authentication**
  - `POST /api/v1/auth/register` - Register a new user
  - `POST /api/v1/auth/login` - Log in an existing user

- **Posts**
  - `GET /api/v1/post` - Get all posts
  - `POST /api/v1/post/add` - Create a new post
  - `PATCH /api/v1/posts/:postId` - Edit a post
  - `DELETE /api/v1/post/:postId` - Delete a post

- **Comments**
  - `POST /api/v1/post/comment/:postId` - Add a comment to a post
  - `PUT /api/v1/post/comment/:postId` - Edit a comment
  - `DELETE /api/v1/post/comment/delete/:postId` - Delete a comment

- **Likes**
  - `POST /api/v1/post/like/:postId` - Update likes in a post

- **Groups**
  - `POST /api/groups` - Create a new group
  - `GET /api/groups` - Get all groups
  - `PUT /api/groups/:id` - Edit a group
  - `DELETE /api/groups/:id` - Delete a group

- **Friends**
  - `POST /api/v1/user/add-friend` - Send a friend request
  - `POST /api/v1/user/unsend-request` - Unsend a friend request
  - `POST /api/v1/user/accept-request` - Accept a friend request
  - `POST /api/v1/user/reject-request` - Reject a friend request
  - `GET /api/v1/user/get-friends` - Get all friends
  - `POST /api/v1/user/remove-friend` - Remove a friend
  - `POST /api/v1/user/search-users` - Search for users
  - `GET /api/v1/user/get-friend-requests` - Get friend requests

- **Chat**
  - `GET /api/chat/:userId` - Get chat messages with a user
  - `POST /api/chat/:userId` - Send a chat message to a user

### Real-Time Communication

Real-time chat functionality is implemented using Socket.io. The server listens for and broadcasts chat messages to connected clients, ensuring instant messaging capabilities.

### License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to reach out with any questions or suggestions. Happy coding!

---