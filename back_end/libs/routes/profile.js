var libs = '../../libs/';
var log = require(libs + 'log')(module);
var passport = require('passport');

var translations_menu = require(libs + '/translations/menu.js');

module.exports = function (req, res, next) {

    var translations = {};

    passport.authenticate('local', function (err, user, info) {

        if (req.user) {
            var result = {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email,
                lng: req.user.lng,
                is_logged: true
            };

            translations.menu = translations_menu['options_' + req.user.lng];

            res.json({
                success: true,
                profile: result,
                translations: translations
            });
        } else {

            translations.menu = translations_menu['options_' + 'EN'];

            res.json({
                success: false,
                error: 'Not Authorized',
                translations: translations
            });
        }
    })(req, res, next);
};