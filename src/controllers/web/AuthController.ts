import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AuthService } from '../../services/AuthService';
import { RequestValidationService } from '../../services/RequestValidationService';
import { RoleService } from '../../services/RoleService';

const authService = new AuthService();
const roleService = new RoleService();
const requestValidationService = new RequestValidationService();

// Admin login page
export const getAdminLogin = (req: Request, res: Response) => {
    return res.render('pages/login');
};

// Admin login
export const adminLogin = async (req: Request, res: Response) => {
    try {
        // Validate form values and manage errors
        requestValidationService.validateRequest(req, res);
        
        // Get user register form values from body
        const { identifier, password } = req.body;

        // Get user instance using given identifier
        const user = await authService.getUserByIdentifier(identifier);

        // User with given identifier exist
        if (user) {
            // await Role.findOne({ name: 'manager' })
            //     .then(async (role: IRole | null) => {
            //         if (role) {
            //             roleService.checkRole(user, role, res);
            //         }
            //     })
            //     .catch(async (reason: any) => {
            //         throw reason;
            //     })
            const userLoggedIn: boolean = await authService.userWebLogging(user, password, req);
            if (!userLoggedIn) {
                return res.redirect('/auth/login');
            }
            return res.redirect('/dashboard')
        } else {
            req.session.errorMessage = 'User with this email doesn\'t exists';
            return res.redirect('/auth/login');
        }
    } catch (error) {
        console.log(error);
        req.session.errorMessage = 'Error while login contact the site administrator';
        return res.redirect('/auth/login');
    }
}

export const adminLogout = (req: Request, res: Response, next: NextFunction) => {
    req.session.destroy(err => {
        if (err) {
            return next(err);
        }
        res.redirect('/auth/login');
    });
};

export const refreshAccessToken = async (req: Request, res: Response) => {
    const refreshToken = req.header('Refresh-Token');
    if (!refreshToken) {
        return res.status(401).send('Access Denied. No refresh token provided.');
    }

    try {
        const decoded: any = jwt.verify(refreshToken, process.env.TOKEN_SECRET_KEY as string);
        const accessToken = jwt.sign({ id: decoded.id }, process.env.TOKEN_SECRET_KEY as string, { expiresIn: '2h' });

        return res.status(200).json({
            userId: decoded.id,
            _token: accessToken,
            _refreshToken: refreshToken
        });
    } catch (error) {
        return res.status(400).send('Invalid refresh token.');
    }
}