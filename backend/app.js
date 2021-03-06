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

        var url_string = "https://www.youtube.com/watch?v=6_p3rXnYE3Y&ab_channel=Amixem"; //window.location.href
        var url = new URL(url_string);
        var c = url.searchParams.get("v");
        console.log(c);

    }
})

module.exports = app;