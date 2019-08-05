const app = require('express')();

module.exports = function(){
    
  app.set('view engine', 'ejs');
  
  require('./routes/index')(app);
  require('./routes/produtos')(app);

  return app;

}
