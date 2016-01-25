'use strict';

const bodyParser = require('koa-bodyparser');
const router = require('koa-router');
const studentModel = require(__dirname + '/../models/student');
const studentRouter = router();
const errorHandler = require(__dirname + '/../lib/error_handler');

module.exports = exports = studentRouter
  .get('/students', function* () {
    try {
      const data = yield studentModel.find({}).exec();
      this.response.status = 200;
      this.response.body = data;
    } catch (e) {
      errorHandler(e).bind(this);
    }
  })
  .post('/students', bodyParser(), function* () {
    const newStudent = yield studentModel.create(this.request.body);
    try {
      const data = yield newStudent.save();
      this.response.status = 200;
      this.response.body = data;
    } catch (e) {
      errorHandler(e).bind(this);
    }
  })
  .put('/students/:id', bodyParser(), function* () {
    var putBody = this.request.body;
    delete putBody._id;
    try {
      yield studentModel.update({ _id: this.params.id }, putBody).exec();
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    } catch (e) {
      errorHandler(e).bind(this);
    }
  })
  .delete('/students/:id', function* () {
    try {
      yield studentModel.remove({ _id: this.params.id });
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    } catch (e) {
      errorHandler(e).bind(this);
    }
  });
