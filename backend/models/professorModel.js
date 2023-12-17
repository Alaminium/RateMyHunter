/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import mongoose from 'mongoose';

const professorSchema = mongoose.Schema(
    {
        name : {
            type: String,
            required: true
        },
        department : {
            type: String, 
            required: true
        }
    },
    {
        timestamps: true,
    }
)

const Professor = mongoose.model('Professor', professorSchema);

export default Professor;