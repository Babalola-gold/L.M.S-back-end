const mongoose = require('mongoose');
const bcrypt = require("bcrypt")
uri = process.env.uri


mongoose.connect(uri)
    .then((response) => {
        console.log("Connected to Database Successfully");
    })
    .catch((err) => {
        console.log(err);
        console.log("Failed to connect to MongoDB", err);
    })

let staffSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    adminId: { type: String, unique: true },
    otp: {
        type: String,
        unique: true
    },
    otpExpiration: {
        type: Date
    }

})

staffSchema.pre("save", function (next) {
    bcrypt.hash(this.password, 10, ((err, hash) => {
        console.log(hash);
        this.password = hash
        next()
    }))
})

staffSchema.methods.compare = function (password, callback) {
    bcrypt.compare(password, this.password, (result, err) => {
        console.log(result)
        if (err) return callback(err);
        console.error(err);
    })
}
const adminModel = mongoose.model('adminModel', staffSchema);


module.exports = adminModel;
