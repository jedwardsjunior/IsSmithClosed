// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var request        = require("request");
var snow_day       = require("./public/js/snow_day")
// configuration ===========================================
var port = process.env.PORT || 8080; // set our port


// setup middleware
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users


// Set our default template engine to "jade"
// which prevents the need for extensions
// (although you can still mix and match)
app.set('views', __dirname + '/public/views');
app.set('view engine', 'jade');


app.get('/', function(req, res){
  var response = snow_day.snow_day();
  response = JSON.parse(response);
  console.log(response);
  res.render('index',
{ "snowday": response.answer,
              "day"    : response.message
            });
});

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
