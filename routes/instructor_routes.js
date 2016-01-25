'use strict';

const bodyParser = require('koa-bodyparser');
const instructorRouter = require('koa-router')();
const instructorModel = require(__dirname + '/../models/instructor');
const errorHandler = require(__dirname + '/../lib/error_handler');

module.exports = exports = instructorRouter
  .get('/instructors', function* () {
    try {
      const data = yield instructorModel.find({}).exec();
      this.response.status = 200;
      this.response.body = data;
    } catch (e) {
      errorHandler(e).bind(this);
    }
  })
  .post('/instructors', bodyParser(), function* () {
    const newInstructor = yield instructorModel.create(this.request.body);
    try {
      const data = yield newInstructor.save();
      this.response.status = 200;
      this.response.body = data;
    } catch (e) {
      errorHandler(e).bind(this);
    }
  })
  .put('/instructors/:id', bodyParser(), function* () {
    const putBody = this.request.body;
    delete putBody._id;
    try {
      yield instructorModel.update({ _id: this.params.id }, putBody).exec();
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    } catch (e) {
      errorHandler(e).bind(this);
    }
  })
  .delete('/instructors/:id', function* () {
    try {
      yield instructorModel.remove({ _id: this.params.id });
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    } catch (e) {
      errorHandler(e).bind(this);
    }
  });
