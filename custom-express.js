const express = require('express');
const consign = require('consign');

const expressValidator = require('express-validator');

module.exports = function(){

  const app = express();
    
  app.set('view engine', 'ejs');

  // Plugin do express
  // Middleware
  // Executa para cada request
  app.use(expressValidator())

  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    next()
  })

  consign()
    .include('./routes')
    .then('./config')
    .then('./repository')
    .into(app);

  app.use(express.static('./node_modules/bootstrap/dist/'));
  app.use(express.static('./public/'));

  // (request, response, next) -> tratador de requests padrão
  // (request, response, next) -> tratador de requests com erro padrão

  app.use((erro, request, response, next) => {
    console.error(erro)
    next(erro)
  })

  app.use((erro, request, response, next) => {
    response.status(500)

          
    response.format({
      html: () => {
        response.render('erros/500', {erro})
      }
      ,json: () => {
        response.json({erro: erro})
      }
    })
  })

  app.use((request, response, next) => {
    response
      .status(404)
      .render('erros/404')
  })

  return app;

}
