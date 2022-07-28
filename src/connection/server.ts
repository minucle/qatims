import io from 'socket.io';
import socketValidation from '../validations/socket_validation';
import Connections from './connections';

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
   * Creates an instance of Server.
   *
   * @param {number} [port] The server port.
   * @memberof Server
   * @constructor
   * @throws {Error} If the port is not valid.
   */
  constructor(port?: number) {
    // Validate port
    if (port && (!parseInt(port + '') || port < 0))
      throw new Error('❌ Invalid port.');
    port = port || 8080;

    this.port = port;

    // Create the socket.io server
    this.io_server = new io.Server();
  }

  /**
   * Handles new connections.
   *
   * @param socket The connecting socket.
   */
  private _onConnection(socket: io.Socket) {
    // Parse data from connection.
    const identifier = socket.handshake.query.identifier?.toString() || '';
    const address = socket.handshake.address;
    const time_of_connection = Date.now();

    // Validate connection.
    if (!socketValidation(socket.id, identifier, address)) {
      // TODO: log error
      console.log(`❌ Invalid connection from ${address}`);

      socket.disconnect();
      return;
    }

    // Add connection to list.
    Connections.addConnection(
      socket.id,
      identifier,
      address,
      time_of_connection
    );

    // Log connection
    console.log(`📡 New connection: ${identifier}`);
    // TODO: Local logger

    // Handle disconnection and errors.
    socket.on('disconnect', () => this._handleDisconnection(socket));
    socket.on('error', (error) => this._handleDisconnection(socket, error));
  }

  /**
   * Handles socket disconnection.
   *
   * @param {Socket} socket The socket that disconnected.
   * @param {Error} [error] The error that caused the disconnection.
   *
   * @memberof Server
   */
  private _handleDisconnection(socket: io.Socket, error?: Error) {
    // Log disconnection
    console.log(`🚫 Disconnection: ${socket.id}`);

    // Remove connection from list.
    Connections.removeConnection(socket.id);

    if (!error) return;
    // TODO: log error
  }

  /**
   * Starts the server.
   *
   * @param {void} [callback] The callback function.
   *
   * @memberof Server
   */
  public start(callback?: () => void) {
    // Start the server
    this.io_server.listen(this.port);

    // Handle new connections
    this.io_server.on('connection', this._onConnection.bind(this));

    // Callback
    if (callback) callback();
  }
}

export default Server;
