var mongoose = require('mongoose');

try {
    mongoose.Promise = global.Promise;
    mongoose.connect(process.env.MONGODB_URI);
} catch (e) {
    console.log(e);
}

module.exports = {
    mongoose
};
