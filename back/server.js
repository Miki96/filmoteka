const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const history = require('connect-history-api-fallback');
const crypto = require('crypto');

const app = express();
const port = 3000;

// parse application/x-www-form-urlencoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'filmovi';
const client = new MongoClient(url, { useNewUrlParser: true });
let db;

// Use connect method to connect to the Server
client.connect(function (err) {
	console.log("Connected successfully to server");
	// save client to db
	db = client.db(dbName);
});

// history mode
app.use(history());

// Add CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

    // intercepts OPTIONS method
    if ('OPTIONS' === req.method) {
        res.sendStatus(200);
    } else {
        next();
    }
});


// Nezasticene rute //

// SIGN UP
app.post('/user', function (req, res) {
	let fname = (req.body.fname == null) ? "" : req.body.fname.trim();
	let lname = (req.body.lname == null) ? "" : req.body.lname.trim();
    let email = (req.body.email == null) ? "" : req.body.email.trim();
    let password = (req.body.password == null) ? "" : req.body.password.trim();
   	let token = crypto.randomBytes(20).toString('hex');

    if (fname == "" || lname == "" || email == "" || password == "") {
        res.status(400).send('Form not valid');
        return;
	}
	
	db.collection('users').insertOne({
		fname: fname,
		lname: lname,
		email: email,
		password: password,
		token: token
	}, function (err, result) {
		if (err) {
			res.status(400).send(err);
			return;
		}
		// saved
		res.status(201).send('ok');
	});
});

// LOGIN
app.post('/auth', function(req, res){
    let email = (req.body.email == null) ? "" : req.body.email.trim();
	let pass = (req.body.password == null) ? "" : req.body.password.trim();
	console.log(req.body);

    if (email == "" || pass == "") {
        res.status(400).send('Form not valid');
        return;
	}
	db.collection('users').findOne({
		email: email, 
		password: pass
	}, function (err, result) {
		if (err || !result) {
			res.status(400).send('Wrong email or password');
			return;
		}
		// success
		res.status(200).send({
			id: result._id,
			token: result.token
		});
	});
});

// Dodaje TOKEN ako postoji
app.use((req, res, next) => {
    var auth = req.headers.authorization;
    var token = "";
    if (auth != null) {
        token = auth.split(' ')[1];
        req.body['token'] = token;
    }
    console.log('Token Protect: ' + token);
    next();
});

// LOG OUT
app.get('/logout', (req, res) => {
	var oldtoken = req.body['token'];
    if (oldtoken == null) {
		res.status(200).send('How even?');
    } else {
		console.log('logout');
        let token = crypto.randomBytes(20).toString('hex');
		// change token of user
		let query = {$set: {'token': token}};
		db.collection('users').updateOne({
			token: oldtoken},
			query, 
			function (err, result) {
			if (err) {
				res.status(404).send();
			}
			res.status(200).send('Logged out');
		});
    }
});


// Zasticene rute //

var userID = -1;

// Block invalid token middleware
app.use((req, res, next) => {
    var token = req.body['token'];
    if (token == null) {
        res.status(401).send('No token provided');
        return;
    }
    db.collection('users').findOne({
		token: token
	}, function (err, result) {
		if (err) {
			res.status(401).send('Invalid token');
			return;
		}
		// set user ID
		userID = result._id;
		next();
	});
});

// Provera Tokena
app.post('/validate', (req, res) => {
    res.status(200).send({id : userID});
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
	var id = mongo.ObjectID(ids);
	
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


// update user movies
app.put('/addMovie/:id', function (req, res) {
	let ids = userID;
	let idFilma = req.params.id;
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

//delete movie from user's list
app.put('/deleteMovie/:id', function (req, res) {
	let ids = userID;
	let idFilma = req.params.id;

	let id = mongo.ObjectID(ids);
	let idF = mongo.ObjectID(idFilma);

	let query = {$pull: {filmovi: {idFilma: idF} }};
	console.log(query);
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

app.put('/addCommM/:id', function (req, res) {
	let ids = userID;
	let idFilma = req.params.id;
	let kom = req.body.kom;

	let id = mongo.ObjectID(ids);
	let idF = mongo.ObjectID(idFilma);

	let query = {$set: {'filmovi.$.komentar': kom} };

	db.collection('users').updateOne({
		_id: id, "filmovi.idFilma": idF },
		query, 
		function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send('comment added');
	});
});

app.put('/addRatingM/:id', function (req, res) {
	let ids = userID;
	let idFilma = req.params.id;
	let ocena = parseInt(req.body.ocena);

	let id = require('mongodb').ObjectID(ids);
	let idF = require('mongodb').ObjectID(idFilma);

	let query = {$set: {'filmovi.$.ocena': ocena} };

	db.collection('users').updateOne({
		_id: id, "filmovi.idFilma": idF },
		query, 
		function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send('rating added');
	});
});

//filmovi na osnovu niza id-jeva
app.post('/movieList', function (req, res) {
	let niz = [];
	let nizId = req.body.id;
	
	nizId.forEach(element => {
		niz.push(mongo.ObjectID(element));
	});

	
	db.collection('movies').find(
		{ _id : { $in : niz } }
	).toArray(function (err, result) {
		res.status(200).send(result);
	});

});


// update user series 
app.put('/addSeries/:id', function (req, res) {
	let ids = userID;
	let idSerije = req.params.id;

	let id = require('mongodb').ObjectID(ids);
	let idS = require('mongodb').ObjectID(idSerije);

	let query = {$addToSet: {serije: {idSerije: idS} }};

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

app.put('/addCommS/:id', function (req, res) {
	let ids = req.params.id;
	let idSerije = req.body.idSerije;
	let kom = req.body.kom;

	// console.log(kom);
	let id = require('mongodb').ObjectID(ids);
	let idS = require('mongodb').ObjectID(idSerije);

	let query = {$set: {'serije.$.komentar': kom} };

	db.collection('users').updateOne({
		_id: id, "serije.idSerije": idS },
		query, 
		function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send('comment added');
	});
});

app.put('/addRatingS/:id', function (req, res) {
	let ids = req.params.id;
	let idSerije = req.body.idSerije;
	let ocena = parseInt(req.body.ocena);

	let id = require('mongodb').ObjectID(ids);
	let idS = require('mongodb').ObjectID(idSerije);

	let query = {$set: {'serije.$.ocena': ocena} };

	db.collection('users').updateOne({
		_id: id, "serije.idSerije": idS },
		query, 
		function (err, result) {
		if (err) {
			res.status(400).send(err);
		}
		res.status(200).send('rating added');
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
app.post('/movieSearch', function (req, res) {
	console.log(req.body);
	let sub = req.body.sub;
	let god = parseInt(req.body.godina);
	let zanr = req.body.zanr;
	let ocena = parseFloat(req.body.ocena);

	let query = {};
	if (zanr) query.zanr = zanr;
	if (ocena) query.ocena = {$gte: ocena};
	if (god) query.godina = {$gte: god};
	if (sub) query.naziv = {$regex: sub, $options: "$i"};
	console.log(query);

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
app.post('/seriesSearch', function (req, res) {
	let sub = req.body.sub;
	let god = parseInt(req.body.godina);
	let zanr = req.body.zanr;
	let ocena = parseFloat(req.body.ocena);
	let epizode = parseInt(req.body.epizode);

	let query = {};
	if (zanr) query.zanr = zanr;
	if (ocena) query.ocena = {$gte: ocena};
	if (god) query.godina = {$gte: god};
	if (epizode) query.epizode = {$gte: epizode};
	if (sub) query.naziv = {$regex: sub, $options: "$i"};
	console.log(query);

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
		epizode: parseInt(req.body.broj),
		godina: parseInt(req.body.godina),
		sezona: parseInt(req.body.sezona),  //ne bih epizode izdvajala
		reziser: req.body.reziser,
		zanr: req.body.zanr,
		ocena: parseInt(req.body.ocena),
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