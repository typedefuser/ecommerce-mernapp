const express = require('express');
const connectDB = require('./config/database');
const userRoutes = require('./auth/routes/userRoutes');
const helloRoutes=require('./routes/hello');
const products=require('./routes/productRoute');
const cors=require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware
//app.use(express.json());
app.use(cors());

// Routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1',helloRoutes);
app.use('/api/v1/products',products);

// Catch-all route for handling 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: 'Not Found', error: 'Invalid API route' });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});
// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});