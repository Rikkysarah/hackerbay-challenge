/* global process, describe, it */  
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');


let { app } = require('../server');
chai.should();

chai.use(chaiHttp);

describe('Protected Endpoints: ROOT', () => {
  it('GET /api should return an user object if JWT is provided.', (done) => {
    chai.request(app)
      .get('/api')
      
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('user');
        res.body.should.have.property('iat');
        res.body.should.have.property('exp');
        done();
      });
  });
  it('GET /api should return a stattus of 400 if JWT is not provided.', (done) => {
    chai.request(app)
      .get('/api')
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('No token provided.');
        done();
      });
  });
  it('GET /api should return a stattus of 403 if JWT is incorrectly provided.', (done) => {
    chai.request(app)
      .get('/api') 
      .end((err, res) => {
        res.should.have.status(403);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Incorrect Token. Authenticaion Failed.');
        done();
      });
  });
});
