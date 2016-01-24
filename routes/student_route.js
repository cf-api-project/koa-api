'use strict';

const koa = require('koa');
const bodyParser = require('koa-bodyparser');
const router = require('koa-router');
const studentModel = require(__dirname + '/../models/student.js');

const app = koa();
const studentRouter = router();

router
  .get('/students', function* () {
    studentModel.find({}, (err, data) => {
      if (err) {
        this.response.status(500);
        this.response.body = 'DB Error';
      }
      this.response.status(200);
      this.response.body = data;
    });
  })
  .post('/students', bodyParser(), function* () {
    const newStudent = studentModel.create(this.request.body);
    newStudent.save(err => {
      if (err) {
        this.response.status(500);
        this.response.body = 'DB Error';
      }
      this.response.status(200);
      this.response.body = { msg: 'success' };
    });
  })
  .put('/students/:id', bodyParser(), function* () {
    studentModel.update({ _id: this.params.id }, err => {
      if (err) {
        this.response.status(500);
        this.response.body = 'DB Error';
      }
      this.response.status(200);
      this.response.body = { msg: 'success' };
    });
  })
