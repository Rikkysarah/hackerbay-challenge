/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

let { app } = require('../server');
chai.should();

chai.use(chaiHttp);

describe('Public Endpoints.', () => {
  it('POST /login should return a JWT if any username & password is passed.', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        username: 'someusername',
        password: 'somepassword'
      })
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(true);
        res.body.should.have.property('token');
        done();
      });
  });
  it('POST /login should not return a JWT if only username is passed.', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        username: 'someusername'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please pass the username and password in the form.');
        done();
      });
  });
  it('POST /login should not return a JWT if only password is passed.', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        password: 'somepassword'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please pass the username and password in the form.');
        done();
      });
  });
  it('POST /login should not return a JWT if username is passed with empty string.', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        username: '',
        password: 'somepassword'
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please pass the username and password in the form.');
        done();
      });
  });
  it('POST /login should not return a JWT if password is passed with empty string.', (done) => {
    chai.request(app)
      .post('/login')
      .send({
        username: 'someusername',
        password: ''
      })
      .end((err, res) => {
        res.should.have.status(400);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success').eql(false);
        res.body.should.have.property('message').eql('Please pass the username and password in the form.');
        done();
      });
  });
});
