const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");

// app.use(cors())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.json(), express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/formulary.routes')(app);
require('dotenv').config()
require('./routes/userRoutes');


app.listen(8000, () => console.log(`Listening on port: 8000`) );