# 💬 QuickChat - Real-Time Messaging Platform

A modern, real-time chatting application with Socket.IO, allowing users to connect, chat, and share images instantly.

## 🌐 Live Demo

**Live App:** [View Live App](https://chat-application-avpq.vercel.app)

**(AWS Backend):** [API Status](http://chatapp-env.eba-4iejvebw.eu-north-1.elasticbeanstalk.com/api/status)



> 💡 **Tip:** To test the chat, create two accounts using different browsers or devices and 
> if you want to use AWS Elasticbeanstalk backend server purchase a domain and convert http to https in AWS then connect it with frontend while hosting.

## 📸 Screenshots

### Chat Interface
![Chat Interface](https://github.com/Abhilash-S123/Chat-Application/blob/master/screenshot-of-quichchat.png?raw=true)

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
git clone https://github.com/Abhilash-S123/Chat-Application.git
cd Chat-app
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
npm run server
```

3. **Frontend Setup**
```bash
cd client
npm install
```

Create `.env` file:
```env
VITE_API_URL=http://localhost:5000
```

Start development server:
```bash
npm run dev
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
4. Protected routes verify token via middleware

## 🔒 Security Features

- ✅ Password hashing with Bcrypt
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ CORS configuration

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

Abhilash.S - [GitHub Profile](https://github.com/Abhilash-S123)

---

⭐ If you like this project, please give it a star!
