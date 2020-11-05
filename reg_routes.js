module.exports = function regNumbersRoutes(regnumbers) {
    const _ = require('lodash');


    async function add(req, res, next) {
        try {
            const reg = _.upperCase(req.body.reg);
            var alreadyExists = await regnumbers.duplicateReg(reg);

            if (reg !== "") {
                if (/C[AYJ] \d{4,6}$/.test(reg) || /C[AYJ] \d+\s|-\d+$/.test(reg)) {
                    if (alreadyExists === 0) {
                        await regnumbers.regNumbersAdded(reg)
                        req.flash('success', 'You have successfully added a registration number')
                    }
                    else {
                        req.flash('error', 'Registration number already exists')
                    }
                }
                else {
                    req.flash('error', 'Invalid registration number')
                }
            } else {
                req.flash('error', 'Please enter a registration number')

            }
            var getReg = await regnumbers.getRegNumber();

            res.render('index', {
                plates: getReg
            });
        } catch (err) {
            next(err)
        }
    }

    async function getReg(req, res, next) {
        try {
            var getReg = await regnumbers.getRegNumber();

            res.render('index', {
                plates: getReg

            });
        } catch (err) {
            next(err)
        }
    }

    async function filterReg(req, res, next) {
        try {
            const drop = req.query.town;

            const displayFilter = await regnumbers.filterRegNumbers(drop);
            req.flash('success', 'You have filtered registration numbers');

            res.render('index', {
                plates: displayFilter
            });
        } catch (err) {
            next(err)
        }
    }



    async function resetReg(req, res, next) {
        try {
            await regnumbers.reset()

            res.render('index', {

            });
        } catch (err) {
            next(err)
        }

    };








    return {
        add,
        getReg,
        filterReg,
        resetReg

    }



}
// || /C[AYJ] \d+\s|-\d+$.test(reg)