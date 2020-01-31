var express = require('express');
var router = express.Router();
var journeyModel = require('../models/ticket');
var userModel = require('../models/user');


router.get('/', function(req, res, next) {
  if(req.session.isLogged == true) {
    res.render('search')

  }
  else {
    res.redirect('/');
  }
})


// AFFICHAGE PAGE RESULTS
router.post('/results', async function(req, res, next) {
  if(req.session.isLogged == true) {

    var journeySearch = await journeyModel.find({
        departure: req.body.departure,
        arrival: req.body.arrival,
        date: req.body.date
    });
    var emptySearch = false;
    if (journeySearch.length == 0) {
        emptySearch = true;
    }

    res.render('result', { journeySearchFront: journeySearch, emptySearch: emptySearch });
  }
  else {
    res.redirect('/');

  }

  })


// AFFICHAGE PAGE MON PANIER TICKETS
router.get('/basket', async function(req, res, next) {
    if(req.session.isLogged == true) {

    var total = 0
    for (i = 0; i < req.session.ticketBasket.length; i++) {
        total = total + req.session.ticketBasket[i].price
    }
    res.render('mytickets', { ticketBasket: req.session.ticketBasket, total: total });
  }
  else {
    res.redirect('/');

  }

})



// AJOUT AU PANIER - RENVOI vers mon panier
router.get('/addTicket', async function(req, res, next) {
    console.log(req.query.idTicket);
    var ticketAdd = await journeyModel.findById(req.query.idTicket)
    console.log(ticketAdd);
    if (req.session.ticketBasket == undefined) {
        req.session.ticketBasket = []
        req.session.ticketsBasketId = []

    }

    req.session.ticketsBasketId.push(ticketAdd._id)
    req.session.ticketBasket.push(ticketAdd)
    console.log(req.session.ticketBasket);

    res.redirect('/search/basket');

})

// DELETE DU PANIER - RENVOI vers mon panier
router.get('/delete', async function(req, res, next) {
    req.session.ticketBasket.splice(req.query.row, 1);
    req.session.ticketsBasketId.splice(req.query.row, 1);

    res.redirect('/search/basket');

})


// CONFIRMATION D'ACHAT
router.get('/confirm', async function(req, res, next) {

    if(req.session.isLogged == true) {

    var userAdding = await userModel.findById(req.session.userId);
    userTicketsInBase = userAdding.tickets.concat(req.session.ticketsBasketId); //étape pas terrible car on colle deux tableaux sans vérifier leur contenu
    var userAdding = await userModel.updateOne({ _id: req.session.userId }, { tickets: userTicketsInBase }

    );

    var userPop = await userModel.findById(req.session.userId).populate('tickets').exec();
    console.log(userPop);
    res.render('confirm', { userPop: userPop, ticketBasket: req.session.ticketBasket });
    }
    else {
      res.redirect('/');

    }
})


router.get('/last-trips', async function(req, res, next) {

    console.log("userID", req.session.userId)
    var userCurrent = await userModel.findById(req.session.userId).populate('tickets').exec();
    var comparedDate = new Date("2018-11-23T00:00:00.000Z");
    console.log(userCurrent);
    console.log(comparedDate)
    console.log("tab 0", userCurrent.tickets[0].date)
    var comingTrips = [];
    var previousTrips = [];

    for(i=0;i<userCurrent.tickets.length;i++) {

      if(userCurrent.tickets[i].date>=comparedDate){
        comingTrips.push(userCurrent.tickets[i])
      }
      else {
        previousTrips.push(userCurrent.tickets[i]);
      }

    }
    console.log("coming", comingTrips);
    console.log("previous", previousTrips);

    res.render('lasttrip', {comingTrips:comingTrips, previousTrips:previousTrips, comparedDate:comparedDate});

})


module.exports = router;