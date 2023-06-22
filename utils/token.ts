const jwt = require('jsonwebtoken');
require('dotenv').config();

export const accessToken = async (email: string) => {
    return jwt.sign(
        { "email" : email},
        process.env.ACCESS_TOKEN_SECRET,
        { algorithm: "HS512",
            expiresIn: '1h',}
    );
}

export const refreshToken = async (email: string) => {
    return jwt.sign(
        {"email": email},
        process.env.REFRESH_TOKEN_SECRET,
        {expiresIn: '7d'}
    );

}



//store refresh token in database

