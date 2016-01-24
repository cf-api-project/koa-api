const chai     = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const expect   = chai.expect;
const request  = chai.request;

const server = require(__dirname + '/../server');

describe('UNIT: tests individual CRUD operations on koa app', () => {
  it('should make a valid GET request at /students', (done) => {
    request('localhost:3000')
    .get('/students')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should make a valid GET request at /instructors', (done) => {
    request('localhost:3000')
    .get('/instructors')
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      done();
    });
  });
  it('should make a valid POST request at /students', (done) => {
    request('localhost:3000')
    .post('/students')
    .send({ name: 'Logan' })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.name).to.eql('Logan');
      done();
    });
  });
  it('should make a valid POST request at /instructors', (done) => {
    request('localhost:3000')
    .post('/instructors')
    .send({ name: 'Tyler', facialHair: false })
    .end((err, res) => {
      expect(err).to.eql(null);
      expect(res).to.have.status(200);
      expect(res.body.facialHair).to.eql(false);
      done();
    });
  });
});
