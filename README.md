# TaskFlow - Full Stack Task Management Application

A modern, responsive task management application built with React.js frontend and Node.js/Express backend, featuring MongoDB database integration and comprehensive user authentication.

## 🚀 Features

### Frontend (React.js)

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern UI/UX**: Clean, intuitive interface with smooth animations
- **State Management**: Context API for global state management
- **Component Architecture**: Reusable, modular components
- **Form Handling**: React Hook Form with validation
- **Authentication Flow**: Complete login/register system
- **Real-time Updates**: Dynamic task management interface

### Backend (Node.js/Express.js)

- **RESTful API**: Complete CRUD operations for tasks and users
- **Authentication**: JWT-based authentication system
- **Input Validation**: Express-validator for data validation
- **Security**: Helmet, CORS, rate limiting, and password hashing
- **Error Handling**: Comprehensive error management
- **API Documentation**: Well-structured API endpoints

### Database (MongoDB)

- **Schema Design**: Optimized data models for users and tasks
- **Indexing**: Performance optimized database queries
- **Data Validation**: Schema-level validation and constraints
- **Relationships**: Proper user-task relationships

## 🛠️ Tech Stack

**Frontend:**

- React.js 18
- React Router DOM
- Tailwind CSS
- Axios
- React Hook Form
- React Hot Toast
- Lucide React (Icons)
- Date-fns
- Headless UI

**Backend:**

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt.js
- Express Validator
- Helmet (Security)
- CORS
- Rate Limiting

## 📦 Installation

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or cloud instance)
- npm or yarn

### Setup Instructions

1. **Clone the repository**

```bash
git clone <repository-url>
cd taskflow-app
```

2. **Install root dependencies**

```bash
npm install
```

3. **Install server dependencies**

```bash
npm run install-server
```

4. **Install client dependencies**

```bash
npm run install-client
```

5. **Environment Configuration**

Create `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/taskmanager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL=http:localhost:3000
```

6. **Start the application**

For development (runs both frontend and backend concurrently):

```bash
npm run dev
```

Or start them separately:

Backend:

```bash
npm run server
```

Frontend:

```bash
npm run client
```

The application will be available at:

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

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

## 🎨 UI Components

### Key Components

- **Layout**: Main application layout with sidebar navigation
- **TaskCard**: Individual task display component
- **TaskModal**: Create/edit task modal
- **LoadingSpinner**: Reusable loading indicator
- **ProtectedRoute**: Route protection wrapper
- **PublicRoute**: Public route wrapper

### Responsive Design

- Mobile-first approach
- Collapsible sidebar navigation
- Touch-friendly interactions
- Optimized for all screen sizes

## 🔐 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Request rate limiting
- CORS protection
- Helmet security headers
- Input validation and sanitization
- Protected API routes

## 📊 Features Overview

### Dashboard

- Task statistics overview
- Priority distribution charts
- Recent tasks display
- Completion rate tracking

### Task Management

- Create, read, update, delete tasks
- Task filtering and searching
- Priority levels (low, medium, high)
- Status tracking (pending, in-progress, completed)
- Category organization
- Due date management
- Pagination support

### User Management

- User registration and authentication
- Profile management
- Secure password handling
- Session management

## 🚦 Development Guidelines

### Code Organization

- Modular component architecture
- Separation of concerns
- Clean code principles
- Consistent naming conventions

### State Management

- Context API for global state
- Local state for component-specific data
- Proper state updates and side effects

### Error Handling

- Client-side form validation
- Server-side input validation
- User-friendly error messages
- Proper error logging

## 📈 Performance Optimizations

- Database indexing for faster queries
- Pagination for large datasets
- Component memoization where appropriate
- Optimized bundle size
- Lazy loading capabilities

## 🧪 Testing

The application includes comprehensive error handling and validation:

- Form validation with real-time feedback
- API error handling with user notifications
- Input sanitization and validation
- Authentication state management

## 🚀 Deployment

### Frontend Deployment

1. Build the React app: `npm run build`
2. Deploy the `dist` folder to your hosting service

### Backend Deployment

1. Set up production environment variables
2. Deploy to your preferred Node.js hosting service
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
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For support and questions:

- Create an issue on GitHub
- Check the documentation
- Review the API endpoints

---

Built with ❤️ for Dev Innovations Labs Full Stack Developer Assignment
