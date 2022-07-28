import { Socket } from 'socket.io';
import Connections from '../connection/connections';
import allowed_addresses from '../../data/allowed_addresses.json';

/**
 * Validate the connecting socket.
 *
 * @return {boolean} True if the socket is valid, false otherwise.
 */
function socketValidation(
  socket_id: string,
  identifier: string,
  address: string
): Boolean {
  // Validate address
  if (
    !allowed_addresses.includes('*') &&
    !allowed_addresses.includes(address)
  ) {
    // TODO: log error

    return false;
  }

  // Validate identifier
  if (!identifier) {
    // TODO: log error

    return false;
  }

  // TODO: check if valid
  // TODO: check if has permission

  if (Connections.findConnection('identifier', identifier)) {
    // TODO: log error

    // TODO: block ip and alert staff

    return false;
  }

  return true;
}

export default socketValidation;
