import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {getIdFromJWT} from "../utils/verifyJWT";


export const exercisesRouter = Router()

    .get('/getexercises', async (req, res) => {
        const getExercises = await UserRecord.getExercise();
        res.json(getExercises);
    })

    .post('/saveexer', async (req, res) => {
        const userId = getIdFromJWT(req.cookies)

        const saveExercises = await UserRecord.saveExercises(req.body, userId)

        saveExercises === 200 ? res.sendStatus(200) : res.sendStatus(403)

    })