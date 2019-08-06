module.exports = function(app){

  const ProdutoController = require('../controllers/produtoController');
  const produtoController = new ProdutoController(app);

  app.get('/produtos', (request, response) => produtoController.listar(request, response) )

  app.get('/produtos/cadastro', function (request, response) {
    response.render('produtos/cadastro')
  })

  app.post('/produtos/detalhe', function (request, response) {

     const conexao = app.config.connectionFactory();
     const ProdutoDao  = app.repository.produtoDao;
     const produtoDao = new ProdutoDao(conexao);

     const livro = request.body;

     produtoDao
      .cadastrar(livro)
      .then(
        sucesso => {
          const objeto = JSON.stringify(sucesso)
          response.send(`<h1> cadastrou!</h1> <br> ${objeto}`)
        }
      )
      .catch(
        erro => {
          const objeto = JSON.stringify(erro)
          response.send(`<h1> cadastrou!</h1> <br> ${objeto}`)
        }
      )

    conexao.end();

  })

}
