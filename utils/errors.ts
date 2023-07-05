import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class ExerciseValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ExerciseValidationError';
    }
}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ValidationError) {
        res.status(400).json({ message: err.message });
    } else if (err instanceof ExerciseValidationError) {
        res.status(400).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: 'Sorry, please try again later.' });
    }
};







