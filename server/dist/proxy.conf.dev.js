"use strict";

// para o angular se comunicar com o backend se utilizar o CORS
var PROXY_CONFIG = [// qual é a configuração necessária para viabilizarmos isso = objeto abaixo
{
  context: ['/api'],
  // convenção utilizada '/api' (chamada para o backend) para diferenciar o que é rota e o que é uma chamada para o backend.
  targer: 'http://localhost:8080/',
  //que será substituido pelo /api/xxx
  secure: false,
  // true para https
  logLevel: 'debug',
  // define o nível de log, debug é o padrão
  pathRewrite: {
    '^api': ''
  }
}];
module.exports = PROXY_CONFIG;