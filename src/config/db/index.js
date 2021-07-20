const mongoose = require('mongoose');

async function connect(){
try {
    //await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
        await mongoose.connect(process.env.DATABASE_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
    });
    console.log('Connect successfully');
} catch (error) {
    console.log('Connect fail')
}
}

module.exports ={connect};