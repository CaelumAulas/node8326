const express = require('express');

module.exports = function(){

  const app = express();
    
  app.set('view engine', 'ejs');

  app.use(express.static('./node_modules/bootstrap/dist/'));
  app.use(express.static('./public/'));
  
  require('./routes/index')(app);
  require('./routes/produtos')(app);

  return app;

}
