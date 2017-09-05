var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));

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

var counter = 0;
app.get('/counter', function(req,res){
    counter = counter + 1;
    res.send(counter.toString());
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
