var mongoose = require ('./bdd') // on recupere ce qui est exporté par bdd


var journeySchema = mongoose.Schema({
    departure: String,
    arrival: String,
    date: Date,
    departureTime: String,
    price: Number,
  });


var journeyModel = mongoose.model('journey', journeySchema);


module.exports = journeyModel;