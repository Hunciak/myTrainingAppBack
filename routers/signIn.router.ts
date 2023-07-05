import {Router} from "express";
import {UserRecord} from "../records/user.record";



export const signInRouter = Router()

    .post('/', async (req, res) => {
        const tokens = await UserRecord.logIn(req.body.name, req.body.password);

        tokens ?
            (res
                .cookie('Bearer_jwt', tokens[0], {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 60 * 60 * 1000
            })
                .cookie('Bearer_jwt_ref', tokens[1], {
                    secure:true,
                    sameSite: "none",
                    maxAge: 24 * 60 * 60 * 1000
                })
                .sendStatus(200))
            : res.sendStatus(401);
        console.log('jestem w signedsin',tokens)
    });