import asyncHandler from 'express-async-handler';

export const redirect = asyncHandler(async (req, res, next) => {
    // PRODUCTION
    if (process.env.NODE_ENV === 'production') {


        if (req.headers.host === 'recommendmi.herokuapp.com/') {
            res.redirect(301, 'https://recommendmi.herokuapp.com/');
        }

        if (req.headers['x-forwarded-proto'] !== 'https') {

            return res.redirect('https://' + req.headers.host + req.url);

        } else {

            // using https
            return next();
        }
    } else {
        // development 
        return next();
    }


});