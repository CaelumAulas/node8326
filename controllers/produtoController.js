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

  validar(request, response, next) {
    request.assert('titulo', 'Título vazio').notEmpty()
    request.assert('preco', 'Preço inválido').isNumeric()

    const listaErros = request.validationErrors()

    if(listaErros.length > 0) {
      response.render('produtos/form',  {
        erros: listaErros, 
        livro: request.body
      })
    } else {
      next()
    }
  }

  cadastrar(request, response, next) {
    const conexao = this.app.config.connectionFactory();
    const ProdutoDao  = this.app.repository.produtoDao;
    const produtoDao = new ProdutoDao(conexao);

    const livro = request.body;

    const promiseCadastro = produtoDao.cadastrar(livro)

    promiseCadastro
      .then(
        () => {

          const io = this.app.get('io')
          io.emit('livroNovo', 'Livro cadastrado, de uma olhada na tabela')

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
      .catch(erro => next(erro))

   conexao.end();
  }
}
module.exports = ProdutoController;
