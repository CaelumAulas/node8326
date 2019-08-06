class ProdutoController {

  constructor(_app){
    this.app = _app
  }

  listar(request, response){
    const conexao = this.app.config.connectionFactory();
    const ProdutoDao  = this.app.repository.produtoDao;
    const produtoDao = new ProdutoDao(conexao);

    produtoDao
    .listar()
      .then(
        listaLivros => {

          response.format({
            html: () => {
              response.render('produtos/lista', {listaLivros});
            }
            ,json: () => {
              response.json(listaLivros)
            }
          })

        }
      )
      .catch(
        erro => {
          response.send(`Oops algo deu errado: ${erro}`)
        }
      )

    conexao.end();
  }

  cadastrar(request, response) {
    
    const conexao = this.app.config.connectionFactory();
    const ProdutoDao  = this.app.repository.produtoDao;
    const produtoDao = new ProdutoDao(conexao);

    const livro = request.body;

    produtoDao
     .cadastrar(livro)
     .then(
       () => {
         response.format({
          html: () => {
            response.redirect('/produtos')
          }
          ,json: () => {
            response.json({sucesso: 'cadastrado com sucesso'})
          }
         })
       }
     )
     .catch(
       erro => {
         response.render('produtos/form',{erro, livro})
       }
     )

   conexao.end();
  }
}
module.exports = ProdutoController;