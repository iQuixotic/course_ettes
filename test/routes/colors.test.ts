import db from '../../app/config/connection';
import { QueryMaker } from '../../app/classes';
import colorsController from '../../app/controllers/colors-controller';
const assert = require('chai').assert;
const expect = require('chai').expect;
import chai from 'chai';
import app  from '../../server';
import { response } from 'express';
import TOKEN from '../../app/config/testToken';
import httpChai from 'chai-http';

chai.should()
chai.use(httpChai)

describe('GET /colors', () => {
    it('should get all of the colors in the db', (done) => {
        chai.request(app)
            .get('/colors')
            .set({'Authorization':  `Bearer ${TOKEN.PAID_USER}`}) 
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.be.equal(5);
            done();
            })
    });  
   
});
