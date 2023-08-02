const jwt = require('jsonwebtoken');
require('dotenv').config();

export const accessToken = async (id: string) => {
    return jwt.sign(
        { "id" : id},
        process.env.ACCESS_TOKEN_SECRET,
        { algorithm: "HS512",
            expiresIn: '1h',}
    );
}

export const refreshToken = async (id: string) => {
    return jwt.sign(
        {"id": id},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );

}



//store refresh token in database

