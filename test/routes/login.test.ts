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

describe('POST /login', () => {
    it('should login and recieve a token', (done) => {
        const user = {
            email: 'newEmail@yahoo.com', 
            password: 'tomtom',
        }
        chai.request(app)
            .post('/login')
            .send(user)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                // res.body.length.should.be.equal(5);
            done();
            })
    });  
   
});
