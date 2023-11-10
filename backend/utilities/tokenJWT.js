import jwt from 'jsonwebtoken';

const token = (res, userId) => {
    const tokenjwt = jwt.sign({userId}, process.env.JWT_SECRET, {expiresIn: '30d'});
    res.cookie('jwt', tokenjwt, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'strict',
        maxAge: 30 * 24 * 60 * 60 * 1000
    })
    return tokenjwt
}
export default token;