var ezLogger = require("./ezlogger");
ezLogger(function() {
  return __dirname + "/log." + Date.simple.more() + ".txt";
});
console.log("That's it!");