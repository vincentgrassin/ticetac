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
    });
    console.log(req.session.userId);


    res.render('result', {journeySearchFront: journeySearch} );
  })



  router.get('/addTicket', async function(req,res,next){
    console.log("idticket",req.query);
    console.log("idsession",req.session.userId);
    var userAdding = await userModel.find({_id: req.session.userId});
    console.log(userAdding);
    // userAdding[0].tickets.push(req.query.idticket)
    // console.log(userAdding[0].tickets);





    res.render('mytickets');
  })


module.exports = router;
