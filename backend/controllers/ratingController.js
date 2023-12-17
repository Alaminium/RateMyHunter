/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import asyncHandler from 'express-async-handler';
import Rating from '../models/ratingModel.js';

const addRating = asyncHandler(async(req, res) =>{
    const {professor_name, rater_email, comment, professor_rating} = req.body; 

    const ratingExists = await Rating.findOne({ professor_name, rater_email});

    if (ratingExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const rating = await Rating.create({
        professor_name,
        rater_email,
        comment,
        professor_rating
    });

    if (rating) {
        res.status(201).json({
            _id: rating._id,
            professor_name: rating.professor_name,
            rater_email: rating.rater_email,
            comment: rating.comment,
            professor_rating: rating.professor
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const getRatings = asyncHandler( async (req, res) =>{
    const { professor_name } = req.query;
    const ratings = await Rating.find({ professor_name: { $regex: `^${professor_name}`, $options: 'i' } });
  
    res.json(ratings);
});

export {
    addRating,
    getRatings
};