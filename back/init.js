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
    db.collection('users').insertMany([
        {
            fname: 'Tamara',
            lname: 'Vukadinovic',
            email: 'taki@mail.com',
            password: 'takitaki',
            token: 'sdkjfhosa8f7y63498czxczc'
        },
        {
            fname: 'Miodrag',
            lname: 'Mikic',
            email: 'miki@mail.com',
            password: 'mikimiki',
            token: 'akjsdfhsdf76sdf876sd8f7s'
        },
    ]);

    // MOVIES
    db.collection('movies').insertMany([
        {
            naziv: 'Bohemian Rhapsody',
            godina: 2018,
            trajanje: 135,
            ocena: 0.82,
            opis: 'Boemska rapsodija je biografski film koji slavi grupu Queen, njihovu muziku i izvanrednog frontmena Fredija Merkjurija, koji je prkošenjem i razbijanjem stereotipa postao jedan od najobožavanijih zabavljača na planeti.',
            glumci: ['Rami Malek', 'Gwilym Lee', 'Ben Hardy'],
            reditelj: 'Bryan Singer',
            zanr: ['Drama']
        },
        {
            naziv: 'Blade Runner 2049',
            godina: 2017,
            trajanje: 150,
            ocena: 0.74,
            opis: 'Trideset godina nakon događaja iz prvog dela, novi blejd raner, policajac K (Rajan Gosling) otkriva davno skrivenu tajnu koja bi mogla da ono što je ostalo od društva pretvori u haos.',
            glumci: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
            reditelj: 'Denis Villeneuve',
            zanr: ['Avantura', 'Akcija']
        },
        {
            naziv: 'Big Hero 6',
            godina: 2014,
            trajanje: 120,
            ocena: 0.78,
            opis: 'Kad užasan događaj pogodi grad San Fransokio i smesti Hira usred opasnosti, on će potražiti pomoć od Bejmaksa i njegovih bliskih prijatelja.',
            glumci: ['Scott Adsit', 'Ryan Potter', 'Daniel Henney'],
            reditelj: 'Don Hall',
            zanr: ['Avantura', 'Komedija']
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
            opis: 'Serija je satirična parodija načina života američkog srednjeg staleža, predstavljenog kroz život porodice iz naslova.',
            glumci: ['Dan Castallaneta', 'Julie Kavner', 'Nancy Cartwright'],
            reditelj: 'Matt Groening',
            zanr: ['Komedija']
        },
    ]);

    // REVIEWS

    // EXIT PROGRAM
    console.log('Database initiated')
    // client.close();
    // process.exit();
});

