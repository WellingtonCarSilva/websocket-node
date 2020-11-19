const express = require("express");
const http = require("http");
const WebSocket = require("ws");
const calcula = require("./calculo");

const app = express();

app.get("/", function (req, res) {
  res.send("Hello World");
});

//Inicializa um servidor HTTP orquestrado pelo express
const server = http.createServer(app);

//Inicializa um instancia de servidor websocket a partir do servidor http
const wss = new WebSocket.Server({ server });

const connections = [];

// Função responsável por manusear a conexão websocket
wss.on("connection", (ws) => {
  // Função que trata as mensagens recebidas pelo servidor
  ws.on("message", (payload) => {
    console.log(payload);
    payload = JSON.parse(payload);
    
    var resultado = {
      "mensagem": realizaCalculo(payload.mensagem),
      "usuario": "Calculadora"
    };
    
    if(connections.indexOf(ws) < 0){
      connections.push(ws);
    }
    connections.map(function (c) {
      c.send(JSON.stringify(payload));
      c.send(JSON.stringify(resultado));
    });  
    
  });
});

//Inicia o servidor
server.listen(process.env.PORT || 9898, () => {
  console.log("Servidor conectado na porta:", server.address().port);
});

function realizaCalculo(mensagem){
    var itensMensagem = mensagem.split(' ');

    switch (itensMensagem[1]) {
      case '+':
        return calcula.somar(itensMensagem[0],itensMensagem[2])
      case '-':
        return calcula.subtrair(itensMensagem[0],itensMensagem[2])
      case '/':
        return calcula.dividir(itensMensagem[0],itensMensagem[2])
      case '*':
        return calcula.multiplicar(itensMensagem[0],itensMensagem[2])
      default:
        return 'Favor informar os valores separados por espcaço';
    }
}