const mongoose = require('mongoose');

async function connect(){
try {
    //await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
        DATABASE_URL='mongodb://mongo/f8_education_dev'
        console.log(DATABASE_URL)
        await mongoose.connect(DATABASE_URL, {
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
