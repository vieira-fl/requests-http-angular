// para o angular se comunicar com o backend se utilizar o CORS
const PROXY_CONFIG = [
    // qual é a configuração necessária para viabilizarmos isso = objeto abaixo
    {
        context: ['/api'], // convenção utilizada '/api' (chamada para o backend) para diferenciar o que é rota e o que é uma chamada para o backend.
        target:'http://localhost:8080/', //que será substituido pelo /api/xxx
        secure: false, // true para https
        logLevel: 'debug', // define o nível de log, debug é o padrão
        pathRewrite: { '^/api': '' } //como não queremos fazer um /api/upload, faz-se o rewrite para retirar o /api gerado pelo proxy, na prop context acima
    }
];

module.exports = PROXY_CONFIG