const express = require('express');

const exphbs = require('express-handlebars');

const app = express();

const bodyParser = require('body-parser');

const flash = require('express-flash');

const session = require('express-session');

const pg = require("pg");

const reg_numbers = require('./reg_numbers');

const Pool = pg.Pool;

const _ = require('lodash');

const routeFunction = require('./reg_routes')


app.engine('handlebars', exphbs({
    layoutsDir: './views/layouts'
}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));


const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers';


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.use(session({
    secret: "Align messages",
    resave: false,
    saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());


const pool = new Pool({
    connectionString,
    // ssl: useSSL
});

const regnumbers = reg_numbers(pool);
const reg_routes = routeFunction(regnumbers)


app.get('/', reg_routes.getReg);

app.post('/', reg_routes.addReg);

app.post('/reg_numbers', reg_routes.filterReg);

app.get('/reset', reg_routes.resetReg);

const PORT = process.env.PORT || 4001;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)

});