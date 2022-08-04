const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const apiRouter = require('./routes/apiRouter');

app.use(bodyParser.json());
app.use(express.static('public'));


app.use('/api', apiRouter);

app.use('/*', (req, res, next) => {
    next({status: 404, msg: 'Path not found'});
});

app.use((err, req, res, next) => {
    if (err.name === 'CastError' || err.name === 'ValidationError') {err.status = 400, err.msg = err.message};
    res.status(err.status || 500).send( err || 'Internal Server Error');
});



module.exports = app;