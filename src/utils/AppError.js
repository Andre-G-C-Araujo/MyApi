class AppError {
  message;
  statusCode;

  //metodo constructor é carregado automaticamente quando a classe é instaciada
  constructor(message, statusCode = 400) {
    //this recebe o paramentros do construtor e passa para a variavel declarada a cima
    //repassa informaçoes para o modo global.
    this.message = message;
    this.statusCode = statusCode;
  }
}

module.exports = AppError;
