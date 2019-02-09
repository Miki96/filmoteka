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
    db.collection("users").createIndex( { "email" : 1 }, { unique : true } );//nova linija
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
            ocena: 10,
            opis: 'Boemska rapsodija je biografski film koji slavi grupu Queen, njihovu muziku i izvanrednog frontmena Fredija Merkjurija, koji je prkošenjem i razbijanjem stereotipa postao jedan od najobožavanijih zabavljača na planeti.',
            glumci: ['Rami Malek', 'Gwilym Lee', 'Ben Hardy'],
            reditelj: 'Bryan Singer',
            zanr: ['Drama'],
            slika: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/gbmkFWdtihe1VfydTDsieQ6VfGL.jpg'
        },
        {
            naziv: 'Blade Runner 2049',
            godina: 2017,
            trajanje: 150,
            ocena: 8.5,
            opis: 'Trideset godina nakon događaja iz prvog dela, novi blejd raner, policajac K (Rajan Gosling) otkriva davno skrivenu tajnu koja bi mogla da ono što je ostalo od društva pretvori u haos.',
            glumci: ['Ryan Gosling', 'Harrison Ford', 'Ana de Armas'],
            reditelj: 'Denis Villeneuve',
            zanr: ['Avantura', 'Akcija'],
            slika: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/gajva2L0rPYkEWjzgFlBXCAVBE5.jpg'
        },
        {
            naziv: 'Big Hero 6',
            godina: 2014,
            trajanje: 120,
            ocena: 7,
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
            ocena: 9.3,
            opis: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            glumci: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
            reditelj: 'Frank Darabont',
            zanr: ['Drama'],
            slika: 'https://image.tmdb.org/t/p/original/9O7gLzmreU0nGkIB6K3BsJbzvNv.jpg'
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
            zanr: ['Komedija'],
            slika: 'https://image.tmdb.org/t/p/w300_and_h450_bestv2/yTZQkSsxUFJZJe67IenRM0AEklc.jpg'
        },
    ]);

    // REVIEWS

    // EXIT PROGRAM
    console.log('Database initiated')
    // client.close();
    // process.exit();
});

