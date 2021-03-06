const mongoose = require('../models/starshipModels')
const Starship = mongoose.model('starshipModels')

mongoose.connect('mongodb://localhost/sof')

mongoose.Promise = Promise

module.exports = {
    // (GET Request) List all Users
    index: (req, res) => {
        Starship.find({})
        .then(starships => {
            res.render("starshipViews/starshipIndex", { starships });
          })
    },
    //(GET Request) Render newUserform.hbs
    new: (req, res) => {
        res.render('starshipViews/newStarshipForm')
    },
    // //(POST Request) Create new user in the database
    create: (req, res) => {
            Starship.create({
                name: req.body.name,
                registry: req.body.registry,
                status: req.body.status,
                dateStatus: req.body.dateStatus,
                spacecraftClass: req.body.spacecraftClass,
            }).then(newSpaceship => {
                console.log(`Hey Check Out the New User ${newSpaceship}`)
                // res.redirect('/success')
                res.redirect(`/starship/${newSpaceship.id}`)
            })
        },
    // //(GET Request) Render newUserSuccessPage.hbs
    // When you create this have it forward to the newly created starships single view
    // success: (req, res) => {
    //     res.render('userViews/newUserSuccessPage')
    // },
    // // (GET Request) Render a View to Show one User Profile
    showOne: (req, res)=> {
        Starship.findOne({_id: req.params.id})
        .then(starship => {
            res.render("starshipViews/singleStarshipView", { starship });
          })
    },
    // //(DELETE Request) Delete a User Profile
    delete: (req, res) => {
    Starship.findOneAndRemove({_id: req.params.id})
        .then( (starship) => {
            // res.redirect('/')
            // console.log(result)
            // releaseEvents.json(result)
            res.redirect(`/starship`)
        })
    },
    
    // // (GET Request) Render form to update a single user
    edit: (req, res) => {
        Starship.findOne({_id: req.params.id})
        .then(starship => {
            res.render('starshipViews/updateStarshipForm.hbs', { starship });
          })
    },
    // // (PUT Request) Update resource in the database
    update: (req,res) => {
        Starship.findOneAndUpdate({_id: req.params.id},{
            $set: {
                name: req.body.name,
                registry: req.body.registry,
                status: req.body.status,
                dateStatus: req.body.dateStatus,
                spacecraftClass: req.body.spacecraftClass,
            }
        })
        .then(starship => {
            res.redirect(`/starship/${starship.id}`)
            // res.render("starshipViews/singleStarshipView", { starship });
        })
    },
}