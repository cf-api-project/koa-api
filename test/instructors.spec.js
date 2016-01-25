'use strict';

const chai = require('chai');
const mongoose = require('mongoose');
const Instructor = require(__dirname + '/../models/instructor');
process.env.MONGOLAB_URI = 'mongodb://localhost/koa_api_test';
chai.use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;

// Start server
require(__dirname + '/../server');

describe('Instructor API', () => {
  it('should make a valid GET request at /instructors', (done) => {
    request('localhost:3000')
      .get('/api/instructors')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should make a valid POST request at /instructors', (done) => {
    request('localhost:3000')
      .post('/api/instructors')
      .send({ name: 'Tyler', facialHair: false })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.facialHair).to.eql(false);
        done();
      });
  });

  describe('requests that require a Instructor in the DB', () => {
    beforeEach(done => {
      Instructor.create({ name: 'test instructor' }, (err, data) => {
        if (err) return console.log(err);
        this.testInstructor = data;
        done();
      });
    });

    it('should be able to update a instructor', done => {
      request('localhost:3000')
        .put('/api/instructors/' + this.testInstructor._id)
        .send(this.testInstructor)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a instructor', done => {
      request('localhost:3000')
        .delete('/api/instructors/' + this.testInstructor._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });
  });

  after(done => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});
