const mongoose = require('mongoose');

const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    }).then( connection => {
        console.log(`MongoDB connected: ${connection.connection.host}`);        
    }).catch(error => {
        next(error);
    });
};

module.exports = connectDB;