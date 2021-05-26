const jwt = require('jsonwebtoken');
const jwtSKey = process.env.JWT_S_KEY;

exports.checkAuth = ( req, res, next ) => {
    const token = req.header('x-auth-token');

    if (!token) {
        res.status(401).send({status: 'failed', message: 'Absent token'});
    }

    try {
        jwt.verify(token, jwtSKey, (fail, decodedPayload) => {
            if (fail) {
                res.status(401).send({status: 'failed', message: 'Invalid token'});
            } else {
                req.userId = decodedPayload.id;
                next();
            }
        });
    } catch(err) {
        // err
    }
}