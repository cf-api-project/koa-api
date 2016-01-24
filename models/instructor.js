'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const instructorSchema = new Schema({
  name: { type: String, default: 'Tyler' },
  fucksGiven: { type: Number, default: 0 },
  fatigued: { type: Boolean, default: true },
  caffeine: Number,
  facialHair: Boolean
});

module.exports = exports = mongoose.model('Instructor', instructorSchema);
