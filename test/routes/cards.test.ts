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

describe('GET /card-info/:deckId', () => {
    let deckId = 1; // should fail
    // it('should fail to get get all of the cards of a particular deck', (done) => {
    //     chai.request(app)
    //         .get(`/card-info/${deckId}`)
    //         .set({'Authorization':  `Bearer ${TOKEN}`}) 
    //         .end((err, res) => {
    //             res.should.have.status(500);
    //             res.body.should.be.a('array');
    //         done();
    //         })
    // });  

    // deckId = 9; 
    // it('should get all of the cards of a particular deck', (done) => {
    //     chai.request(app)
    //         .get(`/card-info/${deckId}`)
    //         .set({'Authorization':  `Bearer ${TOKEN}`}) 
    //         .end((err, res) => {
    //             res.should.have.status(200);
    //             res.body.should.be.a('array');
    //         done();
    //         })
    // });  
});

describe('POST /card-info/:deckId', () => {
    it('should add a new card to a deck', (done) => {
        const card = {
            name: `new car`,
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


// describe('PATCH /card-info/:cardId', () => {
//     it('should edit a particular owned/managed card', (done) => {
//         chai.request(app)
//             .get('/decks')
//             .set({'Authorization':  `Bearer ${TOKEN}`}) 
//             .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//             done();
//             })
//     });  
// });

// describe('DELETE /card-info/:cardId', () => {
//     it('should delete a particular owned/managed card', (done) => {
//         const deck = {
//             name: `mightyTesty${mod}`
//         }
//         chai.request(app)
//             .post('/decks')
//             .send(deck)
//             .set({'Authorization':  `Bearer ${TOKEN}`}) 
//             .end((err, res) => {
//                 res.should.have.status(200);
//             done();
//             })
//     });  
// });