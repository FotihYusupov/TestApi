const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/router');
const path = require('path')

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log('db error', err.message));

app.set('views', path.resolve(process.cwd(), 'views'));
app.set('view engine', 'ejs');

app.use(cors());

app.get('/', (req, res) => {
  res.render('index')
})

app.use(express.static('uploads'));
app.use(express.static('assets'));

app.use('/api', router);

app.listen(process.env.PORT || 3001, () => console.log('server is run'));