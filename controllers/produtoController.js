class ProdutoController {

  constructor(_app){
    this.app = _app
  }

  listar(request, response){
    
      // const conexao = require('../config/connectionFactory')();
      const conexao = this.app.config.connectionFactory();

      // const ProdutoDao = require('../repository/produtoDao');
      const ProdutoDao  = this.app.repository.produtoDao;
      const produtoDao = new ProdutoDao(conexao);
  
      produtoDao
        .listar()
        .then(
          listaLivros => {
            response.render('produtos/lista', {listaLivros});
          }
        )
        .catch(
          erro => {
            response.send(`Oops algo deu errado: ${erro}`)
          }
        )
  
      conexao.end();
  
  }

}

module.exports = ProdutoController;