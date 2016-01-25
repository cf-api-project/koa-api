'use strict';

const koa = require('koa');
const mongoose = require('mongoose');
const rootRouter = require(__dirname + '/routes/root_router');

const app = koa();
const PORT = process.env.PORT || 3000;
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/koa_api');

app.use(rootRouter.routes());

app.listen(PORT, () => console.log('server up on port: ' + PORT));
