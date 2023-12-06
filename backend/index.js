require('dotenv').config();

const axios = require('axios');
const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');
const passport = require('passport');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const sessionMiddleware = cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.SEKRETO],
});

app.use(sessionMiddleware);

const db = require('./db');
const authRouter = require('./src/routes/auth-router');
const itemRouter = require('./src/routes/item-router');

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
  console.log('a user connected, hello #', userId);
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

app.get('*', (req, res) => {
  res.redirect('/');
});

/**
 * Tracking Pixel implementation used for Ashley's Light Media E-mail tracking
 */

const trackImg = Buffer.from('R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7', 'base64');

app.get('/pixel/track/:hash', async (req, res) => {
  const { hash } = req.params;

  if (!hash) {
    res.status(404).send('Not Found');
    res.end(trackImg);
  } else {
    res.writeHead(200, {
      'Content-Type': 'image/gif',
      'Content-Length': trackImg.length,
    });
  }

  try {
    const postData = { hash };
    await axios.post('https://hook.us1.make.com/6iplwxi8dcybs1pdl2erlbscbwecujrq', postData);
  } catch (error) {
    console.error('Error making POST request to webhook:', error);
  }

  res.end(trackImg);
});

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
