const express = require('express');
const app = express();
const  bodyParser = require('body-parser');

const cors = require('cors')


const db = require('./dbConfig');

const PORT = process.env.PORT || 8070;
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
app.use(cors({}))
app.use(express.static(__dirname + '/public'));

const userRoute = require('./routes/userRouter');
const noteRoute = require('./routes/noteRouter');
const sharedRoute = require('./routes/sharedRouter');

app.use('/api/v1/esetech', userRoute);
app.use('/api/v1/esetech', noteRoute);
app.use('/api/v1/esetech', sharedRoute);






app.use(function (req, res) {
    res.type('text/plain');
    res.status(404);
    res.send('404 - Not Found');
});
// custom 500 page 
app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500 - Server Error');
});

app.listen(PORT)