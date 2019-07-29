let Prospect = require("./Prospect.js").Prospect;
let { authenticate } = require("../../middleware/authenticate");
let _ = require("lodash");
let path = require("path");


module.exports = function (app, express) {

    let ProspectApi = express.Router();
    // Create new prospect
    ProspectApi.post("/", (req, res) => {
        let body = _.pick(req.body, ['firstname', 'lastname', 'email']);
        body.date = new Date();
        // body._author = req.user;
        let prospect = new Prospect(body);
        console.log("In Prospect API END POINT", body)
        prospect.save().then((prospect) => {
            res.send(200).send({
                success: true, 
                message: "Created Prospect",
                prospect: prospect
            })
            // Prospect.populate(prospect, { path: "_author" }, function (err, prospect) {
            //     res.status(200).send({
            //         success: true,
            //         message: "Created Prospect",
            //         prospect: prospect
            //     })
            // })
        }).catch((e) => {
            res.status(400).send({
                success: false,
                message: "Prospect not created",
                error: e
            })
        })
    });

    ProspectApi.get("/all", function (req, res) {
        // console.log(req.body);

        Prospect.find().sort('-date').exec(function (err, prospects) {
            if (err) console.log(err);
            res.status(200).send({
                "data": prospects
               
            })
        })
    })

    ProspectApi.get("/prospects/:limit", function (req, res) {
        console.log("Get Prospect Called?")
        console.log("Limit: ", req.params.limit);
        // console.log(req.body);

        Prospect.find().sort('-date').limit(parseInt(req.params.limit)).populate("_author").exec(function (err, prospects) {
            if (err) console.log(err);

            res.status(200).send({
                success: true,
                message: "Prospects retrieved",
                latest_prospects: prospects
            })
        })
    })


    ProspectApi.get("/:id", function (req, res) {
        Prospect.findById(req.params.id)
            .populate("_author")
            .exec(function (err, prospect) {
                if (err) {
                    console.log("Error Occured", err)
                    res.status(400).send({
                        success: false,
                        message: "Did NotRetrieved Single Prospect",
                        error: err
                    })
                } else {
                    res.status(200).send({
                        success: true,
                        message: "Retrieved Single Prospect",
                        prospect: prospect
                    })
                }
            })
    })
    
    return ProspectApi;
}