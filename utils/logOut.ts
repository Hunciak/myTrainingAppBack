import {pool} from "./db";
const jwt = require('jsonwebtoken');
require('dotenv').config();
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req: any, res: any) => {
    //delete jwt on fe

    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204); //No content

    const refreshToken = cookies.jwt;

    const [foundUser] = await pool.query("SELECT email FROM users WHERE token = :refreshToken", {
        refreshToken,
    }) as any
    if(!foundUser) {
        res.clearCookie('jwt', {httpOnly: true, maxAge: 24 * 60 * 60 * 1000});
        return res.sendStatus(204);
    }
    //delete refresh token in db

}