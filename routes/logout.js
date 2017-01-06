module.exports = function(req, res) {
    req.logout();
    res.json({success: true});
};