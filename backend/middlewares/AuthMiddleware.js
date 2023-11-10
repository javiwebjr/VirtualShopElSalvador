import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import Handler from './Handler.js';

const auth = Handler(async (req, res, next) => {
    let token;
    token = req.cookies.jwt;
    if(token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password');
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not Authorized, Invalid Token");
        }
    }else{
        res.status(401);
        throw new Error("Not Authorized, There Is No Token");
    }
});

const authorizeAdmin = (req, res, next) => {
    if(req.user && req.user.isAdmin){
        next();
    }else{
        res.status(401).send("Not Authorized By Admin");
    }
};
export {auth, authorizeAdmin};