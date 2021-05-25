const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');

/** settings */
app.set('port', process.env.PORT || 4000);

/** middlewares */
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));

/** routes */
app.use('/api/users', require('./routes/usersRoute.js'));


module.exports = app;