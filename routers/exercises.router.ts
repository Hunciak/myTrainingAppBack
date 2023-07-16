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
        getUserExercises === null ? res.sendStatus(204) : res.json(getUserExercises);
    })

    .get('/getuserexercisesdetails?:value', async (req, res) => {
        const userId = getIdFromJWT(req.cookies)
        console.log("cos wysylam?", req.query.value)
        const exerciseName = req.query.value as string
        const getUserExerciseDetails = await UserRecord.getUserExerciseDetails(userId, exerciseName);
        getUserExerciseDetails === null ? res.sendStatus(204) : res.json(getUserExerciseDetails)
    })

    .post('/saveexercises', async (req, res, next) => {
        try {
            const userId = getIdFromJWT(req.cookies);
            await exerciseValidation(req.body, userId);
            await UserRecord.addSetName(req.body, userId);
            await UserRecord.saveExercises(req.body, userId)
            res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    .put('/updateexercise', async (req, res, next) => {
        try {
            const userId = getIdFromJWT(req.cookies);
            await exerciseValidation(req.body, userId);
            await UserRecord.updateExercises(req.body, userId);
        } catch (e) {
            console.log("błędzik: ", e)
            next(e)
        }
    })