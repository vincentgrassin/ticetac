const mongoose = require('mongoose');


var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology : true
  }
  
  mongoose.connect('mongodb+srv://dbVincent:dbvincent@cluster0-tyh07.mongodb.net/ticetac?retryWrites=true&w=majority',
      options,         
      function(err) {
       console.log("hello",err);
      }
  );


module.exports = mongoose;