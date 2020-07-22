const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://sjkscgbr:DStvgFuR2GcZ6WSwgTJ2lsXfJ1fxzznj@ruby.db.elephantsql.com:5432/sjkscgbr');

testingConnection();

async function testingConnection() {
    try {
        await sequelize.authenticate();
        console.log('connection established successfully');
    } catch (error) {
        console.log('unable to connect to db', error);
    }
}