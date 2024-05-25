"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRoutes = void 0;
const express_1 = __importDefault(require("express"));
const ViewsController_1 = require("../../controllers/web/ViewsController");
const AuthMiddlewares_1 = require("../../middlewares/AuthMiddlewares");
exports.viewsRoutes = express_1.default.Router();
// Redirect to dashboard
exports.viewsRoutes.get('', (req, res) => {
    res.redirect('/dashboard');
});
// Show dashboard route
exports.viewsRoutes.get('/dashboard', AuthMiddlewares_1.authVerifyWebToken, ViewsController_1.getDashboard);
// Show dashboard route
exports.viewsRoutes.get('/incidents/', AuthMiddlewares_1.authVerifyWebToken, ViewsController_1.getIncidents);
// Show incidents with map
exports.viewsRoutes.get('/map', AuthMiddlewares_1.authVerifyWebToken, ViewsController_1.getMap);
