// server.js
// where your node app starts

// we've started you off with Express (https://expressjs.com/)
// but feel free to use whatever libraries or frameworks you'd like through `package.json`.
var express = require("express");
var app = express();
var db = require("./db");

var mongoose = require('mongoose');

var mongoURL = 'mongodb+srv://kidhv1412:19021987@cluster0-prtjf.mongodb.net/mongo-demo?retryWrites=true&w=majority'

mongoose.connect(mongoURL, {useNewUrlParser: true, useUnifiedTopology: true});

mongoose.connection.on('connected', function(){
  console.log("Mongoose connected !!!");
})


var cookieParser = require('cookie-parser');

var bookRoute = require("./routes/book.route");

var userRoute = require("./routes/user.route");

var authRoute = require("./routes/auth.route");

var transRoute = require("./routes/transaction.route");

var profileRoute = require("./routes/profile.route");

var cartRoute = require("./routes/cart.route");

var shopRoute = require("./routes/shop.route");

var shopClientRoute = require("./routes/shop-client.route");

var apiTransaction = require('./api/routes/transaction.route');

var apiBook = require('./api/routes/book.route');

var authMiddleware = require("./middlewares/auth.middleware");

var sessionMiddleware = require("./middlewares/session.middleware");


// our default array of dreams

app.set("views", "./views");
app.set("view engine", "pug");

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('asfgnalsfgn'));

// make all the files in 'public' available
// https://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(sessionMiddleware);

// https://expressjs.com/en/starter/basic-routing.html
app.get("/", (req, res) => {
  res.render("index.pug")
});

app.use('/api/transaction', apiTransaction);
app.use('/api/book', apiBook);

app.use('/cart', cartRoute);

app.use("/users", authMiddleware.requireAuth, userRoute);

app.use('/auth', authRoute);

app.use("/books", bookRoute);

app.use("/transactions", authMiddleware.requireAuth, transRoute);

app.use('/profile', authMiddleware.requireAuth, profileRoute);

app.use('/shop', authMiddleware.requireAuth, shopRoute);

app.use('/shop', shopClientRoute);

// listen for requests :)
const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
