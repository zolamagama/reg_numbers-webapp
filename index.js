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


app.get('/', async function (req, res) {

    const getReg = await regnumbers.getRegNumber();



    res.render('index', {
        getReg

    });


});

app.post('/', async function (req, res) {


    const reg = _.upperCase(req.body.reg);

    var insertReg = await regnumbers.regNumbersAdded(reg);

    const getReg = await regnumbers.getRegNumber();

    res.render('index', {
        reg: insertReg,
        getReg
    });

});

app.get('/reg_numbers/:town_name', async function (req, res) {
    
    const whichTown = req.body.town_name
    const townName = await regnumbers.townReg()
    res.render('reg_numbers', {
        whichTown, townName
    });

});

// app.post('/reg_numbers', function (req, res) {


//     res.redirect('/', {


//     });



//  });


app.get('/reset', async function () {

    await regnumbers.reset()

    res.render('index', {
        registration: await regnumbers.getRegNumber()
    });


});













const PORT = process.env.PORT || 4001;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)

});