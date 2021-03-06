require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const cookieParser = require('cookie-parser');
const app = express();
const bodyParser = require('body-parser');
//const port = 3000;

const route = require('./routes');
const db = require('./config/db');

//connect to DB

db.connect();

app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(
    express.urlencoded({
        extended: true,
    }),
);
app.use(express.json());

app.use(methodOverride('_method'));

//XMLHttpRequest, fetch, axios,

//Http logger
app.use(morgan('combined'));

//Template engine
app.engine(
    'hbs',
    handlebars({
        extname: '.hbs',
        helpers: {
           sum: (a, b) => a + b,
        }
    }),
);

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources','views'));

//Routes init
route(app);

/*app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});*/
//app.listen(3000)
app.listen(process.env.PORT || 3000)