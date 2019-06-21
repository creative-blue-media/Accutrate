const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

// let s = process.env.NODE;
console.log("Using Development Server")


mongoose.connect("mongodb://chronic:Chronic1@ds235850.mlab.com:35850/chronic-society", {useNewUrlParser: true});
//mongoose.connect("mongodb://localhost:27017/chronic_society", {useNewUrlParser: true});
// if (s == 'development') {
 
//   console.log("In: ", s);

// } else if (s == 'production') {

//   let urlEncode = encodeURIComponent("Gi2&OII$K#Ch");
//   mongoose.connect("mongodb://Admin:" + urlEncode + "@ds117681.mlab.com:17681/chronicsociety")
//   console.log("In: ", s);

// }

module.exports = {
  mongoose: mongoose
};


