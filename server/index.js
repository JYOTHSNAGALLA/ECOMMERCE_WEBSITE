require('dotenv').config();

const mongoose = require('mongoose');
const uri = process.env.MONGODB_URI;
const CartModel = require('./model/CartModel');
const CategoryModel = require('./model/CategoryModel');
const InventoryModel = require('./model/InventoryModel');
const OrderModel =require('./model/OrderModel');
const ProductModel = require('./model/ProductModel');
const PurchaseBookModel = require('./model/PurchaseBookModel');
const UserModel = require('./model/UserModel'); // ✅ check the file name and path
const cors = require('cors'); 
const jwt = require('jsonwebtoken');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000;
const jwtSecret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
    // Get token from Authorization header (Bearer TOKEN)
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Extract the token after 'Bearer'

    if (token == null) {
        // If no token is provided
        return res.status(401).json({ message: 'Access Denied: No token provided.', logout: true });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            // Token is invalid or expired
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ message: 'Access Denied: Token expired.', logout: true });
            }
            // Other JWT errors (e.g., malformed token)
            return res.status(403).json({ message: 'Access Denied: Invalid token.', logout: true });
        }

        // Token is valid, attach the userId from the payload to the request
        req.userId = decoded.userId;
        next(); // Proceed to the next middleware/route handler
    });
}

mongoose.connect(uri)
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  })
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to the E-commerce API!'); // Send a response
});
// ✅ ADD THIS MIDDLEWARE DEFINITION
const authentication = (req, res, next) => {
  console.log(" Authentication middleware triggered");
  next();
};

const path = require('path');

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  //app.get('*', (req, res) => {
    //res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'));
  //});
}


// 🔐 Login/Register routes (no auth needed)

app.post('/register', async (req, res) => {
  const { name, email, phone, password} = req.body;

  console.log('Register attempt:', { name, email, phone, password});
  
  if (!email && !phone) {
    return res.status(400).json({ message: 'Email or phone is required.' });
  }

  try {
    const existingUser = await UserModel.findOne({
      $or: [
        { email: email || null },
        { phone: phone || null }
      ]
    });

    if (existingUser) {
      return res.status(400).json({ message: 'Email or Phone number already registered.' });
    }

    const newUser = new UserModel({ name, email, phone, password});
    const savedUser = await newUser.save();

    console.log('User saved:', savedUser);

    res.status(201).json({
      message: 'User registered successfully!',
      user: savedUser
    });
  } catch (err) {
    console.error(' Error in /register route:', err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/login', async (req, res) => {
  const { phone, password } = req.body; // Extract query parameters

  try {
    // Check if user exists with given email and password
    const user = await UserModel.findOne({ phone: phone, password: password });

    if (!user) {
      return res.json({
        message: 'Invalid phone or password',
        status: '401'
      });
    }
     // --- Generate JWT Token ---
        const token = jwt.sign(
            { userId: user._id },
             jwtSecret, // ✅ using process.env.JWT_SECRET
            { expiresIn: '24h' }
          );


     res.status(200).json({
            message: 'Welcome ${user.name}, You are logged in!',
            token: token, // Send the JWT token
            userData: { // You might want to send less data here for security
                _id: user._id,
                name: user.name,
                phone: user.phone
            }
        });
      } catch (err) {
    console.error('Error logging in user:', err);
     res.json({ message: 'Incorrect phone Number or password', status: '401' });
  }
});

// More protected routes...
app.get('/categories', (req, res) => {
  res.json({data:[]});
});

app.post('/categories', (req, res) => {
  const { categoryName } = req.body;
  res.send(`Category "${categoryName}" added successfully!`);
});

app.get('/cartItems', (req, res) => {
  res.json({data:[]});
});

app.post('/cartItems', (req, res) => {
  const { productId, quantity } = req.body;
  res.send(`Product ${productId} added to cart with quantity ${quantity}`);
});

app.post('/buy', authenticateToken, (req, res) => {
  const { userId, productId } = req.body;
  res.json({data:[]});
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
