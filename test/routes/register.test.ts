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

describe('POST /register', () => {
    it('should register a new user', (done) => {
        const user = {
            email: 'newEmail9@yahoo.com', 
            password: 'tomtom',
            first_name: 'Trey',
            last_name: 'WaWa',
            role_id: 2
        }
        chai.request(app)
            .post('/register')
            .send(user)
            .end((err, res) => {
                res.should.have.status(201);
                // res.body.should.be.a('array');
                // res.body.length.should.be.equal(5);
            done();
            })
    });  
   
});
