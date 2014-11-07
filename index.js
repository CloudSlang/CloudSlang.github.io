var http = require('http');
var bodyParser = require('body-parser')
var express = require('express');
var morgan = require('morgan');
var nodemailer = require('nodemailer');
var app = express();

app.use(morgan('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('/status',function(req, res){
    res.send('/status GET OK');
});

app.post('/contact',function(req, res){

    if (!req.body.name || !req.body.email || !req.body.subject || !req.body.body || req.body.last) {
        res.status(400);
    } else {
        var mailOptions = {
            from: req.body.name + ' <' + req.body.email + '>',
            to: 'dorsha123@gmail.com',
            subject: 'Mail to HP score. Subject: ' + req.body.subject,
            text: 'Name: ' + req.body.name + '. Message: ' + req.body.body,
            html:
                '<div style="font-size: 20px; font-weight: bold">' +
                '<p>Email to score just arrived!</p>' +
                '<p>Sender name: ' + req.body.name + '</p>' +
                '<p>Sender email: ' + req.body.email + '</p>' +
                '<p>Message: </p>' +
                '<div style="font-size: 16px; font-weight: normal">' +
                req.body.body +
                '</div>' +
                '</div>'
        };

        sendMail(mailOptions, function () {
            res.send('OK');
        }, function () {
            res.status(500);
        });
    }
});

app.set('port', (process.env.PORT || 5000));

// Start the server
http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port: ' + app.get('port'));
});

function sendMail(mailOptions, success, failure) {

    // create reusable transporter object using SMTP transport
    var transporter = nodemailer.createTransport("SMTP", {
        service: 'Gmail',
        auth: {
            user: 'dorsha.meir',
            pass: 'meir.dorsha'
        }
    });

    transporter.sendMail(mailOptions, function(error){
        if (error) {
            failure();
        } else {
            success();
        }
    });
}