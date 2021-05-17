exports.test = ( req, res, next ) => {
    console.log('Middleware started!\n', req.body, 'Middleware finished');
    next();
}