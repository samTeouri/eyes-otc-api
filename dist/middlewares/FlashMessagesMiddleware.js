"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setFlashMessages = void 0;
const setFlashMessages = (req, res, next) => {
    res.locals.successMessage = req.session.successMessage;
    res.locals.errorMessage = req.session.errorMessage;
    delete req.session.successMessage;
    delete req.session.errorMessage;
    next();
};
exports.setFlashMessages = setFlashMessages;
