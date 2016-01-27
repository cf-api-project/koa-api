'use strict';

const bodyParser = require('koa-bodyparser');
const instructorRouter = require('koa-router')();
const Instructor = require(__dirname + '/../models/instructor');
const errorHandler = require(__dirname + '/../lib/error_handler');

module.exports = exports = instructorRouter
  .get('/instructors', function* () {
    try {
      var data = yield Instructor.find({}).exec();
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = data;
  })
  .post('/instructors', bodyParser(), function* () {
    try {
      var data = yield Instructor.create(this.request.body);
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = data;
  })
  .put('/instructors/:id', bodyParser(), function* () {
    const putBody = this.request.body;
    delete putBody._id;
    try {
      yield Instructor.update({ _id: this.params.id }, putBody).exec();
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = { msg: 'success' };
  })
  .delete('/instructors/:id', function* () {
    try {
      yield Instructor.remove({ _id: this.params.id });
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = { msg: 'success' };
  });
