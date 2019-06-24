const User = require("./user.js").User;
const { authenticate } = require("../../middleware/authenticate");
const _ = require("lodash");
const path = require('path');
const bcrypt = require("bcryptjs");
// let crypto = require("crypto");

module.exports = function(app, express) {

  const userApi = express.Router();

  // Create new user
  userApi.post("/", (req, res) => {
    console.log("Creating user: I MADE IT IN")
    const body = _.pick(req.body, ['email', 'username', 'password', 'firstname', 'lastname', 'address', 'frequency', 'strain', 'preference']);
    console.log("Creating user", req.body)
    // temporary fix for required fields in User model
    const user = new User({
      email: body.email,
      password: body.password,
      username: body.email,
      firstname: body.firstname, 
      lastname: body.lastname
    });

    user.save()
    .then(user => user.generateAuthToken())
    .then(token => res.status(200).send({token: token, user: user}))
    .catch(err => {
      res.status(400).send({error: err, message: err.message})

    })
  })

  userApi.get("/user", authenticate, function(req, res) {
    if (req.user) {
      User.findById(req.user._id, function(err, user) {
        if (err || !user) {
          return res.status(404).json({
            success: false,
            message: "User could not be found using ID",
            error: err
          });
        }
        res.json(user)
      })
    } else {
      res.status(404).json({
        success: false,
        message: "User is not logged in"
      })
    }

    // console.log(req.body);

    // User.find({ _id: req.user }, function (err, user) {
    //     if (err) console.log(err);
    //     //console.log(user);
    //     User.populate(user, { path: "saved_blogs", populate: { path: "_author" } }, function (err, user) {
    //         let freqEnums = User.schema.path('frequency').enumValues;
    //         res.status(200).send({
    //             success: true,
    //             message: "User retrieved",
    //             user: user,
    //             freqEnums: freqEnums
    //         })
    //     })
    // })
  })

  userApi.put("/user/update", authenticate, function(req, res) {
    const body = req.body;

    User.findById(req.user._id, function(err, user) {
      // error handling
      if (err || !user) {
        return res.status(404).send({
          success: false,
          message: "User not found",
        });
      }

      // data
      user.firstname = body.firstname || user.firstname;
      user.lastname = body.lastname || user.lastname;
      user.email = body.email || user.email;
      user.username = body.username || user.username;
      user.birthday = body.birthday || user.birthday;
      user.bio = body.bio || user.bio;
      user.saved_blogs = body.saved_blogs || user.saved_blogs;

      // address
      user.address.street = body.address.street || user.address.street;
      user.address.unit = body.address.unit || user.address.unit;
      user.address.city = body.address.city || user.address.city;
      user.address.state = body.address.state || user.address.state;
      user.address.zip = body.address.zip || user.address.zip;

      // subscription
      user.frequency = body.frequency || user.frequency;
      user.strain.indica = body.strain.indica || false;
      user.strain.sativa = body.strain.sativa || false;
      user.strain.hybrid = body.strain.hybrid || false;
      user.strain.cbd = body.strain.cbd || false;
      user.preference.flower = body.preference.flower || false;
      user.preference.concentrates = body.preference.concentrates || false;
      user.preference.edibles = body.preference.edibles || false;
      user.preference.vape = body.preference.vape || false;

      // password (need to confirm current password in order to change)
      if (body.newpassword) {
        bcrypt.compare(body.password, user.password, (err, isMatch) => {
          if (err || !isMatch) {
            res.status(400).send({
              success: false,
              message: "Wrong password",
            });
          } else {
            user.password = body.newpassword;
            user.save()
            .then(user => {
              res.status(200).send({
                success: true,
                message: "User updated",
                user: user
              })
            })
            .catch(err => {
              console.log(err)
              res.status(404).send({
                success: false,
                message: "Wrong password",
              });
            })
          }
        })
      } else {
        user.save()
        .then(user => {
          console.log(user)
          res.status(200).send({
            success: true,
            message: "User updated",
            user: user
          })
        })
        .catch(err => res.status(400).send(err))
      }
    })
  })

  // user log in
  userApi.post("/login", (req, res) => {
    //console.log("end point login??", req.body)
    var body = _.pick(req.body, ['email', 'password']);
    //console.log("In login", body);

    User.findByCredentials(body.email, body.password).then((user) => {
      return user.generateAuthToken().then((token) => {

        res.header("x-auth", token).send({
          success: true,
          message: "Login Success",
          token: token,
          user: user
        });
      });
    }).catch((e) => {
      res.status(400).send({
        success: false,
        message: "Login Unsuccessful",
        error: e
      });
    });
  });

  // user sign off
  userApi.delete("/user/remove/token", authenticate, (req, res) => {
    console.log("In remove token");
    req.user.removeToken(req.token).then(() => {
      res.status(200).send({
        success: true,
        message: "Token Removed"
      });
    }).catch((e) => {
      res.status(400).send({
        success: false,
        message: "Token Not removed",
        error: e
      });
    })
  })

  // var storage = multer.diskStorage({
  //     destination: "public/uploads"
  // });
  // var upload = multer({
  //     storage: storage
  // }).any();


  userApi.delete("/user/:user_id/remove/saved-blog/:blog_id", (req, res) => {
    console.log("Req Body: ", req.params);
    console.log("I am in delete post and userid is", req.params.user_id)

    User.findById(req.params.user_id, function(err, user) {

      if (err) {
        console.log("There was an err", err);
      }
      let saved_blogs = user.saved_blogs;
      console.log("The blogs are is", saved_blogs);
      let ind = saved_blogs.indexOf(req.params.blog_id);
      if (ind > -1) {

        saved_blogs.splice(ind, 1);
        console.log("blogs afeer", saved_blogs);
      }
      user.saved_blogs = saved_blogs;

      user.save().then((user) => {
        User.populate(user, {
          path: "saved_blogs"
        }, function(err, user) {
          res.status(200).send({
            success: true,
            message: "User retrieved",
            user: user
          })
        })
      }, (err) => {
        console.log("An error occured", err);
      })
    })


  })



  userApi.post("/user/profile-pic", authenticate, (req, res) => {

    // console.log("The body is ", req.user._id);

    // var mykey = crypto.createCipher('aes-128-cbc', 'password');
    // var mystr = mykey.update('abc', 'utf8', 'hex')
    //console.log("mystr is", mystr)
    // mystr += mykey.update.final('hex');

    var pa = req.user.username; // + mystr.split(".")[0];

    var base64Data = req.body.image.split(",")[1]; //(/^data:image\/png;base64,/, "");

    
    console.log("path", __dirname)

    require("fs").writeFile(path.join(__dirname, "../../../client/public/assets/images/uploads/" + pa + ".png"), base64Data, 'base64', function(err) {
      console.log(err);

      User.findById(req.user._id, function(err, user) {
        user.image = "uploads/" + pa + ".png";

        user.save().then((user) => {
          res.status(200).send({
            success: true,
            message: "Image Update",
            user: user
          })
        })
      })


    });
    // upload(req, res, function(err){
    //     if(err){
    //         console.log("there was an error uploading");
    //     }else{
    //         console.log("FILE UPLOADED SUCCESSFULLY");
    //     }
    // })
  })

  return userApi;

}
