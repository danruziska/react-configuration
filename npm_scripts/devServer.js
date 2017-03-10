const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('../webpack.config.dev.js');
const path = require('path');
//Chalk é uma biblioteca para inserir cores no console de forma fácil
const chalk = require ('../tools/chalkConfig.js');
const open = require('open');

const devPort = 3000;
const devHost = 'localhost';
let target_entry = 'http://' + devHost + ':' + devPort + '/';

config.entry.unshift("webpack-dev-server/client?" + target_entry); //Necessário para o hot reload

var compiler = webpack(config);

const server = new WebpackDevServer(compiler,{
    host: devHost, //endereço da aplicação
    port: devPort, //porta da aplicação
    hot: true, //ativa o hot reload do webpack    
    //As opções abaixo servem para deixar o console limpo, exibindo apenas se a compilação foi feita com sucesso, ou erro
    stats:{
        assets: false,
        colors: false,
        version: false,
        hash: false,
        timings: false,
        chunks: false,
        chunkModules: false
    }
});

server.listen(devPort, devHost, function(){ 
    //Mensagem para sinalizar o endereço da aplicação 
    console.log(chalk.chalkProcessing('Webpack server listening at: ' + target_entry));
    //Abre o browser automaticamente
    open(target_entry);
});