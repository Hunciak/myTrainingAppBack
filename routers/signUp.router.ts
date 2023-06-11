import {Router} from "express";
import {UserRecord} from "../records/user.record";


export const signUpRouter = Router()

    .post('/', async (req, res) => {
        console.log('jestem w /signup', req.body, req.params)
        res.json(req.body)
        const user = new UserRecord(req.body);

        await user.insert();
        res.json(user);
    });