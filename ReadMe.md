ezLogger
=============

[![Join the chat at https://gitter.im/co3moz/ezLogger](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/co3moz/ezLogger?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Installation
--------------

    npm install ezLogger

Initialize
--------------

After initialize all project's console.log will change.

```javascript
var ezLogger = require("ezlogger");
ezLogger(__dirname + "/log.txt");
console.log("That's it!");
```

```javascript
// ezLogger(FileName,Pattern);
// default pattern is
// "[date] [file]:[line] [message]"
```

> **Note:** Pattern is updated in 1.3.0 to function
> ```javascript
> ezLogger("./log.txt", function(file, line, message) {
>    return "{3} {0}:{1} {2}".format(file, line, message, Date.simple());
> });
> ```

log.txt file appeared.

```text
15/06/2015 15:39:31 app.js:3 That's it!
```



ezFormat
------------

You can use console.log with [ezFormat][1].

```javascript
// initialize
var ezLogger = require("ezlogger");
ezLogger(__dirname + "/log.txt");
```

```javascript
var isConnected = true;
var myObject = {
    Life: 1,
    Tools: [
        {
            Name: "Jacket",
            Weight: 3,
        }
    ]
};
console.log("Server connection: {0:bool}", isConnected);
console.log("Returned object {0:json:4}", myObject);
```


Dynamic File
-------------

Initialize ezlogger with function

```javascript
var ezLogger = require("ezlogger");
ezLogger(function() {
    // you can use Date.simple.more too. It will come with ezlogger
    return __dirname + "/log." + Date.simple.more() + ".txt";
});
console.log("That's it!");
```

log.15.06.2015.txt file appeared.

```text
15/06/2015 15:39:31 app.js:5 That's it!
```


Trace Level
--------------------

If you want to create own logger function, you probably get wrong location because of trace level is 1 default. So use `logTrace`
```javascript
function myLoggerError(message) {
    console.log("[ERROR] {0}", message);
}

myLoggerError("test"); // prints 15/06/2015 15:39:31 test.js:2 [ERROR] test
// but it shouldn't be test.js:2 it should be test.js:5
```
with logTrace
```javascript
function myLoggerError(message) {
    console.logTrace(2, "[ERROR] {0}", message);
}

myLoggerError("test"); // prints 15/06/2015 15:39:31 test.js:5 [ERROR] test
```

add ezFormat to own function
```javascript
function myLoggerError(message) {
    if (arguments.length > 1) {
          message = String.prototype.format.apply(message, Array.prototype.slice.call(arguments, 1));
    }
    
    console.logTrace(2, "[ERROR] {0}", message);
}

myLoggerError("test! {0}", 1); // prints  15/06/2015 15:39:31 test.js:9 [ERROR] test! 1
```

[1]:https://github.com/co3moz/ezFormat