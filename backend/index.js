require('dotenv').config();

const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const path = require('path');

const app = express();
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const io = new Server(server);

const sessionMiddleware = cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.SEKRETO],
});

app.use(sessionMiddleware);

const db = require('./db');
const itemRouter = require('./src/routes/item-router');
const authRouter = require('./src/routes/auth-router');

const apiPort = process.env.PORT;

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require('./config/passport');

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

io.use((socket, next) => {
  sessionMiddleware(socket.request, {}, next);
}).on('connection', (socket) => {
  const userId = socket.request.session.passport.user;
  console.log('a user connected', userId);
  if (userId) {
    socket.join(userId);
    io.to(userId).emit('message', { id: 'connected' });
  }
});

app.get('/', (req, res) => {
  console.log('landing', req.user);
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.get('/login', (req, res) => {
  res.redirect('/');
});

app.use('/api', itemRouter(io));
app.use('/auth', authRouter());

app.get('*', function (req, res) {
  res.redirect('/');
});

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
