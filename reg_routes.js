module.exports = function regNumbersRoutes(regnumbers) {
    const _ = require('lodash');


    async function addReg(req, res) {

        const reg = _.upperCase(req.body.reg);

        if (!reg) {
            req.flash('error', 'Please enter a registraion number')
            var getReg = await regnumbers.getRegNumber();
            res.render('index', {
                plates: getReg

            });
            return;
        }
        // if () {
        //     req.flash('error', 'Reg number already exists')
        //     var getReg = await regnumbers.getRegNumber();
        //     res.render('index', {
        //         plates: getReg

        //     });
        // }

        else {
            var insertReg = await regnumbers.regNumbersAdded(reg);

            var getReg = await regnumbers.getRegNumber();


            res.render('index', {
                reg: insertReg,
                plates: getReg
            });
            return;
        }


    }

    async function getReg(req, res) {

        var getReg = await regnumbers.getRegNumber();

        res.render('index', {
            plates: getReg

        });

    }

    async function filterReg(req, res) {
        const drop = req.body.town;

        if (!drop) {
            req.flash('error', 'First select a town')
            var displayFilter = await regnumbers.filterRegNumbers(drop);
            res.render('reg_numbers', {
                reg: displayFilter
            });
            return;
        }

        else {
            req.flash('success', 'You have filtered registration numbers')
            var displayFilter = await regnumbers.filterRegNumbers(drop);
            res.render('reg_numbers', {
                reg: displayFilter
            });
            return;
        }
    }



    async function resetReg(req, res) {

        await regnumbers.reset()

        res.render('index', {

        });


    };








    return {
        addReg,
        getReg,
        filterReg,
        resetReg

    }



}