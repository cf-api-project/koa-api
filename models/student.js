'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.schema;

const studentSchema = new Schema({
  name: String,
  debt: String,
  fatigued: { type: Boolean, default: true },
  caffeine: Number
});

module.exports = exports = studentSchema;
