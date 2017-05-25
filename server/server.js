require('./config/config.js');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose')
var {Score} = require('./models/score');

var app = express();
const port = process.env.PORT;

app.set('x-powered-by', false);
app.set('json spaces', 2);
app.use(bodyParser.json());

app.post('/api/scores', (req, res) => {
    var score = new Score({
        name: req.body.name,
        score: req.body.score
    });

    score.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/scores', (req, res) => {
    Score.find({}).sort({score: -1}).then((scores) => {
        res.send({scores});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/scores/top', (req, res) => {
    Score.find({}).sort({score: -1}).limit(10).then((scores) => {
        res.send({scores});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/api/scores/:name', (req, res) => {
    var name = req.params.name;

    Score.find({name}).then((scores) => {
        if (!scores) {
            return res.status(404).send();
        }

        res.send({scores});
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(port, () => {
    console.log(`Started on port ${port}`);
});

module.exports = {app};
