import io from "socket.io";

class Server {
  private io_server: io.Server;
  private port: number;

  constructor(port: number) {
    if (!parseInt(port + "")) throw new Error("Port must be a number");
    port = port || 8080;
  }
}
