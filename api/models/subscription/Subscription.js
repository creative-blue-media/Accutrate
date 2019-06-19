
const mongoose = require("mongoose");
const Schema = require("mongoose").Schema;
const validator = require("validator");
const _ = require("lodash");


var SubscriptionSchema = mongoose.Schema({
    subscriber: {type: Schema.Types.ObjectId, ref: 'User', required: true},
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
      }
});


var Subscription = mongoose.model('Subscription', SubscriptionSchema);
module.exports = {
    Subscription
};


