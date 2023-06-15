import {Router} from "express";
import {UserRecord} from "../records/user.record";
import {regValidation} from "../utils/regValidation";


export const signUpRouter = Router()

    .post('/', async (req, res) => {
        const regValid = await regValidation(req.body.name, req.body.email)
        if (regValid) {
            console.log("validacja rejestraji:", regValid)
            return res.json(regValid)
        }
        const user = new UserRecord(req.body);
        await user.insert();
        res.sendStatus(200);
    });