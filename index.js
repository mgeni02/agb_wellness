const express = require('express');
const app = express();
require('dotenv').config()
const cookieParser = require('cookie-parser')
app.use(cookieParser())
const router = require('./routes/agb_routes');
const path = require('path');
const public = path.join(__dirname,'public');
const mustache = require('mustache-express');


// redirect CSS bootstrap
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

app.engine('mustache', mustache());
app.set('view engine', 'mustache');

app.use(express.static(public));
app.use(express.urlencoded({extended: false}));

app.use('/', router); 
app.listen(3000, () => {
        console.log('Server started on port 3000. Ctrl^c to quit.');
        })
        