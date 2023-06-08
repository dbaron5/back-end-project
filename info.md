const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
const sessionStore = require("./models");

// Configure Passport Local strategy
passport.use(
new LocalStrategy(async (username, password, done) => {
// Replace with your authentication logic
// Find user in the database and verify password
// Call done() with user object if authenticated, otherwise call done() with false
})
);

// Serialize user for session storage
passport.serializeUser((user, done) => {
// Serialize user object to store in the session
});

// Deserialize user from session storage
passport.deserializeUser(async (id, done) => {
// Retrieve user object from the session
});

// Initialize Passport and session middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(
session({
secret: "your-secret-key", // Replace with a secret key for session encryption
resave: false,
saveUninitialized: false,

    store: sessionStore,

})
);

// Models-index.js
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const { sequelize } = require("../models"); // Adjust the path if necessary

const sessionStore = new SequelizeStore({
db: sequelize,
});

module.exports = sessionStore;

// index.js
app.post("/create_user", (req, res) => {
const { email, username, password } = req.body;
connectionCreds.connect((err, client, release) => {
if (err) {
release();
console.error("Error connecting to the database: ", err);
res.status(500).send("Internal server error");
return;
}
const sqlQuery = `INSERT INTO users (email,username,password) VALUES ($1,$2,$3)`;
const values = [email, username, password];
client.query(sqlQuery, values, (err, result) => {
release();
if (err) {
console.error("Error in executing the query: ", err);
res.status(500).send("Internal server error");
return;
}
res.send(result);
});
});
});

app.get("/get_all_users", (req, res) => {
connectionCreds.connect((err, client, release) => {
if (err) {
release();
console.error("Error connecting to the database: ", err);
res.status(500).send("Internal server error");
return;
}
client.query(`SELECT * FROM users;`, (err, result) => {
release();
if (err) {
console.error("Error in executing the query: ", err);
res.status(500).send("Internal server error");
return;
}
res.send(result.rows);
});
});
});