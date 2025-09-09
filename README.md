# TaskFlow - Full Stack Task Management Application

## Tech Stack Used

### Frontend
- **React.js** - Modern JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing for single-page application
- **Tailwind CSS** - Utility-first CSS framework for rapid UI development
- **Axios** - HTTP client for API requests

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **MongoDB** - NoSQL document database
- **JWT (jsonwebtoken)** - JSON Web Token implementation



## Setup Instructions

### Prerequisites
- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Either local installation or MongoDB Atlas cloud instance
- **npm** or **yarn** package manager

### 1. Clone the Repository
```bash
git clone <repository-url>
cd taskmangament
```

### 2. Install Dependencies

Install root dependencies:
```bash

```

Install server dependencies:
```bash
npm run install-server
```

Install client dependencies:
```bash
npm run install-client
```

Or install all at once:
```bash
npm run install-all
```

### 3. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/taskmanager
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/taskmanager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http://localhost:3000
```

**Important**: Replace `your_super_secret_jwt_key_here_make_it_long_and_random` with a strong, random secret key.

### 4. Database Setup

#### Option A: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use the connection string: `mongodb://localhost:27017/taskmanager`

#### Option B: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and replace in `.env`
4. Whitelist your IP address

### 5. Start the Application

#### Development Mode (Recommended)
Run both frontend and backend concurrently:
```bash
npm run dev
```

#### Separate Terminals
Backend server:
```bash
npm run server
```

Frontend client (in another terminal):
```bash
npm run client
```

### 6. Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/api/health

## 🎯 Bonus Features Implemented

### 1. **Advanced Search & Filtering**
- Real-time search across task titles and descriptions
- Multi-criteria filtering (status, priority, category)
- Combined search and filter functionality
- Clear filters option

### 2. **Task Statistics Dashboard**
- Visual task distribution by status
- Priority-based task breakdown
- Completion rate calculation with progress bar
- Recent tasks overview
- Interactive statistics cards

### 3. **Enhanced User Experience**
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Loading States**: Skeleton screens and loading spinners
- **Toast Notifications**: Success/error feedback for all actions
- **Form Validation**: Real-time validation with helpful error messages
- **Hover Effects**: Interactive UI elements with smooth transitions

### 4. **Advanced Task Management**
- **Task Categories**: Organize tasks by custom categories
- **Due Date Management**: Set and track task deadlines
- **Overdue Indicators**: Visual alerts for overdue tasks
- **Quick Status Toggle**: One-click status updates
- **Bulk Operations**: Efficient task management

### 5. **Security Enhancements**
- **Rate Limiting**: Prevent API abuse with request limits
- **Helmet Security**: Security headers for protection
- **Input Sanitization**: Comprehensive data validation
- **Password Hashing**: Secure bcrypt implementation
- **JWT Expiration**: Automatic token expiry handling

### 6. **Performance Optimizations**
- **Database Indexing**: Optimized queries for better performance
- **Pagination**: Efficient handling of large datasets
- **Component Memoization**: Optimized React rendering
- **API Response Caching**: Reduced server load
- **Lazy Loading**: Improved initial load times

### 7. **Developer Experience**
- **Hot Reload**: Instant development feedback
- **Error Boundaries**: Graceful error handling
- **TypeScript Ready**: Easy migration path
- **ESLint Configuration**: Code quality enforcement
- **Comprehensive Documentation**: Detailed API and setup docs

### 8. **Production Ready Features**
- **Environment Configuration**: Separate dev/prod configs
- **Error Logging**: Comprehensive error tracking
- **Health Check Endpoint**: Application monitoring
- **CORS Configuration**: Secure cross-origin requests
- **Build Optimization**: Production-ready builds

## 📁 Project Structure

```
taskflow-app/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── contexts/       # React Context providers
│   │   ├── pages/          # Page components
│   │   ├── services/       # API service functions
│   │   └── App.jsx
│   ├── public/
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # MongoDB models
│   ├── routes/             # API routes
│   ├── config/            # Configuration files
│   └── server.js
├── package.json           # Root package.json
└── README.md
```

## 🔧 API Endpoints

### Authentication Routes
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update user profile

### Task Routes (Protected)
- `GET /api/tasks` - Get all tasks (with filtering, searching, pagination)
- `POST /api/tasks` - Create new task
- `GET /api/tasks/stats` - Get task statistics
- `GET /api/tasks/:id` - Get specific task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### Query Parameters for Tasks
- `status` - Filter by status (pending, in-progress, completed)
- `priority` - Filter by priority (low, medium, high)
- `category` - Filter by category
- `search` - Search in title and description
- `page` - Page number for pagination
- `limit` - Number of items per page
- `sort` - Sort order (default: -createdAt)

## 🚀 Deployment

### Frontend Deployment
1. Build the React app: `cd client && npm run build`
2. Deploy the `dist` folder to your hosting service (Netlify, Vercel, etc.)

### Backend Deployment
1. Set up production environment variables
2. Deploy to your preferred Node.js hosting service (Heroku, Railway, etc.)
3. Ensure MongoDB connection is properly configured

### Environment Variables for Production
```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
JWT_SECRET=your_production_jwt_secret
CLIENT_URL=your_production_frontend_url
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue on GitHub
- Check the API documentation above
- Review the setup instructions

---

**Built with ❤️ for Dev Innovations Labs Full Stack Developer Assignment**

*Demonstrating modern web development practices with React.js, Node.js, and MongoDB*
