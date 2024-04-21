const mongoose = require('mongoose');

const connect_db = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE}`)
        console.log(`connected to DATABASE Successfully \n${mongoose.connection.host}`)
    } catch (error) {
        console.log(`Mongoose error is: ${error}`)
    }
}


module.exports = connect_db;