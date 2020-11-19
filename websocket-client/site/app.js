window.onload = function () {
  // Busca a referencia elementos da página
  var form = document.getElementById("message-form");
  var messageField = document.getElementById("message");
  var messagesList = document.getElementById("messages");
  var socketStatus = document.getElementById("status");
  var closeBtn = document.getElementById("close");
  var usuario = document.getElementById('hddUsuario');
  var modal = document.getElementById('divModal');

  if (usuario != undefined && usuario.innerText != '') {
    modal.style.display = "none";
  }
  // Cria um novo socket.
  var socket = new WebSocket("ws://localhost:9898/");

  // Função para tratar os erros que podem ocorrer
  socket.onerror = function (error) {
    console.log("WebSocket Error: ", error);
  };

  // Função chamada no momento da conexão do cliente com o servidor
  socket.onopen = function (event) {
    socketStatus.innerHTML =
      "Conectado ao servidor: " + event.currentTarget.url;
    socketStatus.className = "open";
  };

  // Função para tratar mensagens enviadas pelo servidor.
  socket.onmessage = function (event) {
    var payload = JSON.parse(event.data);
    if(payload.usuario != usuario.value){
        messagesList.innerHTML +=
          '<li class="received"><span style="margin-right:25px;">'+ payload.usuario + ': </span>' + payload.mensagem + "</li>";
    }
  };

  // Função chamada no momento da desconexão do servidor com o cliente
  socket.onclose = function (event) {
    socketStatus.innerHTML = "Websocket desconectado.";
    socketStatus.className = "closed";
  };

  // Função que envia mensagens para o servidor através da conexão websocket
  form.onsubmit = function (e) {
    e.preventDefault();

    // Pega a mensagem digitada no campo de mensagem do formulário
    var payload = {
      "mensagem": messageField.value,
      "usuario": usuario.value
    };
    
    // Envia a mensagem através do websocket
    socket.send(JSON.stringify(payload));

    // Adiciona a mensagem enviada na tela
    messagesList.innerHTML +=
      '<li class="sent"><span>Enviado:</span>' + payload.mensagem + "</li>";

    // Limpa o campo de mensagem
    messageField.value = "";

    return false;
  };

  // Função que fecha a conexão websocket
  closeBtn.onclick = function (e) {
    e.preventDefault();

    socket.close();

    return false;
  };
};

function fecharModal(){
  var usuario = document.getElementById('txtUsuario').value;
  document.getElementById('hddUsuario').value = usuario;
  document.getElementById('divModal').style.display='none';
}
