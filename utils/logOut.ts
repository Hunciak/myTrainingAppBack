import {pool} from "./db";
import {getIdFromJWT} from "./verifyJWT";
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleLogout = async (req: any, res: any) => {
    //delete jwt on fe
    const userId = getIdFromJWT(req.cookies.Bearer_jwt)
    if(!req.cookies?.Bearer_jwt) return res.status(204); //No content

    if(userId) {
        res.clearCookie('Bearer_jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        res.clearCookie('Bearer_jwt_ref', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        await pool.query("UPDATE users SET token = `` WHERE id = :id", {
            id: userId,
        })
        return res.sendStatus(204);
    }
    //delete refresh token in db


}