const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.set('x-powered-by', false);
app.set('json spaces', 2);
app.use(bodyParser.json());

app.listen(3000, () => {
    console.log('Server running on port 3000');
})
