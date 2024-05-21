import { NextFunction, Request, Response } from "express";

export const setFlashMessages = (req: Request, res: Response, next: NextFunction) => {
    res.locals.successMessage = req.session.successMessage;
    res.locals.errorMessage = req.session.errorMessage;
    delete req.session.successMessage;
    delete req.session.errorMessage;
    next();
}