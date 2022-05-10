const mongoose = require('mongoose');

const PermissionsSchema  = new mongoose.Schema({
  canvieworders : {type : Boolean, required : true},
  caneditmenu : {type : Boolean, required : true},
  caneditperms : {type : Boolean, required : true},
});


const UserSchema  = new mongoose.Schema({
  name: {
      type  : String,
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
<<<<<<< HEAD
    type : String,
=======
    type  : String,
>>>>>>> 2a3608e6ee284dacb27973c84d70d7d87a9ac050
    required : true
  },
  date: {
    type : Date,
    default : Date.now
  },
  permissions: {
<<<<<<< HEAD
    type: PermissionsSchema,
    required: true
=======
    required : true,
    canvieworders : {type : Boolean, required : true},
    caneditmenu : {type : Boolean, required : true},
    caneditperms : {type : Boolean, required : true}
>>>>>>> 2a3608e6ee284dacb27973c84d70d7d87a9ac050
  }
});

const User= mongoose.model('User',UserSchema);

module.exports = User;