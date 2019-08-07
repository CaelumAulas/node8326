const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

const expressValidator = require('express-validator');

module.exports = function(){

  const app = express();
    
  app.set('view engine', 'ejs');

  // Plugin do express
  // Middleware
  // Executa para cada request
  app.use(expressValidator())
  
  app.use(express.static('./node_modules/bootstrap/dist/'));
  app.use(express.static('./public/'));

  consign()
    .include('./routes')
    .then('./config')
    .then('./repository')
    .into(app);

  app.use((request, response, next) => {
    response.render('erros/404')
  })

  return app;

}
