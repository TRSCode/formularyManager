const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

require('dotenv').config() // this needed to be above the other required statements otherwise came back undefined
require('./config/mongoose.config');
require('./routes/userRoutes')(app);
require('./routes/formulary.routes')(app);

// UserRoutes(app);

app.listen(8000, () => console.log(`Listening on port: 8000`) );