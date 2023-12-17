/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import express from 'express';
import { addProfessor, getProfessor } from '../controllers/professorController.js';
import { protect } from '../middleware/authMiddleware.js';

const professor_router = express.Router();

professor_router.post('/add', addProfessor);

export default professor_router;