import {Router} from "express";
import {UserRecord} from "../records/user.record";



export const signInRouter = Router()

    .post('/', async (req, res) => {
        const signedIn = await UserRecord.logIn(req.body.name, req.body.password);
        console.log('jestem w signedsin',signedIn)
        signedIn ?
            (res
                .cookie('jwt', signedIn, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
            })
                .json({signedIn}))
            : res.sendStatus(401);

    });