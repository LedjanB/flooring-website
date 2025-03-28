const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// CORS Configuration
const corsOptions = {
  origin: ['https://flooring-website-eight.vercel.app', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Apply CORS middleware to all routes
app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, 'uploads'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

// Serve static files from the frontend directory
app.use(express.static(path.join(__dirname, '../inance-html')));
// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// File paths
const PRODUCTS_FILE = path.join(__dirname, 'data', 'products.json');
const USERS_FILE = path.join(__dirname, 'data', 'users.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Ensure data and uploads directories exist
const ensureDirectories = async () => {
  const dataDir = path.join(__dirname, 'data');
  try {
    await fs.access(dataDir);
  } catch {
    await fs.mkdir(dataDir);
  }
  
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR);
  }
};

// Initialize data files if they don't exist
const initializeDataFiles = async () => {
  await ensureDirectories();
  
  try {
    await fs.access(PRODUCTS_FILE);
  } catch {
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify([]));
  }
  
  // Always create/update the admin user
  const defaultUser = {
    username: 'admin',
    password: await bcrypt.hash('admin123', 10)
  };
  await fs.writeFile(USERS_FILE, JSON.stringify([defaultUser]));
};

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Routes
// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Flooring Website API',
    endpoints: {
      products: '/api/products',
      login: '/api/login'
    }
  });
});

// Get single product
app.get('/api/products/:id', async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile(PRODUCTS_FILE));
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error reading product' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  try {
    // Log the entire request for debugging
    console.log('=== Login Request ===');
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    console.log('Body:', JSON.stringify(req.body, null, 2));

    // Ensure we have a body
    if (!req.body) {
      return res.status(400).json({ success: false, message: 'No request body provided' });
    }

    const { username, password } = req.body;

    // Validate inputs
    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    // Read users file
    let users;
    try {
      const usersData = await fs.readFile(USERS_FILE, 'utf8');
      users = JSON.parse(usersData);
      console.log('Users found:', users.length);
    } catch (error) {
      console.error('Error reading users file:', error);
      // If file doesn't exist, create default admin
      users = [{
        username: 'admin',
        password: await bcrypt.hash('admin123', 10)
      }];
      await fs.writeFile(USERS_FILE, JSON.stringify(users));
    }

    // Find user
    const user = users.find(u => u.username === username);
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Verify password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Generate token
    const token = jwt.sign(
      { username: user.username },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '24h' }
    );

    console.log('Login successful for:', username);
    
    // Send success response
    return res.status(200).json({
      success: true,
      message: 'Login successful',
      token
    });

  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message
    });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile(PRODUCTS_FILE));
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error reading products' });
  }
});

// Add new product (protected)
app.post('/api/products', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile(PRODUCTS_FILE));
    const newProduct = {
      id: Date.now().toString(),
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : null
    };
    products.push(newProduct);
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ message: 'Error adding product' });
  }
});

// Update product (protected)
app.put('/api/products/:id', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile(PRODUCTS_FILE));
    const index = products.findIndex(p => p.id === req.params.id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // If there's a new image, delete the old one
    if (req.file && products[index].image) {
      const oldImagePath = path.join(__dirname, products[index].image.replace('/uploads/', ''));
      try {
        await fs.unlink(oldImagePath);
      } catch (error) {
        console.error('Error deleting old image:', error);
      }
    }

    products[index] = {
      ...products[index],
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      image: req.file ? `/uploads/${req.file.filename}` : products[index].image
    };

    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    res.json(products[index]);
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

// Delete product (protected)
app.delete('/api/products/:id', authenticateToken, async (req, res) => {
  try {
    const products = JSON.parse(await fs.readFile(PRODUCTS_FILE));
    const product = products.find(p => p.id === req.params.id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Delete the product image if it exists
    if (product.image) {
      const imagePath = path.join(__dirname, product.image.replace('/uploads/', ''));
      try {
        await fs.unlink(imagePath);
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    }

    const filteredProducts = products.filter(p => p.id !== req.params.id);
    await fs.writeFile(PRODUCTS_FILE, JSON.stringify(filteredProducts, null, 2));
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Initialize and start server
initializeDataFiles().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}); 