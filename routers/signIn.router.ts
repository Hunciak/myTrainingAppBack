import {Router} from "express";
import {UserRecord} from "../records/user.record";



export const signInRouter = Router()

    .post('/', async (req, res) => {
        const tokens = await UserRecord.logIn(req.body.name, req.body.password);
        console.log('jestem w signedsin',tokens)
        tokens ?
            (res
                .cookie('jwt', tokens[0], {
            httpOnly: true,
                    secure: true,
                    sameSite: "none",
            maxAge: 24 * 60 * 60 * 1000
            })
                .json(tokens[0]))
            : res.sendStatus(401);

    });