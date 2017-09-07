var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser = require('body-parser');

var config = {
    user: 'iravalvizhigal',
    host: 'db.imad.hasura-app.io',
    port: '5432',
    database: 'iravalvizhigal',
    password: process.env.DB_PASSWORD
};

var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

var articles = {
        'article-one':{
        titles: 'Article One | Umaya',
        heading: 'Article One',
        date: 'Sep 4th, 2017',
        content:`
            <p>
                This is a good start.
            </p>
            <p>
                Liking what I'm doing.
            </p>
            <p>
                May be will do well.
            </p>`
        },
        'article-two':{
        titles: 'Article Two | Umaya',
        heading: 'Article Two',
        date: 'Sep 5th, 2017',
        content:`
            <p>
                This is a good start and going.
            </p>
            <p>
                Liking what I'm doing for sure.
            </p>
            <p>
                May be will do well too.
            </p>`
        },
        'article-three':{
        titles: 'Article Three | Umaya',
        heading: 'Article Three',
        date: 'Sep 6th, 2017',
        content:`
            <p>
                This is a good start and going still.
            </p>
            <p>
                Liking what I'm doing for sure and on.
            </p>
            <p>
                May be will do well too and how.
            </p>`
        }
    };

function createTemplate(data){
    var titles = data.titles;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmlTemplate =` 
       <html>
        <head>
            <title>
                ${titles}
            </title>
            <meta name="viewport" content="width=device-width, inital-scale=1"/>
            <link href="/ui/style.css" rel="stylesheet"/>
        </head>
        <body>
            <div class="container">
                <div>
                    <o href="/">Home</o>
                </div>
                <hr/>
                <h3>
                    ${heading}
                </h3>
                <div>
                    ${date}
                </div>
                <div>
                    ${content}
                </div>
            </div>
        </body>
    </html>
`;
return htmlTemplate;
}


app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

var pool = new Pool(config);

app.get('/test-db', function (req, res){
   // Connect to a db
   // Make  request to the db.
    pool.query('SELECT * FROM articles', function(err, result){
        if (err) {
            //res.status(500).send(err,toString());
        alert('Error!');
                    } else{
        res.send(JSON.stringify(result.rows));    
        }
    });
});

function hash(input, salt){
    // how to hash
    var hashed = crypto.pbkdf2Sync(input, salt, 10000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input', function(req, res){
    var hashedString = hash(req.params.input, 'this-is-a-random-string');
    res.send(hashedString);
});

app.post('/create-user', function(req, res){

var username = req.body.username;
var name = req.body.name;
var email = req.body.email;
var passwoord = req.body.password;

var salt = crypto.ramdomBytes(128).toString('hex');
   var dbString = hash(password, salt); 
   pool.query('INSERT INTO "User" (username, name, email, password) VALUES ($1, $2, $3, $4)', [username, name, email, dbString], function (err, result){
       if (err) {
           res.status(500).send(err.toString());
       } else {
           res.send('User successfully create : ' + username);
       }
   }
)}
);

app.get('/articles/:articleName', function(req, res){
    var articleName = req.params.articleName;
    
    pool.query("SELECT * FROM articles WHERE title = $1", [req.params.articleName], function(err, result){
        if (err){
            res.status(500).send(err.toString());
        } else {
            if (result.rows.length === 0){
                res.status(404).send('Article not found');
            } else {
                var articleData = result.rows[0];
                res.send(createTemplate(articleData));
            }
        }
    });
});


var counter = 0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
});

var names = [];
app.get('/submit-name', function(req,res){
  // Get the name from the request
  var name = req.query.name;
  
  names.push(name);
  //JSON: Javascript Object Notation
  res.send(JSON.stringify(names));
  
});

app.get('/:articleName', function(req, res){
    var articleName = req.params.articleName;     
    res.send(createTemplate(articles[articleName]));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});

app.get('/ui/main.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});