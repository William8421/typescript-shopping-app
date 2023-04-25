"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
            validator: (value) => value.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/),
            message: (props) => `${props.value} is not a valid email`,
        },
    },
    password: { type: String, required: true, minLength: 6 },
    confirmPassword: { type: String },
    id: Number,
});
userSchema.statics.findByEmail = function (email) {
    return this.findOne({ email: email });
};
userSchema.statics.findByUsername = function (username) {
    return this.findOne({ username: username });
};
userSchema.statics.findUserById = function (id) {
    return this.findOne({ id: id });
};
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
