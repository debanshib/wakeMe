'use strict';
var router = require('express').Router();
module.exports = router;
var _ = require('lodash');
var mongoose = require('mongoose');
var Alarm = mongoose.model('Alarm');


router.get('/:userId', function(req, res, next){
    console.log('in get alarms');
    Alarm.find({owner: req.params.userId})
    .then(function(alarms){
    	console.log('alarms found', alarms)
        res.status(200).send(alarms);
    })
    .catch(next)
})

router.post('/:userId', function(req, res, next){
    console.log('in post alarms with req.body:', req.body);
    Alarm.create(req.body)
    .then(function(newAlarm){
        console.log('created new alarm:', newAlarm);
        res.status(201).send(newAlarm);
    })
    .catch(next)
})

router.put('/:userId/:alarmId', function(req, res, next){
    console.log('req.body in put route', req.body)
    Alarm.findByIdAndUpdate(req.params.alarmId, req.body, {new: true})
    .then(function(alarm){
        console.log('updated alarm in route', alarm)
        res.send(alarm)
    })
    .catch(next)
});

router.delete('/:userId/:alarmId', function(req, res, next){
    Alarm.remove({_id: req.params.alarmId})
    .then(function(){
        res.sendStatus(204);
    })
    .catch(next)
})

//delete all
router.delete('/', function(req, res, next){
    Alarm.remove({})
    .then(function(){
        res.sendStatus(204);
    })
    .catch(next)
})