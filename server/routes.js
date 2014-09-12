var _ =           require('underscore');
var path =      require('path');
app.get('/ping', function(req, res) {
  res.send(200, {text: "All good. You don't need to be authenticated to call this"});
});

// app.get('/secured/ping', function(req, res) {
//   res.send(200, {text: "All good. You only get this message if you're authenticated"});
// }
var routes = [
    {
        path: '/api/ping',
        httpMethod: 'POST',
        middleware: [function (req, res, next) {
              res.send(200, {text: "All good. You don't need to be authenticated to call this"});
        }],
        // accessLevel: accessLevels.public
    },

]


module.exports = function(app) {

    _.each(routes, function(route) {
        route.middleware.unshift();//ensureAuthorized);
        var args = _.flatten([route.path, route.middleware]);

        switch(route.httpMethod.toUpperCase()) {
            case 'GET':
                app.get.apply(app, args);
                break;
            case 'POST':
                app.post.apply(app, args);
                break;
            case 'PUT':
                app.put.apply(app, args);
                break;
            case 'DELETE':
                app.delete.apply(app, args);
                break;
            default:
                throw new Error('Invalid HTTP method specified for route ' + route.path);
                break;
        }
    });
}
function ensureAuthorized(req, res, next) {
    // var role;
    // if(!req.user) role = userRoles.public;
    // else          role = req.user.role;
    // var accessLevel = _.findWhere(routes, { path: req.route.path, httpMethod: req.route.stack[0].method.toUpperCase() }).accessLevel || accessLevels.public;

    // if(!(accessLevel.bitMask & role.bitMask)) return res.send(403);
    return next();
}