ezLogger
=============


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



[1]:https://github.com/co3moz/ezFormat