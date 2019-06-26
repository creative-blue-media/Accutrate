const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "{VALUE} is not a valid email"
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  bio: String, 
  image: {type: String, default: '/assets/img/profile-pic-l.jpg'},
  username: {
    type: String, 
    required: true,
    unique: true
  },
  firstname: {
    type: String
  },
  lastname: {
    type: String
  },
  birthday: {
    type: Date
  },
  role: {
    type: String, required: true, default: "user"
  },
  saved_blogs: [{
    type: Schema.Types.ObjectId, ref: 'Blog' 
  }],
  address: {
    street: { type: String },
    unit: {type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }

  },
  preference: {
    edibles: Boolean,
    flower: Boolean,
    concentrates: Boolean,
    vape: Boolean
  },
  frequency: {
    type: String,
    enum: ['Daily', 'Weekly', 'Monthly']
  },
  strain: {
    indica: Boolean,
    sativa: Boolean,
    hybrid: Boolean,
    cbd: Boolean
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email', 'username', 'firstname', 'lastname', 'preference','image' , 'strain', 'frequency', 'address', 'password', 'role', 'bio', 'birthday', 'saved_blogs']);

}

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();
  console.log("The TOKEN is ", token);
  user.tokens = user.tokens.concat([{ access, token }]);

  return user.save().then(() => {
    return token;
  });
}

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {
        token: token
      }
    }
  })
}

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;
  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;

  return User.findOne({ email: email }).then((user) => {
    if (!user) {
      //console.log("User Not Found");
      return Promise.reject("User Not Found");
    }

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          //console.log("Invalid Password");
          reject(err);
        }
      })


    })
  });
};

UserSchema.pre('save', function (next) {
  var user = this;

  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        console.log("Hash is: ", hash);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});
var User = mongoose.model('User', UserSchema);
module.exports = {
  User
}
