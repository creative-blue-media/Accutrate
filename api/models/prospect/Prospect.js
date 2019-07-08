
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var ProspectSchema = mongoose.Schema({
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    date: Date,
})

var Prospect = mongoose.model('Prospect', ProspectSchema);
module.exports = {
  Prospect
}





