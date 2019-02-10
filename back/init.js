const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;

// MongoDB
const url = 'mongodb://localhost:27017';
const dbName = 'filmovi';
const client = new MongoClient(url, { useNewUrlParser: true });
let db;

// connect to server
client.connect(function (err) {
	console.log("Connected successfully to server");
    db = client.db(dbName);

    // CLEAR ALL
    db.collection('users').deleteMany({});
    db.collection('series').deleteMany({});
    db.collection('movies').deleteMany({});

    // USERS
    db.collection("users").createIndex( { "email" : 1 }, { unique : true } );
    //db.ensureIndex("email",callback)
    db.collection('users').insertMany([
        {
            fname: 'Tamara',
            lname: 'Vukadinovic',
            email: 'taki@mail.com',
            password: '12345678',
            token: 'sdkjfhosa8f7y63498czxczc'
        },
        {
            fname: 'Jovan',
            lname: 'Vukadinovic',
            email: 'joca@mail.com',
            password: '12345678',
            token: 'sdkjfhosa8f7y63498czxczc'
        },
        {
            fname: 'Petar',
            lname: 'Peric',
            email: 'pera@mail.com',
            password: '12345678',
            token: 'sdkjfhosa8f7y63498czxczc'
        },
        {
            fname: 'Miodrag',
            lname: 'Mikic',
            email: 'miki@mail.com',
            password: '12345678',
            token: 'akjsdfhsdf76sdf876sd8f7s'
        },
    ]);

    // MOVIES
    db.collection('movies').insertMany([
        {
            naziv: 'Bohemian Rhapsody',
            godina: 2018,
            trajanje: 135,
            ocena: 0.8,
            opis: 'The story of the legendary rock band Queen and lead singer Freddie Mercury, leading up to their famous performance at Live Aid',
            glumci: ['Rami Malek', 'Gwilym Lee', 'Ben Hardy'],
            reditelj: 'Bryan Singer',
            zanr: ['Drama'],
            slika: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/gbmkFWdtihe1VfydTDsieQ6VfGL.jpg'
        },
        {
            naziv: 'Blade Runner 2049',
            godina: 2017,
            trajanje: 150,
            ocena: 0.85,
            opis: 'A young blade runners discovery of a long-buried secret leads him to track down former blade runner Rick Deckard, whos been missing for thirty years.',
            glumci: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
            reditelj: 'Denis Villeneuve',
            zanr: ['Avantura', 'Akcija'],
            slika: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg'
        },
        {
            naziv: 'Big Hero 6',
            godina: 2014,
            trajanje: 120,
            ocena: 0.7,
            opis: 'The special bond that develops between plus-sized inflatable robot Baymax, and prodigy Hiro Hamada, who team up with a group of friends to form a band of high-tech heroes.',
            glumci: ['Scott Adsit', 'Ryan Potter', 'Daniel Henney'],
            reditelj: 'Don Hall',
            zanr: ['Avantura', 'Komedija'],
            slika: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/9gLu47Zw5ertuFTZaxXOvNfy78T.jpg'
        },
        {
            naziv: 'The Shawshank Redemption',
            godina: 1994,
            trajanje: 142,
            ocena: 0.93,
            opis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            glumci: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
            reditelj: 'Frank Darabont',
            zanr: ['Drama'],
            slika: 'https://image.tmdb.org/t/p/original/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg'
        },
        {
            naziv: 'Forest Gamp ',
            godina: 1994,
            trajanje: 142,
            ocena: 0.88,
            opis: 'The presidencies of Kennedy and Johnson, the events of Vietnam, Watergate, and other history unfold through the perspective of an Alabama man with an IQ of 75.',
            glumci: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
            reditelj: 'Robert Zemeckis',
            zanr: ['Drama', 'Romatika'],
            slika: 'https://image.tmdb.org/t/p/original/yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg'
        },
        {
            naziv: 'The Silence of the Lambs',
            godina: 1991,
            trajanje: 118,
            ocena: 0.86,
            opis: 'A young FBI cadet must receive the help of an incarcerated and manipulative cannibal killer to help catch another serial killer, a madman who skins his victims.',
            glumci: ['Jodie Foster', 'Anthony Hopkins', 'Lawrence A. Bonney'],
            reditelj: 'Jonathan Demme',
            zanr: ['Drama', 'Triler'],
            slika: 'https://image.tmdb.org/t/p/original/bOc2n4bMtFzjrgpPOOKXAM0AhAu.jpg'
        },
    ]);

    // SERIES
    db.collection('series').insertMany([
        {
            naziv: 'The Simpsons',
            godina: 1989,
            trajanje: 22,
            ocena: 0.69,
            epizode: 665,
            sezone: 30,
            opis: 'The satiric adventures of a working-class family in the misfit city of Springfield.',
            glumci: ['Dan Castallaneta', 'Julie Kavner', 'Nancy Cartwright'],
            reditelj: 'Matt Groening',
            zanr: ['Komedija'],
            slika: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/yTZQkSsxUFJZJe67IenRM0AEklc.jpg'
        },
        {
            naziv: 'Game of Thrones',
            godina: 2011,
            trajanje: 57,
            ocena: 0.95,
            epizode: 73,
            sezone: 8,
            opis: 'Nine noble families fight for control over the mythical lands of Westeros, while an ancient enemy returns after being dormant for thousands of years.',
            glumci: ['Emilia Clarke', 'Peter Dinklage', 'Kit Harington'],
            reditelj: 'David Benioff',
            zanr: ['Komedija','Akcija','Drama'],
            slika: 'https://image.tmdb.org/t/p/original/3EanTe9yClVB89JKlyxKd3GVFtx.jpg'
        },
        {
            naziv: 'Band of Brothers',
            godina: 2001,
            trajanje: 54,
            ocena: 0.95,
            epizode: 10,
            sezone: 1,
            opis: 'The story of Easy Company of the U.S. Army 101st Airborne Division, and their mission in World War II Europe, from Operation Overlord, through V-J Day.',
            glumci: ['Scott Grimes', 'Damian Lewis', 'Ron Livingston'],
            reditelj: 'Steven Spielberg',
            zanr: ['Istorijski','Akcija','Drama'],
            slika: 'https://image.tmdb.org/t/p/original/yjqu0KEVAWz9eJQBvzrQMFlGD84.jpg'
        },
        {
            naziv: 'Sherlock',
            godina: 2010,
            trajanje: 88,
            ocena: 0.92,
            epizode: 15,
            sezone: 4,
            opis: 'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.',
            glumci: ['Benedict Cumberbatch', 'Martin Freeman', 'Una Stubbs'],
            reditelj: 'Mark Gatiss',
            zanr: ['Misterija','Kriminalisticki','Drama'],
            slika: 'https://image.tmdb.org/t/p/original/22ngurXbLqab7Sko6aTSdwOCe5W.jpg'
        },
    ]);

    // REVIEWS

    // EXIT PROGRAM
    console.log('Database initiated')
    // client.close();
    // process.exit();
});

