import mongoose from "mongoose";

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        cart:{
            type: Array,
            required: false
        }
    },
    {
        timestamps: true,
    }
)

export const User = mongoose.model('User', userSchema)