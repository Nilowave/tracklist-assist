require('dotenv').config();

const axios = require('axios');
const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { Server } = require('socket.io');
const http = require('http');
const path = require('path');
require('dotenv').config();

const app = express();

const server = http.createServer(app);
const io = new Server(server);

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);

const sessionMiddleware = cookieSession({
  maxAge: 30 * 24 * 60 * 60 * 1000,
  keys: [process.env.SEKRETO],
});

app.use(sessionMiddleware);

const db = require('./db');
const authRouter = require('./src/routes/auth-router');
const itemRouter = require('./src/routes/item-router');
const PixelService = require('./src/services/pixel-service');

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

  const pixel = await PixelService.get(hash);

  if (pixel?.hash) {
    try {
      const postData = { hash: pixel.hash };
      await axios.post('https://hook.us1.make.com/6iplwxi8dcybs1pdl2erlbscbwecujrq', postData);
      PixelService.remove(pixel.hash);
    } catch (error) {
      console.error('Error making POST request to webhook:', error);
    }
  }

  res.end(trackImg);
});

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401); // if there's no token
  console.log({ token });
  jwt.verify(token, process.env.PIXEL_TOKEN_SECRET, (err, user) => {
    console.log({ err });
    if (err) return res.sendStatus(403); // if the token is invalid
    req.user = user;
    next();
    return null;
  });

  return null;
};

app.post('/pixel/create', authenticateToken, async (req, res) => {
  const { hash } = req.body;

  if (!hash) {
    return res.status(400).send('Hash is required');
  }

  try {
    await PixelService.create(hash);

    return res.status(201).send('Pixel created successfully');
  } catch (error) {
    console.error('Error creating pixel:', error);
    return res.status(500).send('Internal Server Error');
  }
});

app.get('*', (req, res) => {
  res.redirect('/');
});

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
