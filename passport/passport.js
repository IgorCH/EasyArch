module.exports = {
    isAdmin: function(req, res, next) {
        if (req.session.user.isAdmin) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    },

    isManager: function (req, res, next) {
        if (req.session.user.isManager) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    },

    isDesigner: function (req, res, next) {
        if (req.session.user.isDesigner) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    },

    isClient: function (req, res, next) {
        if (req.session.user.isClient) {
            next();
        } else {
            res.status(401).json({message: "Not Enough Rights"})
        }
    }
};