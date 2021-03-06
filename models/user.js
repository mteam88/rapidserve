const mongoose = require('mongoose');

const PermissionsSchema  = new mongoose.Schema({
  canvieworders : {type : Boolean, required : true},
  caneditmenu : {type : Boolean, required : true},
  caneditperms : {type : Boolean, required : true},
});


const UserSchema  = new mongoose.Schema({
  name: {
      type: String,
      required : true
  } ,
  active: {
    type: Boolean,
    default: false
  },
  email: {
    type  : String,
    required : true
  },
  password: {
    type  : String,
    required : true
  },
  date: {
    type : Date,
    default : Date.now
  },
  permissions: {
    type: PermissionsSchema,
    required: true
  }
});

const User= mongoose.model('User',UserSchema);

module.exports = User;