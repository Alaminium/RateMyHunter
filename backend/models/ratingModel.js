/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import mongoose from "mongoose";

const ratingSchema = mongoose.Schema(
    {
        professor_name : {
            type: String,
            required: true
        },
        rater_email : {
            type: String,
            required: true
        },
        comment : {
            type: String,
            required: true
        },
        professor_rating : {
            type: Number,
            required: true
        }
    }
)

const Rating = mongoose.model('Rating', ratingSchema);

export default Rating;