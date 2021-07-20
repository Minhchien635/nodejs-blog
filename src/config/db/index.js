const mongoose = require('mongoose');

async function connect(){
try {
    //await mongoose.connect('mongodb://localhost:27017/f8_education_dev', {
        await mongoose.connect('mongodb+srv://admin:MinhChien06072000@freecluster.08tfx.mongodb.net/f8_education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        }
    );
    console.log('Connect successfully');
} catch (error) {
    console.log('Connect fail')
}
}

module.exports ={connect};
