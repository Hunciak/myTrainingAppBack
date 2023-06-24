const jwt = require('jsonwebtoken');
require('dotenv').config();

export const verifyJWT = (req: any, res: any, next: any) => {

    const authHeader = req.cookies.Bearer_jwt;
    if (!authHeader) return res.sendStatus(401);
    jwt.verify(
        authHeader,
        process.env.ACCESS_TOKEN_SECRET,
        {algorithm: "HS512"},
        (err: any, decoded: any) => {
            if (err) throw err
            req.user = decoded.name;
            next();
        }
    )
 }