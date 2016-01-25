'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const studentSchema = new Schema({
  name: String,
  debt: Number,
  fatigued: { type: Boolean, default: true },
  caffeine: Number
});

module.exports = exports = mongoose.model('Students', studentSchema);
