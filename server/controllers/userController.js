
const User = require('../model/userSchema');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const allUser = async (req, res, next) => {
    try {
        // Retrieve all users from the database
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error getting all users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const signup = async (req, res, next) => {
    try {
        const { email, username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, username, password: hashedPassword, blogs: [] });
        await newUser.save();
        res.status(201).json({ user: newUser });
    } catch (error) {
        console.error('Error in signing up:', error);
        res.status(500).json({ error: 'Error in signing up' });
    }
};

const SECRET_KEY = process.env.SECRET_KEY ;

const login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });

        if (!user) {
            console.log('User not found for username:', username);
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid password for user:', username);
            return res.status(401).json({ error: 'Invalid password' });
        }

        console.log('Login successful. User ID:', user._id);
        const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1hr' });

        res.status(200).json({ message: "Login successful", User: user, token });
    } catch (e) {
        console.error('Error during login:', e);
        res.status(500).json({ error: 'Unable to process login' });
    }
};


  const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: 'Invalid token' });
      }
  
      req.userId = decoded.userId;
      next();
    });
  };
  







module.exports = { allUser, signup, login, verifyToken
};
