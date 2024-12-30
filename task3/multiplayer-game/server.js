require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = 3000;

let users = [];
let activePlayers = [];

app.use(express.json());
app.use(express.static('public'));

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  if (!user) return res.status(400).json({ message: 'User not found' });
  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (err) return res.status(500).json({ message: 'Error checking password' });
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  });
});
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password' });
    const newUser = { username, password: hashedPassword };
    users.push(newUser);
    res.status(201).json({ message: 'User registered' });
  });
});

const authenticateJWT = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.sendStatus(403);
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
app.get('/matchmaking', authenticateJWT, (req, res) => {
  if (activePlayers.length % 2 === 0) {
    activePlayers.push(req.user.username);
    res.json({ message: 'Waiting for another player...' });
  } else {
    const opponent = activePlayers.pop();
    io.emit('start-game', { player1: req.user.username, player2: opponent });
    res.json({ message: `Match found! You are playing against ${opponent}` });
  }
});

app.get('/stats', authenticateJWT, (req, res) => {
  res.json({ username: req.user.username, gamesPlayed: 10, gamesWon: 5 });
});
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('game-action', (actionData) => {
    console.log('Action received:', actionData);
    io.emit('game-update', actionData);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
