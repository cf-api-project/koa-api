'use strict';

const koa = require('koa');
const mongoose = require('mongoose');
const student = require(__dirname + '/routes/student_route');
const instructor = require(__dirname + '/routes/instructor_route.js');

const app = koa();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/');

app.use(student.routes());
app.use(student.allowedMethods());
app.use(instructor.routes());
app.use(instructor.allowedMethods());


app.listen(PORT, () => console.log('server up on port: ' + PORT));
