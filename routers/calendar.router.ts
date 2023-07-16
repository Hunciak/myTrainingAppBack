import {Router} from "express";
import {getIdFromJWT} from "../utils/verifyJWT";
import {UserRecord} from "../records/user.record";



export const calendarRouter = Router ()

    .get('/getevents', async (req, res,next) => {
        try {
            const userId = getIdFromJWT(req.cookies);
            const events = await UserRecord.getUserExercise(userId);
            return events.length === 0 ? res.sendStatus(204) : res.json(events);
        } catch (e) {
            console.log(e)
            next(e)
        }
    })

    .get('/getschedule', async (req, res, next) => {
        try {
            const userId = getIdFromJWT(req.cookies);
            const getEvents = await UserRecord.getEvents(userId);
            return getEvents === null ? res.sendStatus(204) : res.json(getEvents)
         } catch (e) {
            console.log(e)
            next(e)
        }
    })

    .get('/getagenda', async (req, res, next) => {
        try {
            const userId = getIdFromJWT(req.cookies);
            const getEvents = await UserRecord.getEvents(userId);
            return getEvents === null ? res.sendStatus(204) : res.json(getEvents)
        } catch (e) {
            console.log(e)
            next(e)
        }
    })

    .get('/deleteevent?:value', async (req, res, next) => {
        try {
            console.log("ci tu mam", req.query.value)
            await UserRecord.deleteEvent(req.query.value)
            return res.sendStatus(200)
        } catch (e) {
            next(e)
        }
    })

    .post('/saveevent', async (req, res, next) => {
        try {
            const userId = getIdFromJWT(req.cookies);
            await UserRecord.saveEvent(req.body, userId)
            const getEvents = await UserRecord.getEvents(userId);
            return getEvents === null ? res.sendStatus(204) : res.json(getEvents)
        } catch (e) {
            console.log(e)
            next(e)
        }
    })