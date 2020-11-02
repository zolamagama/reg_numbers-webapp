module.exports = function regNumbers(pool) {


    async function regNumbersAdded(reg) {
        if (!reg == '') {

            const plate = reg.substring(0, 2).trim();
            const towns = await pool.query('select id from town where starts_with = $1', [plate]);
            const id = towns.rows[0].id;
            let regValid;
            if (id > 0) {
                regValid = await pool.query('select registration from reg_numbers where registration = $1', [reg]);
            }
            if (regValid.rowCount < 1) {
                await pool.query('insert into reg_numbers (registration, town_id) values ($1,$2);', [reg, id])
            }
        }
    }


    async function getRegNumber() {
        const town = await pool.query('select * from reg_numbers');
        return town.rows;
    }


    async function filterRegNumbers(filterTown) {

        if (filterTown === 'all') {
            var town = await pool.query('select * from reg_numbers')
            return town.rows
        }
        else if (!filterTown == '') {

            const plate = filterTown.substring(0, 2).trim();
            const towns = await pool.query('select id from town where starts_with = $1', [plate]);
            const id = towns.rows[0].id;
           
            const regValid = await pool.query('select registration from reg_numbers where town_id = $1', [id]);
            return regValid.rows

        }
    }

    async function reset() {

        var deleted = await pool.query('delete from reg_numbers');
        return deleted;

    }

    return {
        regNumbersAdded,
        getRegNumber,
        filterRegNumbers,
        reset
    }

}   