export const redirect = ((req, res, next) => {
    req.session.redirectUrl = req.query.redirect;
    next();
});