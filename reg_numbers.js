module.exports = function regNumbers(pool) {



    async function enteringRegNumbers(reg) {
        // const capitalize = reg.charAt(0).toUpperCase() + reg.slice(1).toLowerCase()

        let inspect = await pool.query('select registration from reg_numbers where registration = $1;', [reg]);
        return inspect.rows;


    }

    async function getRegNumber() {
        const town = await pool.query('select registration from reg_numbers');
        return town.rows;
    }

    // async function registrationWork(reg, town) {
    //     let dataReg = await enteringRegNumbers(reg)
    //     if (dataReg.length === 0) {
    //         await insertReg(reg);
    //     }
    //     // else {
    //     //     await updateReg(reg);
    //     // }
    //     return regNumbersByTown(reg, town);

    // }

    async function regNumbersAdded(reg) {
        if (!reg == '') {

        const plate = reg.substring(0, 2).trim();
        const towns = await pool.query('select id from town where starts_with = $1', [plate]);
        const id = towns.rows[0].id;
        console.log(id);
        let regValid;
        if (id > 0) {
            regValid = await pool.query('select * from reg_numbers where registration = $1', [reg]);
        }
        if (regValid.rowCount < 1) {
            await pool.query('insert into reg_numbers (registration, town_id) values ($1,$2);', [reg, id])
        }
    
 
    }
    }

    // async function insertReg(reg) {

    //     var results = await pool.query('insert into reg_numbers (registration, town_id) values ($1,$2);', [reg, 1])

    //     return results
    // }

    //  async function updateReg(reg) {


    //      var updating = await pool.query('update reg_numbers set town = town+1 where registration = $1;', [reg])
    //      return updating.rows;
    //  }

    async function reset() {

        var deleted = await pool.query('delete from reg_numbers');
        return deleted;

    }







    return {
        enteringRegNumbers,
        regNumbersAdded,
        getRegNumber,
        // registrationWork,
        // insertReg,
        // updateReg,
        reset
    }

}   