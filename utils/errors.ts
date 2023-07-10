import {NextFunction, Request, Response} from "express";

export class ValidationError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class UnauthorizedError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnauthorizedError';
    }
}

export class ConflictError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ConflictError';
    }
}

export class UnknownError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'UnknownError';
    }
}
export class ForbiddenError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ForbiddenError';
    }
}

export const handleError = (err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);

    if (err instanceof ValidationError) {
        res.status(400).json({ message: err.message });
    }
    else if (err instanceof UnauthorizedError) {
        res.status(401).json({ message: err.message });
    }
    else if (err instanceof ForbiddenError) {
        res.status(403).json({ message: err.message });
    }
    else if (err instanceof ConflictError) {
    res.status(409).json({ message: err.message });
    }
    else if (err instanceof UnknownError) {
        res.status(500).json({ message: err.message });
    }
    else {
        res.status(500).json({ message: 'Sorry, please try again later.' });
    }
};







