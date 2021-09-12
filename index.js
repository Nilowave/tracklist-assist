const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');
const io = require('socket.io')(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

const db = require('./db');
const itemRouter = require('./src/routes/item-router');

const apiPort = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

io.on('connection', (socket) => {
  console.log('a user connected');
});

app.get('/', (req, res) => {
  res.send('Tracklist');
});

app.use('/api', itemRouter);

app.post('/api/item', (req, res, next) => {
  io.sockets.emit('message', { id: 'update', data: req.body });
});

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
