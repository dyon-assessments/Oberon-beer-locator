const express = require('express');
const routes = require('./routes/routes');
const bodyParser = require('body-parser')

const app = express();
const port = process.env.PORT || 8080;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('dist'));
app.use(routes);

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
