import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {getIdFromJWT} from "../utils/verifyJWT";
import {pool} from "../utils/db";



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

    })

    .put('/logout', async (req, res, next) => {
        try {
            const userId = getIdFromJWT(req.cookies)
            if (!req.cookies?.Bearer_jwt) return res.status(204);
            if (userId) {
                res.clearCookie('Bearer_jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
                res.clearCookie('Bearer_jwt_ref', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
                await pool.query("UPDATE users SET token =:token WHERE id =:id", {
                    token: "",
                    id: userId,
                })
                return res.sendStatus(204);
            }
        } catch (e) {
            next(e)
        }
    })