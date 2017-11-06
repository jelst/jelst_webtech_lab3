// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/message');

var Message = require('./message');

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// on routes that end in /messages
// ----------------------------------------------------
router.route('/messages')

    // create a message (accessed at POST http://localhost:8080/api/messages)
    .post(function(req, res) {
        var date = new Date();
        
        var message = new Message();      // create a new instance of the Message model
        message.msg = req.body.msg;  // set the messages msg (comes from the request)
        message.time = message.time = date.toLocaleTimeString();
        message.code = "SE3316";

        // save the message and check for errors
        message.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Message created!' });
        });

    })
    .get(function(req, res) {
        Message.find(function(err, messages) {
            if (err)
                res.send(err);

            res.json(messages);
        });
    });
    
// on routes that end in /messages/:message_id
// ----------------------------------------------------
router.route('/messages/:message_id')

    // get the message with that id (accessed at GET http://localhost:8080/api/messages/:message_id)
    .get(function(req, res) {
        Message.findById(req.params.message_id, function(err, message) {
            if (err)
                res.send(err);
            res.json(message);
        });
    })
    
    .put(function(req, res) {

        // use our message model to find the message we want
        Message.findById(req.params.message_id, function(err, message) {

            if (err)
                res.send(err);

            message.msg = req.body.msg;  // update the messages info

            // save the message
            message.save(function(err) {
                if (err)
                    res.send(err);

                res.json({ message: 'Message updated!' });
            });

        });
    })
    .delete(function(req, res) {
        Message.remove({
            _id: req.params.message_id
        }, function(err, message) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);