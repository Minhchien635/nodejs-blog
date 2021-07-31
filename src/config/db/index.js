const mongoose = require('mongoose');

async function connect(){
try {
    //await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
        console.log(process.env.DATABASE_URL)
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    );
    console.log('Connect successfully');
} catch (error) {
    console.log('Connect fail' + error)
}
}

module.exports ={connect};
