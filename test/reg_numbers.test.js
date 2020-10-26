const assert = require('assert');
const greetings = require('../greetings')
// const CategoryService = require('../services/category-service');
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:pg123@localhost:5432/greeted_test';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from greeted;");
        //      await pool.query("delete from categories;");
    });

    it('should be able to insert names and increment counter in the db', async function () {

        // the Factory Function is called CategoryService
        let greeted = greetings(pool);


        await greeted.insertName('Lulama'),
            await greeted.insertName('Zola'),
            await greeted.insertName('Bayanda'),
            await greeted.insertName('Hloni')

        var name = await greeted.getCounter();



        assert.equal(4, name);


    });



    it('should be able to delete all users names in the db', async function () {

        let greeted = greetings(pool);

        await greeted.reset('Zola'),
            await greeted.reset('Zola'),
            await greeted.reset('Zola'),
            await greeted.reset('Hloni'),
            await greeted.reset('Bayanda')

        var name = await greeted.getCounter()

        assert.equal(0, name)

    });

    it('should be able to update user counter', async function () {

        let greeted = greetings(pool);

        await greeted.insertName('Zola'),
            await greeted.insertName('Zola'),
            await greeted.insertName('Zola'),
            await greeted.insertName('Hloni'),
            await greeted.insertName('Bayanda')

            var name = await greeted.updateName('Zola')

            assert.equal(3, name)

    });


    it('should be able to greet user in English', async function () {

        let greeted = greetings(pool);

        assert.equal('Hello, Zola', await greeted.greetMe('Zola', 'English'))

    });

    it('should be able to greet user in IsiXhosa', async function () {

        let greeted = greetings(pool);

        assert.equal('Molo, Zola', await greeted.greetMe('Zola', 'IsiXhosa'))

    });

    it('should be able to greet user in Afrikaans', async function () {

        let greeted = greetings(pool);

        assert.equal('Hallo, Zola', await greeted.greetMe('Zola', 'Afrikaans'))

    })


    after(function () {
        pool.end();
    })
});