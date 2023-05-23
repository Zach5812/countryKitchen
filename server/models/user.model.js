const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, "Username is required"],
        minLength: [3, "Username must be at least 3 characters long"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    }
}, { timestamps: true });
// set confirmPassword as a virtual field so it doesn't get stored in DB
UserSchema.virtual("confirmPassword");
// validate that password and confirm password match when registering
UserSchema.pre("validate", function(next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate("confirmPassword", "Password must match confirm password");
    }
    next();
});
// hash the password before storing in db
UserSchema.pre("save", async function(next) { 
    this.password = await bcrypt.hash(this.password, 10);
    next();
});
// define a static method for our model to handle login validations
UserSchema.statics.checkLogin = async function({ username, password }) { 
    const user = await this.findOne({ username });
    if (!(user && await bcrypt.compare(password, user.password))) {
        throw new this().invalidate("password", "Invalid Credentials");
    }
    return user;
};

module.exports = mongoose.model("User", UserSchema); 