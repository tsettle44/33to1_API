var mongooose = require('mongoose');
var bcrypt = require('bcrypt');

var userSchema = new mongooose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
      },
    lastName: {
        type: String,
        required: true,
        trim: true,
      },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
      },
    password: {
        type: String,
        required: true
      },
    createdAt: {
        type: Date,
        default: Date.now,
        
    }
});

//Authenticate
userSchema.statics.authenticate = function(email, password, callback){
  User.findOne({ email: email })
    .exec(function (error, user){
      if (error) {
        return callback(error);
      } else if (!user) {
        var err = new Error('User not found.');
        err.status = 401;
        return callback(err);
      }
      bcrypt.compare(password, user.password, function(error, result) {
        if (result === true) {
          return callback(null, user);
        } else {
          return callback();
        }
      })
    });
}

//hash password
userSchema.pre('save', function(next) {
    var user = this;
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err)
        }
        user.password = hash;
        next();
    })
});

var User = mongooose.model('Test_user' , userSchema);
module.exports = User;