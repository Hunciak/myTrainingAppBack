import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {getIdFromJWT} from "../utils/verifyJWT";
import {exerciseValidation} from "../utils/exerciseValidation";

export const userRouter = Router()

    .get('/', async (req, res) => {
        const userId = getIdFromJWT(req.cookies);
        const getData = await UserRecord.getData(userId);
        getData === null ? res.sendStatus(204) : res.json(getData);
    })
    .put('/updatedata', async (req, res, next) => {
        try {
            console.log(req.body, 'Body!');
            const userId = getIdFromJWT(req.cookies);
            await UserRecord.updateUserData(req.body[0], userId);
            return res.status(200);
        } catch (e) {
            console.log('Błąd: ', e);
            next(e);
        }
    })