import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        director: {
            type: String,
            required: true,
        },
        publishYear:{
            type: Number,
            required: true,
        },
        actors:{
            type: [String],
            required: false,
        },
        price:{
            type: Number,
            required: true,
        }

    },
    {
        timestamps: true,
    }
)

export const Movie = mongoose.model('Movie', movieSchema)