const {authListings, authPage} = require('../../auth/middleware');
module.exports = app => {
    const listings = require('../controllers/listings.controller.js');

    var router = require('express').Router();
    
    router.get('/criteria', listings.findByCriteria);

    router.get('/mostlyViewed', listings.findMostlyViewed)

    router.get('/info/:id', listings.findByIdInfo)

    router.get('/:id', listings.findById);

    router.put('/updateViews', listings.update);

    app.use('/api/listings', router);
};