// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var request        = require("request");

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

function get_request( cb ) {
  request({
      uri: "http://www.smith.edu/media/emergency/",
    }, function(error, response, body) {
      if (body.indexOf(global.search1) != -1 ||
        body.indexOf(global.search2) != -1 ||
        body.indexOf(global.search3) != -1 ||
        body.indexOf(global.search4) != -1
      )
    {
      console.log("Yippee!");
      global.snowday_today = "yes";
    }
    if (body.indexOf(global.search5) != -1 ||
      body.indexOf(global.search6) != -1 ||
      body.indexOf(global.search7) != -1 ||
      body.indexOf(global.search8) != -1)
    {
      global.snowday_tomorrow = "yes";
    }
    cb();
  })
};


app.get('/', function(req, res){
  // Figure out if it's a snow day =============================================

  var d = new Date();

  // All the arrays...
  var weekday = new Array(7);
  weekday[0]=  "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  var months = new Array(12);
  months[0]=  "January";
  months[1] = "February";
  months[2] = "March";
  months[3] = "April";
  months[4] = "May";
  months[5] = "June";
  months[6] = "July";
  months[7] = "August";
  months[8] = "September";
  months[9] = "October";
  months[10] = "November";
  months[11] = "December";

  var months2 = new Array(12);
  months2[0]=  "Jan.";
  months2[1] = "Feb.";
  months2[2] = "Mar.";
  months2[3] = "Apr.";
  months2[4] = "May";
  months2[5] = "June";
  months2[6] = "July";
  months2[7] = "Aug.";
  months2[8] = "Sep.";
  months2[9] = "Oct.";
  months2[10] = "Nov.";
  months2[11] = "Dec.";

  // All the months/dates/days of the week for today...
  var month = months[d.getMonth()];
  var month2 = months2[d.getMonth()];

  var date  = d.getDate();
  var date1 = "";
  if(date < 10) {
    date1 = "0" + date;
  };

  var d2 = d.getDay()
  var day = weekday[d2];

  global.search1 = month+" "+date;
  global.search2 = month2+" "+date;
  global.search3 = month+" "+date;
  global.search4 = month2+" "+date;
  if(date1 != "") {
    global.search3 = month+" "+date1;
    global.search4 = month2+" "+date1;
  }

  // And tomorrow...

  var tomorrow = "";
  var tomorrow1 = "";
  var tomorrow_month = month;
  var tomorrow_month2 = month2;

  if (month == "February") {
    if (date < 28) {
      tomorrow = date + 1;
      if(date < 9) {
        tomorrow1 = "0" + tomorrow;
      };
    } else {
      tomorrow = 1;
      tomorrow1 = "01";
      var tomorrow_month = months[d.getMonth()+1];
      var tomorrow_month2 = months2[d.getMonth()+1];
    }
  } else if (month == "April" ||
            month == "June" ||
            month == "September" ||
            month == "November") {
      if (date < 30) {
        tomorrow = date + 1;
        if(date < 9) {
          tomorrow1 = "0" + tomorrow;
        };
      } else {
        tomorrow = 1;
        tomorrow1 = "01";
        var tomorrow_month = months[d.getMonth()+1];
        var tomorrow_month2 = months2[d.getMonth()+1];
      }
  } else if (date < 31) {
    tomorrow = date + 1;
    if(date < 9) {
      tomorrow1 = "0" + tomorrow;
    };
  } else {
    tomorrow = 1;
    tomorrow1 = "01";
    if (month == "December") {
      var tomorrow_month = months[0];
      var tomorrow_month2 = months2[0];
    } else {
      var tomorrow_month = months[d.getMonth()+1];
      var tommorw_month2 = months2[d.getMonth()+1];
    };
  }

  var tomorrow_day = "";
  if (d2 < 6) {
    var tomorrow_day = weekday[d2+1];
  } else {
    var tomorrow_day = weekday[0];
  }

  global.search5 = tomorrow_month+" "+tomorrow;
  global.search6 = tomorrow_month2+" "+tomorrow;
  global.search7 = tomorrow_month+" "+tomorrow;
  global.search8 = tomorrow_month2+" "+tomorrow;
  if(tomorrow1 != "") {
    global.search7 = tomorrow_month+" "+tomorrow1;
    global.search8 = tomorrow_month2+" "+tomorrow1;
  }

  console.log(global.search1);
  console.log(global.search2);
  console.log(global.search3);
  console.log(global.search4);
  console.log(global.search5);
  console.log(global.search6);
  console.log(global.search7);
  console.log(global.search8);
  console.log(day);
  console.log(tomorrow_day);

  var answer = "No"
  var message = "Smith is open today."
  global.snowday_today = "no";
  global.snowday_tomorrow = "no";


  get_request( function() {

    console.log(global.snowday_today);
    console.log(global.snowday_tomorrow);
    if (snowday_today=="yes" && snowday_tomorrow=="yes") {
      answer = "Epic!";
      message = "Classes are canceled today and tomorrow!"
    } else if (snowday_today=="yes") {
      answer = "Yes!";
      message = "Classes are canceled today!"
    } else if (snowday_tomorrow=="yes") {
      answer = "Yes!";
      message = "Classes are canceled tomorrow!"
    }

    console.log(answer);
    console.log(message);

    res.render('index',
              { "snowday": answer,
                "day"    : message
              });
  });
});

// start app ===============================================
app.listen(port);
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app
