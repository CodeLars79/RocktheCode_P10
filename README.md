# RocktheCode_P10
This is the backend API for an event platform that allows users to register, log in, create events, join events, and manage event details. The API supports JWT-based authentication, file uploads to Cloudinary, and uses MongoDB for data storage.

## Features
- User Registration & Login: Users can register, log in, and manage their profiles.
- Event Management: Users can create, update, and delete events, as well as view event details.
- JWT Authentication: Secure endpoints using JWT tokens for user authentication.
- Cloudinary File Uploads: Upload event images to Cloudinary.

## Technologies Used
- Node.js: Backend runtime environment.
- Express: Web framework for building the API.
- MongoDB: Database to store user and event data.
- Mongoose: ODM (Object Data Modeling) library for MongoDB.
- Cloudinary: Cloud-based image storage for event photos.
- JWT: JSON Web Tokens for secure user authentication.
- Bcrypt: Password hashing for secure user password storage.
- Multer: Middleware for handling file uploads.

## Prerequisites
Ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB Atlas Account or local MongoDB setup
- Environment Variables
- The environment variables are set up in a .env file

## Usage
- Start the server in development mode with nodemon: npm run dev
- Or start the server in production mode: npm start
- Server will be deployed at http://localhost:3000

## API Endpoints
### User Endpoints
- POST /api/v1/users/register: Register a new user.
- POST /api/v1/users/login: Log in an existing user and get a JWT token.
- GET /api/v1/users: Get all users (admin only).
- GET /api/v1/users/:id: Get a user by ID.
- PUT /api/v1/users/:id: Update user details (requires authentication).
### Event Endpoints
- GET /api/v1/events: Get all events.
- GET /api/v1/events/:id: Get event details by ID.
- POST /api/v1/events: Create a new event (requires authentication).
- PUT /api/v1/events/:id: Update an event (requires authentication).
- DELETE /api/v1/events/:id: Delete an event (requires authentication).

## Notes
- The API includes JWT-based authentication. When registering or logging in, you will receive a token that must be sent as a Bearer token in the Authorization header for protected routes.
- For Cloudinary file uploads, only images in jpeg, png, or jpg formats are allowed.

## Credits ✨
- Developed by: Lars Sørensen

## ENJOY! 💙
