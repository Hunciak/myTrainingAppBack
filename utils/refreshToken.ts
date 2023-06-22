const jwt = require('jsonwebtoken');
require('dotenv').config();
import {pool} from "./db";


export const refreshToken = async (req: any, res: any) => {
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401);
    console.log("cookie:",cookies.jwt);
    const refreshToken = cookies.jwt;

    const [foundUser] = await pool.query("SELECT email FROM users WHERE token = :refreshToken", {
        refreshToken,
    }) as any
    if(!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if(err || foundUser.email !== decoded.email) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"email": decoded.email},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '30s'}
            );
            res.json({accessToken})
        }
    )
}