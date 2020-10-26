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
  //  ssl: useSSL
});

const regnumbers = reg_numbers(pool);


app.get('/', async function (req, res) {

 //   const entered = await regnumbers.enteringRegNumbers()

    res.render('index', {
        // entered,

    });


});

app.post('/', async function(req, res){


    const reg = _.upperCase(req.body.reg);
    const town = req.body.town;
    console.log(reg);

    // if (!reg) {
    //     req.flash('error', 'Please enter a registration number')
    //     res.render('index', {
    //         reg,
    //     });
    //     return;
    // }
    // else {
    //     await regnumbers.registrationWork(reg);
        
        res.render('index', {
            // numberPlates: await regnumbers.registrationWork(reg, town),
            reg
        });
    //     return;
    // }

});

// app.get('/reg_numbers', async function (req, res)  {

// const reg = _.capitalize(req.body.reg);


// if (!reg) {
//     req.flash('error', 'Please enter a registration number')
//     res.render('reg_numbers', {
//         entered: await regnumbers.getRegNumber()


//     });
// };

// });

// app.post('/reg_numbers', function (req, res) {


//     res.redirect('/', {


//     });



//  });


app.get('/reset', async function (){

    await regnumbers.reset()

res.render('index', {

    reg: await regnumbers.getRegNumber()


});


});













const PORT = process.env.PORT || 3197;

app.listen(PORT, function () {

    console.log("App started at port:", PORT)

});