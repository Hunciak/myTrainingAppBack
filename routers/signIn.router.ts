import {Router} from "express";
import {UserRecord} from "../records/user.record";


export const signInRouter = Router()

    .post('/', async (req, res) => {
        const signedIn = await UserRecord.logIn(req.body.name, req.body.password);
        res.cookie('jwt', signedIn[0], {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })
        signedIn ? res.json({signedIn}) : res.sendStatus(401)

    });