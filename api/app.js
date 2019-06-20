// server.js

// modules
const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("./config/mongoose.js").mongoose;
const _ = require("lodash");
const path = require("path");
//const morgan = require("morgan");
// const methodOverride = require('method-override');

// create express app instance
const app = express();
const server = http.createServer(app);


// so that request/response calls can be made smoothly
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.json({type: 'application/json'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended:true}));
// app.use(morgan("dev"));

// code for when our server is in production
if (process.env.NODE_ENV === 'production') {
  console.log("Using client/build")
  app.use(express.static(path.join(__dirname, '../client/build')));
} else {
  app.use(express.static(path.join(__dirname, '../client/public')));
}

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

/**
 *
 *  Set up routes for backend below
 *
 */

// app.use('/api', '/users', user);
// app.use('/api', /blogs', blog);
// app.use('/api', '/comments', comment);
// app.use('/api','/notifications', notification);

app.use('/api/', require('./routes')(app, express))
// app.use('/users', user);
// app.use('/blogs', blog);
// app.use('/comments', comment);
// app.use('/notifications', notification);


const port = process.env.PORT || 8080;
console.log("node_env is: ", process.env.NODE_ENV)
server.listen(port, () => {
  console.log("API - listening on port", port);
})

exports = module.exports = app;
