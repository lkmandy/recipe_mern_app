const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const dotenv = require('dotenv');

const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();
connectDB();

const app = express();

// ------ Security middleware ------
app.use(helmet());                           // Sets secure HTTP headers
app.use(mongoSanitize());                    // Strips $ and . from req body/params
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true,
}));

// ------ Request middleware ------
app.use(express.json({ limit: '10kb' }));    // Limit body size
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// ------ Routes ------
app.use('/api/auth',      require('./routes/authRoutes'));
app.use('/api/recipes',   require('./routes/recipeRoutes'));
app.use('/api/users',     require('./routes/userRoutes'));
app.use('/api/favorites', require('./routes/favoriteRoutes'));

// ------ Health check ------
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ------ 404 ------
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

// ------ Global error handler (must be last) ------
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
