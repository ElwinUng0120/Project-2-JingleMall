
var eventTime = "1608872400"; //christmas in timestamp

var currentTime = moment().unix(); //Current time in timestamp format

var diffTime = eventTime - currentTime; 
var duration = moment.duration(diffTime, 'seconds');
var interval = 1;

const countDownChristmas = setInterval(function() {
  duration = moment.duration(duration.asSeconds() - interval, 'seconds');
  $('.countdown1').text("Chirtmas in: " + duration.months() + "Months:" + duration.days() + 'days:' + duration.hours() + 'hours:' + duration.minutes() + 'minutes:' + duration.seconds() + 'seconds');
}, 1000);