
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

let { app } = require('../server');
chai.should();

chai.use(chaiHttp);

describe('Protected Endpoints: JSON_PATCH', () => {
  it('POST /api/apply_json_patch should return a json object if obj and patch objects are provided along with JWT.', (done) => {
    chai.request(app)
      .post('/api/apply_json_patch')
      .send({
        'obj': {
          'baz': 'qux',
          'foo': 'bar'
        },
        'patch': [
          { 'op': 'replace', 'path': '/baz', 'value': 'boo' },
          { 'op': 'add', 'path': '/hello', 'value': ['world'] },
          { 'op': 'remove', 'path': '/foo'}
        ]
      })
      
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });
  it('POST /api/apply_json_patch should return a json object if obj and patch objects are provided along with JWT even if patching removes everything from the original object.', (done) => {
    chai.request(app)
      .post('/api/apply_json_patch')
      .send({
        obj: {
          baz: 'qux',
          foo: 'bar'
        },
        patch: [
          { 'op': 'remove', 'path': '/foo' },
          { 'op': 'remove', 'path': '/baz' }
        ]
      })
     
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        done();
      });
  });
  it('POST /api/apply_json_patch should return a status 400 if JWT is not passed.', (done) => {
    chai.request(app)
      .post('/api/apply_json_patch')
      .send({
        patch: [
          { 'op': 'remove', 'path': '/foo' },
          { 'op': 'remove', 'path': '/baz' }
        ]
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('No token provided.');
        done();
      });
  });
  it('POST /api/apply_json_patch should return a status 403 if JWT is incorrectly passed.', (done) => {
    chai.request(app)
      .post('/api/apply_json_patch')
      .send({
        patch: [
          { 'op': 'remove', 'path': '/foo' },
          { 'op': 'remove', 'path': '/baz' }
        ]
      })
      
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Incorrect Token. Authenticaion Failed.');
        done();
      });
  });
  it('POST /api/apply_json_patch should return a status 400 if neither of the JSON objects are passed.', (done) => {
    chai.request(app)
      .post('/api/apply_json_patch')
      .send({})
      
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please pass the JSON object and JSON patch array.');
        done();
      });
  });
  it('POST /api/apply_json_patch should return a status 400 if only the JSON object is passed.', (done) => {
    chai.request(app)
      .post('/api/apply_json_patch')
      .send({
        obj: {
          baz: 'qux',
          foo: 'bar'
        }
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please pass the JSON object and JSON patch array.');
        done();
      });
  });
  it('POST /api/apply_json_patch should return a status 400 if only the JSON patch array is passed.', (done) => {
    chai.request(app)
      .post('/api/apply_json_patch')
      .send({
        patch: [
          { 'op': 'remove', 'path': '/foo' },
          { 'op': 'remove', 'path': '/baz' }
        ]
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please pass the JSON object and JSON patch array.');
        done();
      });
  });
});
