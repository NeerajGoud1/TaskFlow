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
cd taskflow
```

### 2. Install Dependencies

Install root dependencies:
```bash
cd client
npm install
```

Install server dependencies:
```bash
cd server
npm install
```


### 3. Environment Configuration

Create a `.env` file in the `server` directory with the following variables:

```env
# Server Configuration
PORT=5000

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/taskmanager
# For MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/taskmanager

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here_make_it_long_and_random
JWT_EXPIRE=7d

# CORS Configuration
CLIENT_URL= ex : http://localhost:3000
```


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

#### Separate Terminals
Backend server:
```bash
npm run dev
```

Frontend client (in another terminal):
```bash
npm run dev
```


##  Bonus Features Implemented

### 1. **Advanced Search & Filtering**
- Real-time search across task titles and descriptions
- Multi-criteria filtering (status, priority, category)
- Combined search and filter functionality
- Clear filters option

### 2. **Task Statistics Dashboard**
- Visual task distribution by status
- Completion rate calculation with progress bar
- Recent tasks overview
- Interactive statistics cards

### 3. **Enhanced User Experience**
- **Responsive Design**: Mobile-first approach with collapsible sidebar
- **Loading States**: Skeleton screens and loading spinners
- **Toast Notifications**: Success/error feedback for all actions
- **Form Validation**: Real-time validation with helpful error messages


### 4. **Advanced Task Management**
- **Task Categories**: Organize tasks by custom categories
- **Due Date Management**: Set and track task deadlines
- **Overdue Indicators**: Visual alerts for overdue tasks
- **Quick Status Toggle**: One-click status updates

### 5. **Security Enhancements**
- **Rate Limiting**: Prevent API abuse with request limits
- **Helmet Security**: Security headers for protection
- **Input Sanitization**: Comprehensive data validation
- **Password Hashing**: Secure bcrypt implementation
- **JWT Expiration**: Automatic token expiry handling


#Thank You
