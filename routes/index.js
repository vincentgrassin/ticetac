var express = require('express');
var router = express.Router();
var journeyModel = require('../models/ticket');
var userModel = require('../models/user')




var city = ["Paris", "Marseille", "Nantes", "Lyon", "Rennes", "Melun", "Bordeaux", "Lille"]
var date = ["2018-11-20", "2018-11-21", "2018-11-22", "2018-11-23", "2018-11-24"]



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
});


/*  signup. */
router.post('/sign-up', async function(req, res, next) {

    var userInDatabase = await userModel.findOne({ email: req.body.emailFromFront })
    if (userInDatabase == null) {

        var newUser = new userModel({
            tickets: [],
            firstName: req.body.firstnameFromFront,
            lastName: req.body.lastnameFromFront,
            email: req.body.emailFromFront,
            password: req.body.passwordFromFront,
        })
        var userSaved = await newUser.save();
        req.session.isLogged = true
        req.session.userId = userSaved._id;

        res.redirect('/search');
    } else {
        req.session.isLogged = false;
        res.render('index');
    }
});

/*  sign-in. */

router.post('/sign-in', async function(req, res, next) {

    var userAlreadyExist = await userModel.findOne({ email: req.body.emailFromFront, password: req.body.passwordFromFront })
    if (userAlreadyExist !== null) {
        req.session.userId = userAlreadyExist._id;
        req.session.isLogged = true

        res.redirect('/search');

    } else {
        req.session.isLogged = false;

        res.redirect('/');
    }

});



/*  log-out. */
router.get('/logout', function(req, res, next) {
    req.session.isLogged = false;

    res.redirect('/')
})



// Remplissage de la base de donnée, une fois suffit
router.get('/save', async function(req, res, next) {

    // How many journeys we want
    var count = 300

    // Save  ---------------------------------------------------
    for (var i = 0; i < count; i++) {

        departureCity = city[Math.floor(Math.random() * Math.floor(city.length))]
        arrivalCity = city[Math.floor(Math.random() * Math.floor(city.length))]

        if (departureCity != arrivalCity) {

            var newUser = new journeyModel({
                departure: departureCity,
                arrival: arrivalCity,
                date: date[Math.floor(Math.random() * Math.floor(date.length))],
                departureTime: Math.floor(Math.random() * Math.floor(23)) + ":00",
                price: Math.floor(Math.random() * Math.floor(125)) + 25,
            });

            await newUser.save();

        }

    }
    res.render('index', { title: 'Express' });
});


// Cette route est juste une verification du Save.
// Vous pouvez choisir de la garder ou la supprimer.
router.get('/result', function(req, res, next) {

    // Permet de savoir combien de trajets il y a par ville en base
    for (i = 0; i < city.length; i++) {

        journeyModel.find({ departure: city[i] }, //filtre

            function(err, journey) {

                console.log(`Nombre de trajets au départ de ${journey[0].departure} : `, journey.length);
            }
        )

    }


    res.render('index', { title: 'Express' });
});

module.exports = router;