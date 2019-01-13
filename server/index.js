const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
var mongoose = require("mongoose");

// mongodb connection
mongoose.connect(
  "mongodb://tbsett:FyK8DD9Lr8Bwcrc@ds017248.mlab.com:17248/api_33to1"
);
var db = mongoose.connection;
// mongo error
db.on("error", console.error.bind(console, "connection error:"));

//Middleware
app.use(bodyParser.json());
app.use(cors());

//Posts API
const posts = require("./routes/api/post");
app.use("/api/posts", posts);

//Users API
const users = require("./routes/api/okta/users");
app.use("/api/users", users);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));
