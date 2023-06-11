import {signInRouter} from "./routers/signIn.router";
import {signUpRouter} from "./routers/signUp.router";

const express = require('express');
const cors = require('cors');
import {handleError} from "./utils/errors";

const app = express();
app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
}));

app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);

app.use(handleError)


app.listen(3001, '0.0.0.0', () => {
    console.log('Backend is ready on http://localhost:3001');
})
