module.exports = {
    isAdmin: function(req, res, next) {
        if (req.session.user && req.session.user.admin) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    },

    isManager: function (req, res, next) {
        if (req.session.user && req.session.user.manager) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    },

    isDesigner: function (req, res, next) {
        if (req.session.user && req.session.user.designer) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    },

    isClient: function (req, res, next) {
        if (req.session.user && req.session.user.client) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    }
};