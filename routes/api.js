const express = require('express');
const Ninja = require('../models/ninja')

const router = express.Router();

//get a list of ninjas from the db
router.get('/ninjas', (req, res) => {

    Ninja.aggregate([
        {
            "$geoNear": {
                "near": {
                    "type": "Point",
                    "coordinates": [parseFloat(req.params.lng), parseFloat(req.params.lat)]
                },
                "distanceField": "distance",
                "maxDistance": 1000000,
                "spherical": true,
                "limit": 10
            }
        },
        {
            "$sort": { "distance": -1 } // Sort the nearest first
        }
    ],
    function(err, docs) {
        //TODO: this docs are always undefined, sometime to check the problem
        res.send(docs);       
   });
});

// //add a new ninja to the db
router.post('/ninjas', (req, res, next) => {
    Ninja.create(req.body).then((ninja) => {
        res.send(ninja);
    })
        .catch(next);
});

// //update a ninja in the db
router.put('/ninjas/:id', (req, res, next) => {
    Ninja.findOneAndUpdate({ _id: req.params.id }, req.body).then(() => {
        Ninja.findOne({ _id: req.params.id }).then((ninja) => {
            res.send(ninja);
        })
    });
});

// //delete a ninja from  the db
router.delete('/ninjas/:id', (req, res) => {
    Ninja.findOneAndDelete({ _id: req.params.id }).then((ninja) => {
        res.send(ninja);
    });
});

module.exports = router;