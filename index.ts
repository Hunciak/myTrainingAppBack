import {signInRouter} from "./routers/signIn.router";
import {signUpRouter} from "./routers/signUp.router";
import {refreshRouter} from "./routers/refresh.router";
import {handleError} from "./utils/errors";
import {verifyJWT} from "./utils/verifyJWT";
import {exercisesRouter} from "./routers/exercises.router";

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');


const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);
app.use('/refresh', refreshRouter);
app.use('/user', exercisesRouter);

app.use(verifyJWT); //poniżej wstawić routes które maja mieć sprawdzane jwt

app.use(handleError);


app.listen(3001, '0.0.0.0', () => {
    console.log('Backend is ready on http://localhost:3001');
})
