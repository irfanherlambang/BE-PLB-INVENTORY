// middlewares/authRole.js
module.exports = function(allowedRoles) {
    return (req, res, next) => {
        // if no user object, deny access
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // check if user's role_id is in allowedRoles
        if (!allowedRoles.includes(Number(req.user.role_id))) {
            return res.status(403).json({ message: "Forbidden" });
        }

        next();
    };
};
