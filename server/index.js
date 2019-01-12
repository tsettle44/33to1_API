const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const mongoose = require("mongoose");

const app = express();

//MongoDB connection for sessions
//READ cred file
var fs = require("fs");
var cred = "";
fs.readFile("./server/routes/api/cred.json", "utf8", function(err, data) {
  if (err) console.error(err);
  cred = JSON.parse(data);
});

console.log(cred.cred, cred);

mongoose.connect(
  "mongodb://tbsett:FyK8DD9Lr8Bwcrc@ds017248.mlab.com:17248/api_33to1"
);
const db = mongoose.connection;
// on error
db.on("error", console.error.bind(console, "connection error:"));

//express session
app.use(
  session({
    secret: "session",
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: db
    })
  })
);

//make userId available
app.use(function(req, res, next) {
  res.locals.currentUser = req.session.userId;
  next();
});

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Posts API
const posts = require("./routes/api/post");
app.use("/api/posts", posts);

//Users API
const users = require("./routes/api/okta/users");
app.use("/api/users", users);

//Test API
const test = require("./routes/api/test");
app.use("/api", test);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
