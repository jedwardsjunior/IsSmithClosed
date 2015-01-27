var request        = require("request");

global.last_updated = "";
global.body = "Nada";
var snowday_today = "no";
var snowday_tomorrow = "no";

function get_request( cb ) {
  var d = new Date();
  var today = (d.getMonth()+1) + "/" + d.getDate();

  if (global.last_updated != today) {
    request({
        uri: "http://www.smith.edu/media/emergency/",
      }, function(error, response, body) {
        global.body = body;
        global.last_updated = today;
      });
  }

  if (global.body.indexOf(global.search1) != -1 ||
    global.body.indexOf(global.search2) != -1 ||
    global.body.indexOf(global.search3) != -1 ||
    global.body.indexOf(global.search4) != -1
  )
  {
    snowday_today = "yes";
  } else {
    snowday_today = "no";
  }

  if (global.body.indexOf(global.search5) != -1 ||
    global.body.indexOf(global.search6) != -1 ||
    global.body.indexOf(global.search7) != -1 ||
    global.body.indexOf(global.search8) != -1)
  {
    snowday_tomorrow = "yes";
  } else {
    snowday_tomorrow = "no";
  }
  cb();
};

module.exports = {

  snow_day: function() {

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

    // Create the search strings for today

    global.search1 = "Closed "+day+", "+month+" "+date;
    global.search2 = "Closed "+day+", "+month2+" "+date;
    global.search3 = "Closed "+day+", "+month+" "+date;
    global.search4 = "Closed "+day+", "+month2+" "+date;
    if(date1 != "") {
      global.search3 = "Closed "+day+", "+month+" "+date1;
      global.search4 = "Closed "+day+", "+month2+" "+date1;
    }

    // All the months/dates/days of the week for tomorrow

    var tomorrow = "";
    var tomorrow1 = "";  // In case it's the last day of the month
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

    // Create the search strings for today

    global.search5 = "Closed "+tomorrow_day+", "+tomorrow_month+" "+tomorrow;
    global.search6 = "Closed "+tomorrow_day+", "+tomorrow_month2+" "+tomorrow;
    global.search7 = "Closed "+tomorrow_day+", "+tomorrow_month+" "+tomorrow;
    global.search8 = "Closed "+tomorrow_day+", "+tomorrow_month2+" "+tomorrow;
    if(tomorrow1 != "") {
      global.search7 = "Closed "+tomorrow_day+", "+tomorrow_month+" "+tomorrow1;
      global.search8 = "Closed "+tomorrow_day+", "+tomorrow_month2+" "+tomorrow1;
    }

    global.answer = "No"
    global.message = "Smith is open today."
    global.music = "regular.mp3";
    global.image = "non-snowday-background.jpg";

    get_request( function() {
      if (snowday_today=="yes" && snowday_tomorrow=="yes") {
        global.answer = "Epic!";
        global.message = "Classes are canceled today and tomorrow!"
        global.music = "snowday.mp3";
        global.image = "background.jpg";
      } else if (snowday_today=="yes") {
        global.answer = "Yes!";
        global.message = "Classes are canceled today!"
        global.music = "snowday.mp3";
        global.image = "background.jpg";
      } else if (snowday_tomorrow=="yes") {
        global.answer = "Yes!";
        global.message = "Classes are canceled tomorrow!"
        global.music = "snowday.mp3";
        global.image = "background.jpg";
      }
    });

    return JSON.stringify({ "answer" : global.answer, "message": global.message,
    "music" : global.music, "image" : global.image});
  }
}
