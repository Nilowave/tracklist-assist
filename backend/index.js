const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const { Server } = require('socket.io');

// const io = new Server(server);
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
app.use(express.static(path.resolve(__dirname, '../frontend/build')));

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

io.on('connection', (socket) => {
  console.log('a user connected');
  io.sockets.emit('message', { id: 'connected' });
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../frontend/build', 'index.html'));
});

app.use('/api', itemRouter(io));

server.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
