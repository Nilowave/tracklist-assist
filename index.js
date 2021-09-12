const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('./db');
const itemRouter = require('./src/routes/item-router');

const app = express();
const apiPort = process.env.PORT || 1337;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/', (req, res) => {
  res.send('Tracklist');
});

app.use('/api', itemRouter);

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`));
