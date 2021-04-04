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

// describe('GET /card-info/:deckId', () => {
    
//     it('should fail to get get all of the cards of a particular deck', (done) => {
//         deckId = 1; // should fail
//         chai.request(app)
//             .get(`/card-info/${deckId}`)
//             .set({'Authorization':  `Bearer ${TOKEN}`}) 
//             .end((err, res) => {
//                 res.should.have.status(403);
//                 // res.body.should.be.a('array');
//             done();
//             })
//     });  


//     it('should get all of the cards of a particular deck', (done) => {
//         deckId = 14; 
//         chai.request(app)
//             .get(`/card-info/${deckId}`)
//             .set({'Authorization':  `Bearer ${TOKEN}`}) 
//             .end((err, res) => {
//                 deckBody = res.body;
//                 res.should.have.status(200);
//                 res.body.should.be.a('array');
//             done();
//             })
//     });  
// });

describe('POST /notes/:cardId', () => {
    it('should add a note to a user\'s card', (done) => {
        const note = {
            tier: `reference`,
            content: 'It\'s just an old clunker'
        }
        chai.request(app)
            .post('/notes/14')
            .send(note)
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(403);
            done();
            })
    });  

    it('should add a note to a user\'s card', (done) => {
        const note = {
            tier: `reference`,
            content: 'It\'s just an old clunker'
        }
        chai.request(app)
            .post('/notes/15')
            .send(note)
            .set({'Authorization':  `Bearer ${TOKEN}`}) 
            .end((err, res) => {
                res.should.have.status(200);
            done();
            })
    });  
});


// describe('PATCH /card-info/:cardId', () => {

//     it('should edit a particular owned/managed card', (done) => {
//         const data = {
//             front_content: 'The best test there can be',
//             back_content: 'Is to put GOATS on the other side of the card...'
//         }
//         chai.request(app)
//             .patch('/card-info/15')
//             .set({'Authorization':  `Bearer ${TOKEN}`}) 
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(200);
//             done();
//             })
//     });  

//     it('should not edit due to priviliges', (done) => {
//         const data = {
//             front_content: 'NO EDITS',
//             back_content: 'This should not work due to priviliges'
//         }
//         chai.request(app)
//             .patch('/card-info/6')
//             .set({'Authorization':  `Bearer ${TOKEN}`}) 
//             .send(data)
//             .end((err, res) => {
//                 res.should.have.status(401);
//             done();
//             })
//     });  
// });

// describe('DELETE /card-info/:cardId', () => {
//     it('should delete a particular owned/managed card', (done) => {
//         const _id = `${deckBody[deckBody.length-2]._id}`;
//         chai.request(app)
//             .delete(`/card-info/${_id}`)
//             .set({'Authorization':  `Bearer ${TOKEN}`}) 
//             .end((err, res) => {
//                 res.should.have.status(200);
//             done();
//         })
//     });  
// });