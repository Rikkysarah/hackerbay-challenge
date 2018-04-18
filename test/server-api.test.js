/* global process, describe, it */
'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');

let { app } = require('../server');
chai.should();

chai.use(chaiHttp);

describe('General API.', () => {
  it('GET / should return status of 200 and a text.', (done) => {
    chai.request(app)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.string;
        done();
      });
  });
});
