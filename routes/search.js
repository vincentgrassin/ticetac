var express = require('express');
var router = express.Router();
var journeyModel = require('../models/ticket')




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



  router.get('/mytickets',function(req,res,next){



    res.render('mytickets');
  })


module.exports = router;
