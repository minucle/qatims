import io from 'socket.io';

/**
 * This class handles everything related to the TCP server.
 */
class Server {
  /**
   * The socket.io Server instance.
   *
   * @type {io.Server}
   * @memberof Server
   * @private
   */
  private io_server: io.Server;
  /**
   * The server port.
   *
   * @type {number}
   * @memberof Server
   * @private
   */
  private port: number;

  /**
   * Server class constructor.
   *
   * @param {number} port The server port.
   * @memberof Server
   * @constructor
   * @throws {Error} If the port is not valid.
   */
  constructor(port: number) {
    // Validate port
    if (!parseInt(port + '') || port < 0) throw new Error('❌ Invalid port.');
    port = port || 8080;

    this.port = port;

    // Create the socket.io server
    this.io_server = new io.Server(this.port);
  }

  /**
   * Handles new connections.
   *
   * @param socket The connecting socket.
   */
  private _onConnection(socket: io.Socket) {
    // Parse data from connection.
    const { identifier } = socket.handshake.query;
    const address = socket.handshake.address;

    // Validate connection.
    // TODO: IP Validation
    // TODO: Identifier Validation (if valid, if has permission and if not connected. If not - ban IP and alert staff.)

    // Log connection
    console.log(`📡 New connection: ${identifier}`);
    // TODO: Local logger

    // Handle disconnection and errors.
    // TODO: Listen to disconnection and error events.
    // TODO: Local logger
  }
}
