require('dotenv').config();

module.exports = function(app){
  app.get('/produtos', function(request, response){
    
    const mysql = require('mysql');

    const conexao = mysql.createConnection({
      database: 'casadocodigo',
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS
    })

    conexao.query(`SELECT * FROM livros`, function(erro, listaLivros, fields){
      //console.log(erro, listaLivros, fields);
      response.render('produtos/lista', {listaLivros});
      
    })

    conexao.end();

  })
}
