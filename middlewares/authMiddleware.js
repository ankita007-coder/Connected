import { UnauthenticatedError } from "../errors/customErrors.js";
import User from "../models/User.js";
import jwt from 'jsonwebtoken'



export const userAuthentication = async (req, res, next) => {
    const authenticated = req.headers['authorization'];
    if (!authenticated) {
        throw new UnauthenticatedError('Invalid');
    }
    const token = authenticated.split(' ')[1];
    if (!token) {
        throw new UnauthenticatedError('Invalid');
    }
    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ email: data.email });
        if (!user) {
            throw new UnauthenticatedError('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        throw new UnauthenticatedError('Authentication failed');
    }
};
