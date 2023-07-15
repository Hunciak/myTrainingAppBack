import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {getIdFromJWT} from "../utils/verifyJWT";

export const userRouter = Router()

    .get('/', async (req, res) => {
        const userId = getIdFromJWT(req.cookies);
        const getData = await UserRecord.getData(userId);
        getData === null ? res.sendStatus(204) : res.json(getData);
    })
