const jwt = require('jsonwebtoken');
require('dotenv').config();
import {pool} from "./db";


export const refreshToken = async (req: any, res: any) => {
    const cookies = req.cookies;
    if(!cookies?.Bearer_jwt_ref) return res.status(401);

    const refreshToken = cookies.Bearer_jwt_ref;
    const [foundUser] = await pool.query("SELECT id FROM users WHERE token = :refreshToken", {
        refreshToken,
    }) as any

    if(!foundUser) return res.sendStatus(403);

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err: any, decoded: any) => {
            if(err || foundUser[0].id !== decoded.id) return res.sendStatus(403);
            const accessToken = jwt.sign(
                {"id": decoded.id},
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '1d'}
            );
            res
                .cookie('Bearer_jwt', accessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none",
                    maxAge: 60 * 60 * 1000
                })
        }
    )
}