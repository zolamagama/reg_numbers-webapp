const assert = require('assert');
const registration = require('../reg_numbers')
// const CategoryService = require('../services/category-service');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/reg_numbers_test';

const pool = new Pool({
    connectionString
});

describe('The registration numbers web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from reg_numbers;");
        //      await pool.query("delete from categories;");
    });

    it('should be able to insert a registation number in the db', async function () {

        // the Factory Function is called CategoryService
        let plates = registration(pool);



        await plates.regNumbersAdded('CJ 123-321')



        assert.deepEqual([
            {
                registration: 'CJ 123-321'
            }
        ]
            , await plates.getRegistration());


    });



    it('should be able to delete all registration numbers in the db', async function () {

        let plates = registration(pool);

        await plates.reset('CA 123-321'),
            await plates.reset('CJ 123-321'),
            await plates.reset('CY 123-321')


        var reg = await plates.getRegNumber()

        assert.equal(0, reg)

    });

    it('should be able to show registration numbers for Cape Town', async function () {

        let plates = registration(pool)

        await plates.regNumbersAdded('CA 123-321'),
        await plates.regNumbersAdded('CY 123-321'),
        await plates.regNumbersAdded('CJ 123-321'),
        await plates.regNumbersAdded('CJ 123-321'),
        await plates.regNumbersAdded('CA 3456780')



        assert.deepEqual( [{
            registration: 'CA 123-321'
          },
          {
            registration: 'CA 3456780'
          }
        ]
        , await plates.filterRegNumbers('CA'))
    });



    it('should be able to show registration numbers for Paarl', async function () {

        let plates = registration(pool)

        await plates.regNumbersAdded('CA 123-321'),
        await plates.regNumbersAdded('CY 123-321'),
        await plates.regNumbersAdded('CJ 123-321'),
        await plates.regNumbersAdded('CJ 9876548'),
        await plates.regNumbersAdded('CA 3456780'),
        await plates.regNumbersAdded('CJ 1298606'),




        assert.deepEqual( [{
            registration: 'CJ 123-321'
          },
          {
            registration: 'CJ 9876548'
          },
          {
            registration: 'CJ 1298606'
          }
        ]
        , await plates.filterRegNumbers('CJ'))
    });

    it('should be able to show registration numbers for Bellville', async function () {

        let plates = registration(pool)

        await plates.regNumbersAdded('CA 123-321'),
        await plates.regNumbersAdded('CY 123-321'),
        await plates.regNumbersAdded('CJ 123-321'),
        await plates.regNumbersAdded('CJ 9876548'),
        await plates.regNumbersAdded('CA 3456780'),
        await plates.regNumbersAdded('CJ 1298606'),




        assert.deepEqual([{
            registration: 'CY 123-321'
          }
        ]
        , await plates.filterRegNumbers('CY'))
    });

    after(function () {
        pool.end();
    })
});