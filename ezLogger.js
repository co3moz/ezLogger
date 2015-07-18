(function (root, factory) {
  // for asynchronous module definition
  if (typeof define === 'function' && define.amd) {
    define(function () {
      return factory;
    });
  }

  // for commonjs
  else if (typeof exports !== 'undefined') {
    module.exports = factory;
  }
}(this, function ezLogger (fileName, pattern) {
  (pattern || (pattern = "[date] [file]:[line] [message]"));

  Number.prototype.toTwo = function () {
    if (this > 9) return this.toString();
    return "0" + this.toString();
  };

  Array.prototype.doEach = function (method) {
    return this.map(Function.prototype.call, method);
  };

  Date.simple = function () {
    var now = new Date();
    return [now.getDate(), now.getMonth() + 1, now.getFullYear()].doEach(Number.prototype.toTwo).join("/") + " " +
      [now.getHours(), now.getMinutes(), now.getSeconds()].doEach(Number.prototype.toTwo).join(":");
  };

  var stackTrace = require("stack-trace");
  var fs = require("fs");
  require("ezformat");

  var log = console.log;
  console.log = function (mess) {
    var trace = stackTrace.get();
    var file = trace[1]["getEvalOrigin"]().split(/\\|\//).pop();
    var line = trace[1]["getLineNumber"]();

    if (arguments.length > 1) {
      mess = String.prototype.format.apply(mess, Array.prototype.slice.call(arguments, 1));
    }

    var message = pattern
      .replace('[file]', file)
      .replace('[line]', line)
      .replace('[date]', Date.simple())
      .replace('[message]', mess);


    log.call(console, message);
    fs.appendFile(fileName, message + "\n", function () {
    });
  };
}));
