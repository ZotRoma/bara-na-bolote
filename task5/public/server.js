//кажется я не очень люблю js и серверы и все остальное, зачем вообще пошел на ПМИ учиться
var express = require('express');


var app = express();
//app.use(express.static(__dirname + '/public/js/main.js'));
//app.use(express.static(__dirname + '/public/layout.css'));

// create an express route for the home page
// http://localhost:8080/

app.use('/assets', express.static('./assets'));
//app.use('/assets', express.static(path.join(__dirname, 'public', 'assets')));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/layout.html');
});

app.get('/js/main.js', function(req, res) {
    res.sendFile(__dirname + '/js/main.js');
});
app.get('/layout.css', function(req, res) {
    res.sendFile(__dirname + '/layout.css');
});
app.get('/normalize.css', function(req, res) {
    res.sendFile(__dirname + '/normalize.css');
});
app.get('/Roboto-Regular.ttf', function(req, res) {
    res.sendFile(__dirname + '/fonts/Roboto-Regular.ttf');
});


// start the server on port 8080
app.listen(8080);
// send a message
console.log('Server has started!');
