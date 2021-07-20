module.exports = {
    mutipleMongooseToObject: async function(mongooses){
        return await mongooses.map(mongoose => mongoose.toObject());
    },
    mongooseToObject: async function(mongoose){
        return await mongoose ? mongoose.toObject() : mongoose;
    }
};
