var express = require('express');
var router = express.Router();
var journeyModel = require('../models/ticket');
var userModel = require('../models/user');




router.get('/',function(req,res,next){


    res.render('search');
  })


router.post('/results',async function(req,res,next){
    var journeySearch = await journeyModel.find({
        departure: req.body.departure,
        arrival: req.body.arrival,
        date:req.body.date
    });
    console.log("sessionidfromresult",req.session.userId);
    var userAdding = await userModel.findById(req.session.userId)
    console.log('test',userAdding);

    res.render('result', {journeySearchFront: journeySearch} );
  })



  router.get('/addTicket', async function(req,res,next){
    console.log("idticket",req.query);
    console.log("idsessionfromadd",req.session.userId);
    var userAdding = await userModel.findById(req.session.userId);
    console.log("User before update",userAdding);

   userAdding.tickets.push(req.query.idTicket);
    await userModel.updateOne(
        { _id: req.session.userId},
        { tickets: userAdding.tickets }
    
     );

    console.log("User after update",userAdding);
    var userPop = await userModel.findById(req.session.userId).populate('journey').exec();
    console.log("afterpopulate",userPop);


    res.render('mytickets',{userAdding:userAdding});
  })


module.exports = router;
