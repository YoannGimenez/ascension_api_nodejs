const passport = require('passport');

const checkAuthAndRole = (role = []) => {
    return (req, res, next) => {
        // Check JWT authentication
        passport.authenticate("jwt", { session: false }, (err, user, info) => {
            if (err) {
                return res.status(500).json({ error: 'Server Internal Error', status : 500 });
            }

            // If no user is authenticated or the JWT is invalid, return an error
            if (!user) {
                return res.status(401).json({ error: 'You need to be authenticated to access this resource.', status : 401 });
            }

            // Check if the user has the required role
            if (role.length !== 0 && !role.includes(user.role)) {
                return res.status(403).json({ error: 'Access forbidden. You do not have the required role.', status : 403 });
            }

            //Stock in req.user user information
            req.user = user;

            // If the user has the required role or no role is specified, continue to the next middleware
            next();
        })(req, res, next);
    };
};

module.exports = checkAuthAndRole;
