var express = require('express');
var router = express.Router();
var journeyModel = require('../models/ticket');
var userModel = require('../models/user');




router.get('/',function(req,res,next){

    res.render('search');
  })


router.post('/results',async function(req,res,next){

    console.log(req.body);
    var journeySearch = await journeyModel.find({
        departure: req.body.departure,
        arrival: req.body.arrival,
    });
    console.log(journeySearch)


    res.render('result', {journeySearchFront: journeySearch} );
  })



  router.get('/addTickets',function(req,res,next){



    res.render('mytickets');
  })


module.exports = router;
