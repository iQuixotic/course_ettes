import db from '../../app/config/connection';
import { QueryMaker } from '../../app/classes';
import colorsController from '../../app/controllers/colors-controller';
const assert = require('chai').assert;
const expect = require('chai').expect;
import chai from 'chai';
import { default as X } from '../../app/utils/sql-commands';
import app  from '../../server';
import { response } from 'express';
import TOKEN from '../../app/config/testToken';
import  mod  from '../../app/utils/mod';
import httpChai from 'chai-http';

chai.should();
chai.use(httpChai);

let deckBody = [];
let deckId;

describe('GET /card-info/:deckId', () => {
    
    it('should fail to get get all of the cards of a particular deck', (done) => {
        deckId = 1; // should fail
        chai.request(app)
            .get(`/card-info/${deckId}`)
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(403);
                // res.body.should.be.a('array');
            done();
            })
    });  


    it('should get all of the cards of a particular deck', (done) => {
        deckId = 14; 
        chai.request(app)
            .get(`/card-info/${deckId}`)
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                deckBody = res.body;
                res.should.have.status(200);
                res.body.should.be.a('array');
            done();
            })
    });  
});

describe('POST /card-info/:deckId', () => {
    it('should add a new card to a deck', (done) => {
        const card = {
            front_content: `new car`,
            back_content: "It's a Nissan Altima"
        }
        chai.request(app)
            .post('/card-info/14')
            .send(card)
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(200);
            done();
            })
    });  
});


describe('PATCH /card-info/:cardId', () => {

    it('should edit a particular owned/managed card', (done) => {
        const data = {
            front_content: 'The best test there can be',
            back_content: 'Is to put GOATS on the other side of the card...'
        }
        chai.request(app)
            .patch('/card-info/15')
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .send(data)
            .end((err, res) => {
                res.should.have.status(200);
            done();
            })
    });  

    it('should not edit due to priviliges', (done) => {
        const data = {
            front_content: 'NO EDITS',
            back_content: 'This should not work due to priviliges'
        }
        chai.request(app)
            .patch('/card-info/6')
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .send(data)
            .end((err, res) => {
                res.should.have.status(401);
            done();
            })
    });  
});

describe('DELETE /card-info/:cardId', () => {
    it('should delete a particular owned/managed card', (done) => {
        const _id = `${deckBody[deckBody.length-2]._id}`;
        chai.request(app)
            .delete(`/card-info/${_id}`)
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(200);
            done();
        })
    });  
});