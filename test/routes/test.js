const supertest = require('supertest')

const app = require('../../custom-express')();
const request = supertest(app)

describe('Rotas gerais', () => {
  it('volta 404 em rotas inexistentes', (done) => {
    request
      .get('/priasdasdasdadada')
      .expect(404, done)
  })
})