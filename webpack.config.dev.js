const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

process.env.BABEL_ENV = 'dev';

module.exports = {   
    resolve: {
        extensions:['.js', '.jsx'] //Não é necessário especificar as extensões listadas em um import
    },
    devtool: 'eval-source-map', //Modo de debug
    entry: [
        'react-hot-loader/patch', //Necessário para o hot reload. Chama o arquivo patch.js no node_modules        
        'webpack/hot/only-dev-server', //Necessário para o hot reload. Obs: a opção only-dev-server é utilizada para não realizar o hot reload caso haja erro de compilação
        path.resolve(__dirname, 'src/index.js') //entry point da aplicação
    ],
    output:{
        path: path.resolve(__dirname, 'dist'), //diretório que será criado o bundle (em dev o arquivo não é criado fisicamente)
        filename: 'bundle.[hash].js', //nome do arquivo do bundle
        publicPath: '/' //Diretório base onde estão os assets
    },
    module: {
        rules: [
            { test: /\.jsx?$/, loaders: ['babel-loader','eslint-loader'],exclude: /node_modules/ } //Resolver os arquivos de extensão .jsx com o babel-loader. Não considerar os arquivos dentro da pasta node_modules                                                            
        ]
    },
    plugins:[
        new webpack.HotModuleReplacementPlugin(), //Plugin pra fazer o hot replace, necessário para o hot reload
        new webpack.NamedModulesPlugin(), //Mostra o nome do módulo que foi atualizado no hot reload no log do console. Sem o plugin aparece apenas o ID
        new webpack.NoEmitOnErrorsPlugin(), //Não emite os assets quando ocorre um erro de build
        new HtmlWebpackPlugin({
            template:'index.template.ejs', //indica o arquivo de template do HTML, usando o padrão EJS
            inject:'body' //insere a tag script no fim da tag body
        })
    ]
}