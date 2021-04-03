import db from '../../app/config/connection';
import { QueryMaker } from '../../app/classes';
import colorsController from '../../app/controllers/colors-controller';
const assert = require('chai').assert;
const expect = require('chai').expect;
import chai from 'chai';
import app  from '../../server';
import { response } from 'express';
import TOKEN from '../../app/config/testToken';
import  mod  from '../../app/utils/mod';
import httpChai from 'chai-http';

chai.should();
chai.use(httpChai);

describe('GET /decks', () => {
    it('should get all of the decks in the db', (done) => {
        chai.request(app)
            .get('/decks')
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            })
    });  

    it('should get all of the subscribed decks in the db', (done) => {
        chai.request(app)
            .get('/decks/subscribed')
            .set({'Authorization':  `Bearer ${TOKEN}`})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            })
    });  

    it('should get all of the owned decks in the db', (done) => {
        chai.request(app)
            .get('/decks/owned')
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            })
    });  


   
});

describe('POST /decks', () => {
    it('should add a new deck', (done) => {
        const deck = {
            name: `mightyTesty${mod}`
        }
        chai.request(app)
            .post('/decks')
            .send(deck)
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(200);
            done();
            })
    });  
})
