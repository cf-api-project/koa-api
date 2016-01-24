'use strict';

const bodyParser = require('koa-bodyparser');
const router = require('koa-router');
const instructorModel = require(__dirname + '/../models/instructor');
const instructorRouter = router();
const errorHandler = require(__dirname + '/../lib/error_handler');

module.exports = exports = instructorRouter
  .get('/instructors', function* () {
    yield instructorModel.find({}, (err, data) => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = data;
    });
  })
  .post('/instructors', bodyParser(), function* () {
    const newInstructor = instructorModel.create(this.request.body);
    yield newInstructor.save(err => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    });
  })
  .put('/instructors/:id', bodyParser(), function* () {
    var putBody = this.request.body;
    delete putBody._id;
    yield instructorModel.update({ _id: this.params.id }, putBody, err => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    });
  })
  .delete('/instructors/:id', function* () {
    yield instructorModel.remove({ _id: this.params.id }, err => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    });
  });
