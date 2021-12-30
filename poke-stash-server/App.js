const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
// const Pokemon = require('./models/pokemon');

const app = express();

require('dotenv').config();

mongoose.connect('mongodb://localhost:27017/poke-stash', {
	useNewUrlParser: true,
	useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

app.use(express.static(path.join(__dirname, 'poke-stash-frontend/build')));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
//form-urlencoded
// for parsing multipart/form-data
// app.use(upload.array());

// Routes
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoutes');

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.get('/home', (req, res) => {
	var list = [
		'items1',
		'items2',
		'items3'
	];
	res.json(list);
	console.log('Sent list of items');
});

app.get('*', (req, res) => {
	//404 page
});

const port = process.env.PORT || 5000;
app.listen(port);
console.log('Serving on port ' + port);
