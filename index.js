var http = require('http');
var bodyParser = require('body-parser');
var express = require('express');
var morgan = require('morgan');
var compress = require('compression');
var expressEnforcesSsl = require('express-enforces-ssl');
var app = express();

app.enable('trust proxy');
app.use(expressEnforcesSsl());
app.use(compress());
app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/status',function(req, res){
    res.send('/status GET OK');
});

app.get('/download',function(req, res){
    res.redirect("https://github.com/CloudSlang/cloud-slang/releases/download/cloudslang-2.0.5/cslang-cli-with-content.zip")
});

app.use(function(req, res) {
    var err = new Error('Not Found');
    err.status = 404;
    res.sendFile(__dirname + '/public/404.html')
});


app.set('port', (process.env.PORT || 5000));

// Start the server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port: ' + app.get('port'));
});
