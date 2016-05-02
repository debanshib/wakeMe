'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');
var _ = require('lodash');

var schema = new mongoose.Schema({
    full: {
        type: Date,
        required: true
    },
    hours: {
        type: Number,
        required: true
    },
    minutes: {
        type: Number,
        required: true
    },
    seconds: {
        type: Number,
        required: true
    },
    AMPM: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },
    text: {
        type: String
    },
    song: {
        type: String
    },
    owner: {
    	type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    }
});


mongoose.model('Alarm', schema);
