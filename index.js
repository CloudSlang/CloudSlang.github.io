var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var app = express();

app.use(compress());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/status',function(req, res){
    res.send('/status GET OK');
});


app.use(function(req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.sendFile(__dirname + '/404.html')
});


app.set('port', (process.env.PORT || 5000));

// Start the server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port: ' + app.get('port'));
});
