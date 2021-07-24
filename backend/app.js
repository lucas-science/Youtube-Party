const express = require('express');
const path = require('path')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser');
const app = express();
const cors = require('cors')


// initialisation body parser pour récupérer donné au format json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

// initialisation cookie parser pour récupérer les cookies
app.use(cookieParser());

// configuration CORS
app.use(
    cors({
        origin: 'http://localhost:3000',
        credentials: true
    })
);
app.use('/test', (req, res, next) => {
    {

        let params = new URLSearchParams('http://localhost:4000/?room=453454&video=4445v');
        let foo = params.get('room');
        //let foo02 = params.get('video')
        res.send(foo, foo02)
    }
})

module.exports = app;