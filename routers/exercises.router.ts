import {Router} from "express";
import {UserRecord} from "../records/user.record";

export const exercisesRouter = Router()

    .get('/getexercises', async (req, res) => {
        console.log('cookies:', req.cookies)
        const getExercises = await UserRecord.getExercise();
        res.json(getExercises);
    });