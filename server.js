const porta = 3000;

const socketio = require('socket.io')
const http = require('http')

const app = require('./custom-express')();

const servidor = http.Server(app)

const io = socketio(servidor)
app.set('io', io)


servidor.listen(porta, function(){
  console.log(`Servidor rodando na porta ${porta}`);
})
