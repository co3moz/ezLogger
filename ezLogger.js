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
  (pattern || (pattern = function (file, line, message) {
    return Date.simple() + " " + file + ":" + line + " " + message;
  }));

  (fileName || (fileName = function () {
    return "./logs/" + Date.simple.more() + ".txt";
  }));

  /**
   * Handle express
   * @returns {ezLogger}
   */
  ezLogger.express = function (request, response, next) {
    console.log("[{method}] {headers.host}{url} from {ip}", request);
    next();
  };

  /**
   * Handles uncaught exceptions
   * @param [callback] override the callback that evaluated after handling. Default: stops process
   * @returns {ezLogger}
   */
  ezLogger.handleUncaughtExceptions = function (callback) {
    (callback || (callback = function() {
        process.exit(1);
    }));

    process.on('uncaughtException', function (err) {
      console.error('[uncaught exception] {stack}', err);
      if(callback && callback.constructor == Function) callback();
    });

    return ezLogger;
  };

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

  Date.simple.more = function () {
    var now = new Date();
    return [now.getDate(), now.getMonth() + 1, now.getFullYear()].doEach(Number.prototype.toTwo).join(".");
  };

  var mkdirp = require("mkdirp");
  var stackTrace = require("stack-trace");
  var fs = require("fs");
  require("ezformat");

  try {
    var checkTheFolder;
    if (fileName.constructor == Function) {
      checkTheFolder = fileName();
    } else {
      checkTheFolder = fileName;
    }

    var eachPart = (checkTheFolder = checkTheFolder.split(/\//), checkTheFolder.pop(), checkTheFolder.join("/"));
    mkdirp.sync(eachPart);
  } catch (e) {
    // ignore the hell
  }

  var log = console.log;
  var error = console.error;
  console.log = function (mess) {
    var trace = stackTrace.get();
    var file = trace[1]["getEvalOrigin"]().split(/\\|\//).pop();
    var line = trace[1]["getLineNumber"]();

    if (arguments.length > 1) {
      mess = String.prototype.format.apply(mess, Array.prototype.slice.call(arguments, 1));
    }

    var message = pattern(file, line, mess);


    log.call(console, message);

    if (fileName.constructor == Function) {
      fs.appendFile(fileName(), message + "\n", function () {
      });
    } else {
      fs.appendFile(fileName, message + "\n", function () {
      });
    }
  };

  console.error = function (mess) {
    var trace = stackTrace.get();
    var file = trace[1]["getEvalOrigin"]().split(/\\|\//).pop();
    var line = trace[1]["getLineNumber"]();

    if (arguments.length > 1) {
      mess = String.prototype.format.apply(mess, Array.prototype.slice.call(arguments, 1));
    }

    var message = pattern(file, line, mess);


    error.call(console, message);

    if (fileName.constructor == Function) {
      fs.appendFile(fileName(), message + "\n", function () {
      });
    } else {
      fs.appendFile(fileName, message + "\n", function () {
      });
    }
  };


  console.logTrace = function (traceLevel, mess) {
    var trace = stackTrace.get();
    var file = trace[traceLevel]["getEvalOrigin"]().split(/\\|\//).pop();
    var line = trace[traceLevel]["getLineNumber"]();

    if (arguments.length > 2) {
      mess = String.prototype.format.apply(mess, Array.prototype.slice.call(arguments, 2));
    }

    var message = pattern(file, line, mess);

    log.call(console, message);

    if (fileName.constructor == Function) {
      fs.appendFile(fileName(), message + "\n", function () {
      });
    } else {
      fs.appendFile(fileName, message + "\n", function () {
      });
    }
  };

  console.errorTrace = function (traceLevel, mess) {
    var trace = stackTrace.get();
    var file = trace[traceLevel]["getEvalOrigin"]().split(/\\|\//).pop();
    var line = trace[traceLevel]["getLineNumber"]();

    if (arguments.length > 2) {
      mess = String.prototype.format.apply(mess, Array.prototype.slice.call(arguments, 2));
    }

    var message = pattern(file, line, mess);

    error.call(console, message);

    if (fileName.constructor == Function) {
      fs.appendFile(fileName(), message + "\n", function () {
      });
    } else {
      fs.appendFile(fileName, message + "\n", function () {
      });
    }
  };

  return ezLogger;
}));
