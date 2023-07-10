import {signInRouter} from "./routers/signIn.router";
import {signUpRouter} from "./routers/signUp.router";
import {refreshRouter} from "./routers/refresh.router";
import {handleError} from "./utils/errors";
import {verifyJWT} from "./utils/verifyJWT";
import {exercisesRouter} from "./routers/exercises.router";
import {refreshToken} from "./utils/refreshToken";

const express = require('express');
const cors = require('cors');
const app = express();
const cookieParser = require('cookie-parser');


// app.use((req:any, res:any, next:any) => {
//     console.log(req); next()})
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/refresh', refreshRouter);

app.use(refreshToken);
app.use(verifyJWT);

app.use('/user', exercisesRouter);//poniżej wstawić routes które maja mieć sprawdzane jwt


app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Backend is ready on http://localhost:3001');
})
