let connection = null;

class Socket {
  socket;
  
  constructor() {
    this.socket = null;
  }
  connect(server) {
    try {
        const io = require("socket.io")(server, {
            cors: {
                origin: "http://localhost:5001",
                methods: ["GET", "POST"]
            }
        });
        io.on("connection", async (socket) => {

          console.log('connected clients********', io.engine.clientsCount);
          const inst = await io.fetchSockets()
          console.log("socket instances =========", inst.length);
          console.log("socket id =========", socket.id);
          console.log("socket room =========", socket.rooms);
           this.socket = socket;
           socket.on("joinUser", data => {
            console.log("joinded user");
            socket.join(data.conversation_id)
           })
           socket.on('sendMsgToServer', msg => {
            console.log('------my msg',msg);
           })
           socket.on('userLeaving', room => {
            socket.leave(room)
           })
        });
    } catch (error) {
        console.log(error);
    }
  }
  emit(event, data) {
    this.socket.emit(event, data);
  }
  static init(server) {
    if (!connection) {
      connection = new Socket();
      connection.connect(server);
    }
  }
  static getConnection() {
    if (connection) {
      return connection;
    }
  }
}
module.exports = {
  connect: Socket.init,
  connection: Socket.getConnection
}