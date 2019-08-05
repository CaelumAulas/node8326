const porta = 3000;
const app = require('./custom-express')();

app.listen(porta, function(){
  console.log(`Servidor rodando na porta ${porta}`);
})
