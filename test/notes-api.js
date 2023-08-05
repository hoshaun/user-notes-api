require('dotenv').config();
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.should();
chai.use(chaiHttp);

describe('User APIs', () => {
  const url = `http://localhost:${process.env.PORT}`;
  const username = 'testuser';
  const password = 'password';

  describe('Test GET /api/notes', () => {
    // TODO
  });

  describe('Test GET /api/notes/:id', () => {
    // TODO
  });

  describe('Test POST /api/notes', () => {
    // TODO
  });

  describe('Test PUT /api/notes/:id', () => {
    // TODO
  });

  describe('Test DELETE /api/notes/:id', () => {
    // TODO
  });

  describe('Test POST /api/notes/:id/share', () => {
    // TODO
  });

  describe('Test GET /api/search?q=:query', () => {
    // TODO
  });
});