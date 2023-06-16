const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require("cookie-parser");
// const UserRoutes = require('./routes/userRoutes');

// app.use(cors())
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.urlencoded({ extended: true}));
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/userRoutes')(app);
require('./routes/formulary.routes')(app);
require('dotenv').config()

// UserRoutes(app);

app.listen(8000, () => console.log(`Listening on port: 8000`) );