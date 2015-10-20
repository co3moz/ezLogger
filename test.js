var ezLogger = require("./ezlogger");
ezLogger();
console.log("That's it!");
myLog("test");

function myLog(message) {
  console.log("hey ! {0}", message);
  console.logTrace(2, "hey ! {0}", message);
}