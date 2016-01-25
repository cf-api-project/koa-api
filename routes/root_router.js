'use strict';

const rootRouter = require('koa-router')();
const instructorRouter = require(__dirname + '/instructor_routes');
const studentRouter = require(__dirname + '/student_routes');

module.exports = exports = rootRouter
  .use('/api', instructorRouter.routes(), instructorRouter.allowedMethods(),
    studentRouter.routes(), studentRouter.allowedMethods());
