// TODO: come up with a better name for this file

import { CONNECTION_RECORD } from 'src/types';

/**
 * This class holds all current connections.
 * It is used to keep track of all connected clients.
 *
 * @class Connections
 */
class Connections {
  /**
   * All current connections.
   *
   * @type {CONNECTIONS}
   * @private
   * @memberof Connections
   */
  private current_connections: Array<CONNECTION_RECORD>;

  /**
   * Creates an instance of Connections.
   *
   * @memberof Connections
   * @constructor
   */
  constructor() {
    this.current_connections = new Array<CONNECTION_RECORD>();
  }

  /**
   * Adds a new connection to the list.
   *
   * @param {string} socket_id The socket ID of the connection to add.
   * @param {string} identifier The identifier of the connection.
   * @param {string} address The address of the connection.
   * @param {number} time_of_connection The time of connection.
   *
   * @memberof Connections
   * @returns {boolean} True if the connection was added, false otherwise.
   */
  public addConnection(
    socket_id: string,
    identifier: string,
    address: string,
    time_of_connection: number
  ): void {
    const connection = {
      socket_id,
      identifier,
      address,
      time_of_connection,
    };

    this.current_connections.push(connection);
  }

  /**
   * Removes a connection from the list.
   *
   * @param {string} socket_id The socket ID of the connection to remove.
   * @memberof Connections
   */
  public removeConnection(socket_id: string): void {
    const index = this.current_connections.findIndex(
      (connection_record) => connection_record.socket_id === socket_id
    );

    this.current_connections.splice(index, 1);
  }

  /**
   * Finds a connection.
   *
   * @param {'socket_id' | 'identifier' | 'address'} search_key The key to search for.
   * @param {string} search_query The socket ID of the connection to return.
   * @memberof Connections
   *
   * @returns {CONNECTION_RECORD | undefined} The connection details, or undefined if not found.
   */
  public findConnection(
    search_key: 'socket_id' | 'identifier' | 'address',
    search_query: string
  ): CONNECTION_RECORD | undefined {
    const connection = this.current_connections.find((connection_record) => {
      return connection_record[search_key] === search_query;
    });

    return connection;
  }
}

export default new Connections();
