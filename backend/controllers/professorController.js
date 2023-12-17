/*
(Resource from blackboard)
Taken/Modified From: https://www.youtube.com/watch?v=R4AhvYORZRY  and    https://github.com/bradtraversy/mern-auth
*/

import asyncHandler from 'express-async-handler';
import Professor from '../models/professorModel.js';

const addProfessor = asyncHandler(async(req, res) =>{
    const {name, department} = req.body; 

    const professorExists = await Professor.findOne({ name, department });

    if (professorExists) {
        res.status(400);
        throw new Error('User already exists');
    }

    const professor = await Professor.create({
        name,
        department
    });

    if (professor) {
        res.status(201).json({
          _id: professor._id,
          name: professor.name,
          department: professor.department,
        });
    } else {
        res.status(400);
        throw new Error('Invalid user data');
    }
});

const getProfessor = asyncHandler( async(res, req) =>{
    const professor = await Professor.findById(req.professor._id);

    if (professor) {
        res.json({
            _id: professor._id,
            name: professor.name,
            department: professor.department,
        });
      } else {
        res.status(404);
        throw new Error('Professor not found');
    }
});

export {
    addProfessor,
    getProfessor
};