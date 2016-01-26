'use strict';

const bodyParser = require('koa-bodyparser');
const studentRouter = require('koa-router')();
const Student = require(__dirname + '/../models/student');
const errorHandler = require(__dirname + '/../lib/error_handler');

module.exports = exports = studentRouter
  .get('/students', function* () {
    try {
      var data = yield Student.find({}).exec();
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = data;
  })
  .post('/students', bodyParser(), function* () {
    try {
      var data = yield Student.create(this.request.body);
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = data;
  })
  .put('/students/:id', bodyParser(), function* () {
    const putBody = this.request.body;
    delete putBody._id;
    try {
      yield Student.update({ _id: this.params.id }, putBody).exec();
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = { msg: 'success' };
  })
  .delete('/students/:id', function* () {
    try {
      yield Student.remove({ _id: this.params.id });
    } catch (e) {
      errorHandler(e).bind(this);
    }
    this.response.status = 200;
    this.response.body = { msg: 'success' };
  });
