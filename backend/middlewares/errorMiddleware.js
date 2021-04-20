export const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(400);
    next(error);
}

// Overriding the default errror handler by adding 'err' param at the start of the function
// Now, whenever there is error in our application this middleware will be called
export const errorHandler = (err, req, res, next) => {

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

    res.status(statusCode);
    res.json({
        message: err.message,
        // only in development
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });

}