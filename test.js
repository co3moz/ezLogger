var ezLogger = require("./ezlogger");
ezLogger(function() {
  return __dirname + "/log." + Date.simple.more() + ".txt";
}, function(file, line, message) {
  return "{3} {0}:{1} {2}".format(file, line, message, Date.simple());
});
console.log("That's it!");
myLog("test");

function myLog(message) {
  console.log("hey ! {0}", message);
  console.logTrace(2, "hey ! {0}", message);
}