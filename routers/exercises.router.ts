import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {getIdFromJWT} from "../utils/verifyJWT";
import {exerciseValidation} from "../utils/exerciseValidation";


export const exercisesRouter = Router()

    .get('/getexercises', async (req, res) => {
        const getExercises = await UserRecord.getExercise();
        res.json(getExercises);
    })

    .get('/getuserexercises', async (req, res) => {
        const userId = getIdFromJWT(req.cookies)
        const getUserExercises = await UserRecord.getUserExercise(userId);
        res.json(getUserExercises);
    })

    .post('/saveexercises', async (req, res, next) => {
        try {
            const userId = getIdFromJWT(req.cookies);
            await exerciseValidation(req.body, userId);
            await UserRecord.addSetName(req.body, userId);
            const saveExercises = UserRecord.saveExercises(req.body, userId)

            res.sendStatus(saveExercises)
        } catch (e) {
            next(e)
        }
    })