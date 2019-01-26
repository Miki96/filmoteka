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
    let password = (req.body.password == null) ? "" : req.body.password.trim();
   // let token = crypto.randomBytes(20).toString('hex');

    if (username == "" || email == "" || password == "") {
        res.status(400).send('Form not valid');
        return;
	}
	
	db.collection('users').insertOne({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		// saved
		res.status(201).send('ok');
	});
});

//LOGIN
app.post('/auth', function(req, res){
    let user = (req.body.username == null) ? "" : req.body.username.trim();
    let pass = (req.body.password == null) ? "" : req.body.password.trim();

    console.log(user);
    console.log(pass);

    if (user == "" || pass == "") {
        res.status(400).send('Form not valid');
        return;
	}
	db.collection('users').findOne({
		username:user, 
		password:pass
	}, function (err, result) {
		if (err || !result) {
			res.status(400).send('Wrong email or password');
		}
		res.status(200).send(result);
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

//delete all users
app.delete('/user', function (req, res) {
	db.collection('users').remove({}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send("deleted all documents");
	});
});

// update user  nije zavrsen  //post
app.put('/addMovie/:id', function (req, res) {
	let ids = req.params.id;
	let idFilma = req.body.idFilma;

	//console.log(idFilma);
	let id = require('mongodb').ObjectID(ids);
	let idF = require('mongodb').ObjectID(idFilma);

	let query = {$addToSet: {filmovi: {idFilma: idF} }};

	db.collection('users').updateOne({
		_id: id},
		query, 
		function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send(result);
	});
});

app.put('/addComm/:id', function (req, res) {
	let ids = req.params.id;
	let idFilma = req.body.idf;
	let kom = req.body.kom;

	// console.log(kom);
	let id = require('mongodb').ObjectID(ids);
	let idF = require('mongodb').ObjectID(idFilma);

	let query = {$set: {'filmovi.$.komentar': kom} };

	db.collection('users').updateOne({
		_id: id, filmovi: {idFilma: idF} },
		query, 
		function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send(result);
	});
});




// get movie
app.get('/movie/:id', function (req, res) {
	let ids = req.params.id;
	console.log(ids);
	var id = require('mongodb').ObjectID(ids);
	
	db.collection('movies').findOne({
		_id: id
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send(result);
	});
});


// get movie with some parameters
app.get('/movieSearch', function (req, res) {
	let sub = req.query.sub;
	let god = parseInt(req.query.godina);
	let zanr = req.query.zanr;
	let ocena = parseInt(req.query.IMDBocena);

	let query = {};
	if (zanr) query.zanr = zanr;
	if (ocena) query.IMDBocena = {$gte: ocena};
	if (god) query.godina = {$gte: god};
	if (sub) query.naziv = {$regex: sub};


	db.collection('movies').find(
		query
		
	).toArray(function (err, result) {
		res.status(200).send(result);
	});
});


//post movie
app.post('/movie', function (req, res) {
	db.collection('movies').insertOne({
		naziv: req.body.naziv,
		trajanje: parseInt(req.body.trajanje),
		godina: parseInt(req.body.godina),
		reziser: req.body.reziser,
		zanr: req.body.zanr,
		IMDBocena: parseInt(req.body.IMDBocena),
		opis: req.body.opis
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		// saved
		res.status(201).send('ok');
	});
});

// delete all movies
app.delete('/movies', function (req, res) {
	db.collection('movies').remove({}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send("deleted all movies");
	});
});




// get series
app.get('/series/:id', function (req, res) {
	let ids = req.params.id;
	console.log(ids);
	var id = require('mongodb').ObjectID(ids);
	
	db.collection('series').findOne({
		_id: id
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send(result);
	});
});

// get series with some parameters
app.get('/seriesSearch', function (req, res) {
	let sub = req.query.sub;
	let god = parseInt(req.query.godina);
	let zanr = req.query.zanr;
	let ocena = parseInt(req.query.IMDBocena);
	let epizode = parseInt(req.query.epizode);

	let query = {};
	if (zanr) query.zanr = zanr;
	if (ocena) query.IMDBocena = {$gte: ocena};
	if (god) query.godina = {$gte: god};
	if (epizode) query.epizode = {$gte: epizode};
	if (sub) query.naziv = {$regex: sub};

	db.collection('series').find(
		query
		
	).toArray(function (err, result) {
		res.status(200).send(result);
	});
});


//post series
app.post('/series', function (req, res) {
	db.collection('series').insertOne({
		naziv: req.body.naziv,
		brojEpizoda: parseInt(req.body.broj),
		godina: parseInt(req.body.godina),
		sezona: parseInt(req.body.sezona),  //ne bih epizode izdvajala
		reziser: req.body.reziser,
		zanr: req.body.zanr,
		IMDBocena: parseInt(req.body.IMDBocena),
		opis: req.body.opis
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		// saved
		res.status(201).send('ok');
	});
});










app.listen(port, () => {
	console.log('Server is up and running on port number ' + port);
});