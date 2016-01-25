'use strict';

const chai = require('chai');
const mongoose = require('mongoose');
const Student = require(__dirname + '/../models/student');
process.env.MONGOLAB_URI = 'mongodb://localhost/koa_api_test';
chai.use(require('chai-http'));
const expect = chai.expect;
const request = chai.request;

// Start server
require(__dirname + '/../server');

describe('Students API', () => {
  it('should make a valid GET request at /students', done => {
    request('localhost:3000')
      .get('/api/students')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });
  it('should make a valid POST request at /students', done => {
    request('localhost:3000')
      .post('/api/students')
      .send({ name: 'Logan' })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql('Logan');
        done();
      });
  });

  describe('requests that require a Student in the DB', () => {
    beforeEach(done => {
      Student.create({ name: 'test student' }, (err, data) => {
        if (err) return console.log(err);
        this.testStudent = data;
        done();
      });
    });

    it('should be able to update a student', done => {
      request('localhost:3000')
        .put('/api/students/' + this.testStudent._id)
        .send(this.testStudent)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('success');
          done();
        });
    });

    it('should be able to delete a student', done => {
      request('localhost:3000')
        .delete('/api/students/' + this.testStudent._id)
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
