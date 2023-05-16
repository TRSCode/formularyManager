const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors())
require('./routes/person.routes')(app);
const port = 8000;

app.listen(port, () => console.log(`Listening on port: ${port}`) );