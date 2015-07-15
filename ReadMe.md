## Installation

    npm install ezLogger

## Initialize

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