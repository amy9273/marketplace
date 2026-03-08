    const mongoose = require('mongoose');
    const dotenv = require('dotenv');
    dotenv.config({ path: './config.env' });
    const Tour = require('./model/tourModel');
    const app = require('./app');
    const fs = require('fs');

    const DB = process.env.DATABASE.replace(
        '<db_password>',
        process.env.DATABASE_PASSWORD,
    );
    console.log(DB);
    mongoose.connect(DB).then(() => {
        console.log('DB connected succesfully!');
    });
    // READ JSON FILE
    const tours = JSON.parse(
        fs.readFileSync(
            `${__dirname}/starter/dev-data/data/tours.json`,
            'utf-8',
        ),
    );
    // IMPORT DATA INTO DB
    const importData = async () => {
        try {
            await Tour.create(tours);
            console.log('Data successfully loaded!');
        } catch (err) {
            console.log(err);
        }
        process.exit();
    };
    // DELETE ALL DATA FROM DB
    const deleteData = async () => {
        try {
            await Tour.deleteMany();
            console.log('Data successfully deleted!');
        } catch (err) {
            console.log(err);
        }
        process.exit();
    };
    if (process.argv[2] === '--import') {
        importData();
    } else if (process.argv[2] === '--delete') {
        deleteData();
    }
