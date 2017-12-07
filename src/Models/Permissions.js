const constants = require('../Constants.js');
const Constants = new constants();
const Structure = require('./Structure.js');
/**
* Permissions that we are all just ♥ {Sarcastic}
* @extends Structure
* @param {Number} permissions Permissions's bitfields
* @property {Number} bitfield the permissions in bitfield
*/
class Permissions extends Structure {
  constructor(client, permissions = 0) {
    super(client);
    this.bitfield = permissions;
  }

  /**
  * Check if a bitfield has a specific permission in it
  * @param {Array} permissions The permission you want to check
  * @param {Boolean} [checkIfAdmin = true] Check if the bitfield has ADMINISTRATOR perms
  * @example
  * // check admin
  * console.log(Permissions.has([2048])); // -> If permissions has SEND_MESSAGES it'll return true
  */
  has(permissions, checkIfAdmin = true) {
    if (!Array.isArray(permissions)) {
      permissions = [permissions]
    }

    if (checkIfAdmin === true && (this.bitfield & Constants.PERMISSIONS['ADMINISTRATOR'] > 0)) {
      return true;
    }

    permissions.forEach(perm => {
      if ((this.bitfield & perm) !== perm) {
        return false;
      }
    });

    return true;
  }

  /**
  * Resolve a permission to it's bitfield
  * @static
  * @param {String} perm The permission's name
  * @example
  * // Resolve 2048 (SEND_MESSAGES)
  * Permissions.resolve(2048) // -> SEND_MESSAGES
  */
  static resolve(perm) {
    perm = perm.toUpperCase();
    if (typeof perm === 'number') {
      return perm
    } else if (Constants.PERMISSIONS[perm] && typeof perm === 'string') {
      return Constants.PERMISSIONS[perm];
    }
  }
}

module.exports = Permissions;
