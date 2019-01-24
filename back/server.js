const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

// app
const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'filmovi';

// Create a new MongoClient
const client = new MongoClient(url, { useNewUrlParser: true });

// Database var
let db;

// Use connect method to connect to the Server
client.connect(function (err) {
	console.log("Connected successfully to server");
	// save client to db
	db = client.db(dbName);
	//client.close();
});

//test
app.get('/', function (req, res) {
	res.send('Hello World');
});

// SIGN UP
app.post('/user', function (req, res) {
	let username = (req.body.username == null) ? "" : req.body.username.trim();
    let email = (req.body.email == null) ? "" : req.body.email.trim();
    let pass = (req.body.pass == null) ? "" : req.body.pass.trim();
   // let token = crypto.randomBytes(20).toString('hex');

    if (username == "" || email == "" || pass == "") {
        res.status(400).send('Form not valid');
        return;
	}
	
	db.collection('users').insertOne({
		username: req.body.username,
		email: req.body.email,
		password: req.body.pass
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		// saved
		res.status(201).send('ok');
	});
});

// get all users
app.get('/users', function (req, res) {
	db.collection('users').find().toArray(function (err, result) {
		res.status(200).send(result);
	});
});

// get user
app.get('/user/:id', function (req, res) {
	let ids = req.params.id;
	console.log(ids);
	var id = require('mongodb').ObjectID(ids);
	
	db.collection('users').findOne({
		_id: id
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send(result);
	});
});

// delete user
app.delete('/user/:id', function (req, res) {
	let ids = req.params.id;
	var id = require('mongodb').ObjectID(ids);
	
	db.collection('users').remove({
		_id: id
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send("deleted");
	});
});


app.listen(port, () => {
	console.log('Server is up and running on port number ' + port);
});