'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.schema;

const instructorSchema = new Schema({
  name: { type: String, default: 'Tyler' },
  fucksGiven: Number,
  fatigued: { type: Boolean, default: true },
  caffeine: Number,
  facialHair: Boolean
});

module.exports = exports = instructorSchema;
