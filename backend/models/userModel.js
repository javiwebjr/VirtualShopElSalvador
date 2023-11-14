import mongoose from "mongoose";
import genId from '../utilities/genId.js';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    isConfirmed: {
        type: Boolean,
        default: false
    },
    token: {
        type: String,
        default: genId()
    },
    isAdmin: {
        type: Boolean,
        default: false,
        required: true
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);
export default User;