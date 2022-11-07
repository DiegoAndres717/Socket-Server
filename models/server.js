//Servidor de express
const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    //Http server
    this.server = http.createServer(this.app);

    // config Socket
    //config de socket server
    this.io = socketio(this.server, {
      /* Configuraciones */
    });
  }

  middleware() {
    //desplegar directorio publico
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    //cors
    this.app.use(cors());
  }

  confSocket() {
    new Sockets(this.io);
  }

  execute() {
    //init midelwaare
    this.middleware();

    //init socket server
    this.confSocket();

    //init server
    this.server.listen(this.port, () => {
      console.log("Server listening on port:", this.port);
    });
  }
}

module.exports = Server;
