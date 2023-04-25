const express = require('express');
const app = express();
require('dotenv').config();

app.use('/', require('./routes'));


const port = process.env.PORT || 8000;
app.listen(port, (err) => {
  if (err)
    console.log(`Error while starting server.`);
  else
    console.log(`Server started at http://localhost:${port}`);
});