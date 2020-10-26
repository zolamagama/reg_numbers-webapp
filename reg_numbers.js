module.exports = function regNumbers(pool) {



    async function enteringRegNumbers(reg) {
        // const capitalize = reg.charAt(0).toUpperCase() + reg.slice(1).toLowerCase()

        let inspect = await pool.query('select registration from reg_numbers where registration = $1;', [reg]);
        return inspect.rows;


    }

    async function getRegNumber() {
        const town = await pool.query('select * from reg_numbers');
        return await town.rows;
    }

    async function registrationWork(reg, town) {
        let dataReg = await enteringRegNumbers(reg)
        if (dataReg.length === 0) {
            await insertReg(reg);
        }
        // else {
        //     await updateReg(reg);
        // }
        return regNumbersByTown(reg, town);

    }

    function regNumbersByTown(reg, town) {
        const currentRegNumber = reg.value

        if (currentRegNumber === "CA") {
            return town;
        }
        if (currentRegNumber === "CJ") {
            return town;
        }
        if (currentRegNumber === "CY") {
            return town;
        }    
    }

    async function insertReg(reg) {
        // const capitalize = reg.charAt(0).toUpperCase() + reg.slice(1).toLowerCase()

        var results = await pool.query('insert into reg_numbers (registration, town) values ($1,$2);', [reg, 1])

        return results
    }

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
        regNumbersByTown,
        getRegNumber,
        registrationWork,
        insertReg,
        // updateReg,
        reset
    }

}   