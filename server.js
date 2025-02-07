require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/vue-users';
mongoose.connect(mongoURI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.log('❌ MongoDB Connection Error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String
});

const User = mongoose.model('User', UserSchema);

// Get All Users
app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// Add New User
app.post('/users', async (req, res) => {
  const newUser = new User(req.body);
  await newUser.save();
  res.json({ message: 'User added successfully!' });
});

// Delete User
app.delete('/users/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted successfully!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
