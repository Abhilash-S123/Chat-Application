# 💬 QuickChat - Real-Time Messaging Platform

A modern, real-time chatting application with Socket.IO, allowing users to connect, chat, and share images instantly.

## 🌐 Live Demo

**Live App:** [View Live App](https://chat-application-avpq.vercel.app)

**(AWS Backend):** [API Status](http://chatapp-env.eba-4iejvebw.eu-north-1.elasticbeanstalk.com/api/status)



> 💡 **Tip:** To test the chat, create two accounts using different browsers or devices!
> If you want to use AWS Elasticbeanstalk backend server purchase a domain and convert http to https in AWS then connect it with frontend while hosting.

## 📸 Screenshots

### Chat Interface
![Chat Interface](screenshots/chat.png)

## ✨ Features

### 🔐 Authentication & Security
- User registration and login with JWT authentication
- Password hashing using Bcrypt
- Protected routes with middleware
- Secure token-based sessions

### 💬 Real-Time Messaging
- Instant messaging with Socket.IO
- Send text messages and images
- Live typing indicators
- Message seen/read receipts
- Online/Offline status indicators

### 👤 User Features
- Create and update profile
- Upload profile pictures
- View all registered users
- See who's online in real-time

### 📱 Design
- Fully responsive UI built with Tailwind CSS
- Modern and clean interface
- Mobile-friendly design

## 🛠️ Tech Stack

**Frontend:**
- React.js
- Tailwind CSS
- Socket.IO Client
- Axios

**Backend:**
- Node.js
- Express.js
- Socket.IO
- MongoDB/Mongoose
- JWT (jsonwebtoken)
- Bcrypt.js

**Cloud Services:**
- Cloudinary (Image storage)
- Vercel (Frontend hosting)
- AWS Elastic Beanstalk (Backend hosting)
- Render (Backend hosting with HTTPS)

## 🚀 Deployment

- **Frontend:** Hosted on Vercel
- **Backend:** Deployed on both AWS Elastic Beanstalk and Render
  - AWS for HTTP endpoint
  - Render for HTTPS endpoint (required for Socket.IO in production)

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Cloudinary account
- Git

### Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/quickchat.git
cd quickchat
```

2. **Backend Setup**
```bash
cd server
npm install
```

Create `.env` file:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start backend server:
```bash
npm start
```

3. **Frontend Setup**
```bash
cd client
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

Start development server:
```bash
npm run dev
```

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/check` - Check authentication status

### Users
- `GET /api/users` - Get all users
- `PUT /api/users/profile` - Update user profile

### Messages
- `GET /api/messages/:userId` - Get chat messages with specific user
- `POST /api/messages/send/:userId` - Send message to user
- `POST /api/messages/upload` - Upload image

### Socket.IO Events
- `connection` - User connects
- `disconnect` - User disconnects
- `typing` - User is typing
- `stopTyping` - User stopped typing
- `messageSent` - New message sent
- `messageSeen` - Message marked as seen

## 📁 Project Structure
```
quickchat/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Context API
│   │   ├── lib/           # Utility functions
│   │   └── App.jsx
│   └── package.json
│
├── server/                # Backend Node.js app
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── lib/              # DB config, Cloudinary
│   └── server.js         # Entry point with Socket.IO
│
└── README.md
```

## 🎯 Key Features Explained

### Real-Time Communication
Socket.IO enables instant bi-directional communication between clients and server, providing:
- Live message delivery
- Typing indicators
- Online/offline status
- Message read receipts

### Image Handling
Images are uploaded to Cloudinary for:
- Optimized storage
- Fast CDN delivery
- Automatic image optimization
- Secure URL generation

### Authentication Flow
1. User signs up with email and password
2. Password is hashed using Bcrypt
3. JWT token is generated on login
4. Token is stored in HTTP-only cookies
5. Protected routes verify token via middleware

## 🔒 Security Features

- ✅ Password hashing with Bcrypt
- ✅ JWT token authentication
- ✅ HTTP-only cookies
- ✅ Protected API routes
- ✅ Input validation
- ✅ CORS configuration

## 📝 Environment Variables

**Backend (.env)**
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/quickchat
JWT_SECRET=your_random_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
NODE_ENV=production
```

**Frontend (.env)**
```
VITE_API_URL=https://your-backend-url.com/api
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

MIT License

## 👤 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

## 🙏 Acknowledgments

- Socket.IO for real-time communication
- Cloudinary for image hosting
- MongoDB Atlas for database hosting
- AWS Elastic Beanstalk for deployment
- Render for HTTPS hosting

---

⭐ If you like this project, please give it a star!
