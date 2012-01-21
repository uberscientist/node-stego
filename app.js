
/**
 * Module dependencies.
 */

var express = require('express'),
    form = require('connect-form'),
    fs = require('fs'),
    stego = require('stego');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes

app.get('/', function(req, res){
  res.render('index', {
    title: 'Node.JS Steganography'
  });
});

app.post('/encode', function(req, res){
  var secret = req.files.secret.path,
      image = req.files.image.path;
  stego.encode(secret, image, function(message, pub_bmp){
    var ajax_json = {
      stego_bmp: pub_bmp,
      message: message
    };
    res.send(ajax_json);
  });
});

app.post('/decode', function(req, res){
  var stego_path = req.files.stego.path,
      offset = req.body.offset;
  stego.decode(offset, stego_path, function(file_name, length){
    var ajax_json = {
      length: length,
      path: file_name
    };
    res.send(ajax_json);
  });
});

app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
