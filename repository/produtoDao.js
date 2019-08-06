class ProdutoDAO {

  constructor(conexao){
    this._conexao = conexao
  }
  
  listar(){

    return new Promise((resolve, reject) => {
      
      this._conexao
          .query(
            `SELECT * FROM livros`, 
            function(erro, results, fields){
              if(erro){
                return reject(erro)
              }
              return resolve(results)

            }
          )
      
    });

  }

  cadastrar(livro){
    return new Promise((resolve, reject) => {
      this._conexao
          .query(
            'INSERT INTO livros SET ?', 
            livro,
            function(erro, results, fields){
              if(erro){
                return reject(erro)
              }
              return resolve({results, fields})
            }
          )
    })
  }
}

module.exports = () => ProdutoDAO;
