var mongoose = require ('./bdd') // on recupere ce qui est exporté par bdd


var userSchema = mongoose.Schema({
    tickets:[{type: mongoose.Schema.Types.ObjectId, ref: 'journey'}],
    firstName: String,
    lastName: String,
    email: String,
    password: String,
  });


var userModel = mongoose.model('user', userSchema);


module.exports = userModel;