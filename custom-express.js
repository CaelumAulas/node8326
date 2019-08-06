const express = require('express');
const consign = require('consign');
const bodyParser = require('body-parser');

module.exports = function(){

  const app = express();
    
  app.set('view engine', 'ejs');

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())
  
  app.use(express.static('./node_modules/bootstrap/dist/'));
  app.use(express.static('./public/'));

  consign()
    .include('./routes')
    .then('./config')
    .then('./repository')
    .into(app);

  return app;

}
