import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {regValidation} from "../utils/regValidation";


export const signUpRouter = Router()

    .post('/', async (req, res, next) => {
        try {
            await regValidation(req.body.name, req.body.email)
            const user = new UserRecord(req.body);
            await user.insert();
            res.sendStatus(200);
        } catch (e) {
            next(e)
        }

    });