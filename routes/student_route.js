'use strict';

const bodyParser = require('koa-bodyparser');
const router = require('koa-router');
const studentModel = require(__dirname + '/../models/student');
const studentRouter = router();
const errorHandler = require(__dirname + '/../lib/error_handler');

module.exports = exports = studentRouter
  .get('/students', function* () {
    yield studentModel.find({}, (err, data) => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = data;
    });
  })
  .post('/students', bodyParser(), function* () {
    const newStudent = studentModel.create(this.request.body);
    yield newStudent.save(err => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    });
  })
  .put('/students/:id', bodyParser(), function* () {
    var putBody = this.request.body;
    delete putBody._id;
    yield studentModel.update({ _id: this.params.id }, putBody, err => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    });
  })
  .delete('/students/:id', function* () {
    yield studentModel.remove({ _id: this.params.id }, err => {
      if (err) return errorHandler(err).bind(this);
      this.response.status = 200;
      this.response.body = { msg: 'success' };
    });
  });
