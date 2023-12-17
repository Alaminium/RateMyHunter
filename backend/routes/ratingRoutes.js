/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import express from 'express';
import { addRating, getRatings } from '../controllers/ratingController.js';
import { protect } from '../middleware/authMiddleware.js';

const rating_router = express.Router();

rating_router.post('/', addRating);
rating_router.get('/gets', getRatings)

export default rating_router;