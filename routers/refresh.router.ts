import {Router} from "express";
import {refreshToken} from "../utils/refreshToken";




export const refreshRouter = Router()

    .get('/',  refreshToken);