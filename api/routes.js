


// All routes for the API
module.exports = function (app, express) {

    // variables to Api for backend routes
    const user = require("./models/user/UserController")(app, express);
    const blog = require("./models/blog/BlogController")(app, express);
    const comment = require("./models/comment/CommentController")(app, express);
    const notification = require("./models/notification/NotificationController")(app, express);

    // middleware to use for all requests
    let router = express.Router();
    router.use(function (req, res, next) {
        console.log('%s:%s', req.method, JSON.stringify(req.url));

        next();
    });

    router.get('/', function (req, res) {
        res.status(200).send({
            success: true,
            message: 'Welcome to the API.'
        });
    });

    router.use('/users', user);
    router.use('/blogs', blog);
    router.use('/comments', comment);
    router.use('/notifications', notification);
    return router;
};
