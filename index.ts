import express, {json} from 'express';
import {handleError} from "./utils/errors";
import cors from 'cors';
import {signInRouter} from "./routers/signIn.router";

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(json());

app.use('/signin', signInRouter);



app.use(handleError)

app.listen(3001, '0.0.0.0', () => {
    console.log('Backend is ready on http://localhost:3001');
})
