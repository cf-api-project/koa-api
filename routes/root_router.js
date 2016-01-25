'use strict';

const router = require('koa-router');
const instructorRouter = require(__dirname + '/instructor_routes');
const studentRouter = require(__dirname + '/student_routes');
const rootRouter = router();

module.exports = exports = rootRouter
  .use('/api', instructorRouter.routes(), instructorRouter.allowedMethods(),
    studentRouter.routes(), studentRouter.allowedMethods());
