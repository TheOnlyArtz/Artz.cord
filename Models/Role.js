const Structure = require('./Structure.js');

/**
* A GuildRole Structure meant to control over GuildRole properties and methods
* @extends Structure
* @param {Object} client ArtzyCord's Client instance
* @param {Object} guild A valid Guild instance
* @param {Object} role A valid Role data Object
*/
class Role extends Structure {
  constructor(client, guild, role) {
    super(client);
    Object.defineProperty(this, 'guild', {value: guild});
    this.mentionable = role.mentionable;
    this.position = role.position;
    this.name = role.name;
    this.managed = role.managed;
    this.color = role.color;
    this.permissions = role.permissions;
    this.id = role.id;
    this.hoist = role.hoist;
  }


  /**
  * Deletes a Role out of the guild
  * @returns {Promise}
  * @example
  * Role.delete()
  *   .catch(e => console.error(e))l
  */
  async delete() {
    const url = this.client.APIManager.endpoints.ENDPOINTS_GUILDS.roles.delete(this.guild.id, this.id);
    try {
      await this.client.APIManager.makeRequest('delete', url)
    } catch (e) {
      throw e;
    }
  }

  /**
  * @param name A new name you want the role to have
  * @returns {Promise} Returns a updated Role instance
  * @example
  * Role.changeName('ArtzyCord')
  *   .then(role => console.log(`Hey! this is the new Role name: ${role.name}`))
  *   .catch(e => console.error(e));
  */
  async changeName(name) {
    if (!name) throw 'Please supply a name to change'
    const url = this.client.APIManager.endpoints.ENDPOINTS_GUILDS.roles.modify(this.guild.id, this.id);
    const payload = {
      name: name ? name : null
    };

    try {
      let request = await this.client.APIManager.makeRequest('patch', url, payload)
      return new Role(this.client, this.guild, request)
    } catch (e) {
      throw e;
    }
  }


  /**
  * @param {String} [options.name = "new role"] The name of the role
  * @param {Number} [options.permissions = "@everyone permissions"] bitwise of the enabled or disabled permissions
  * @param {Number} [options.color = 0] The RGB volor value
  * @param {Boolean} [options.hoist = false] Whether the role should be displayed separately in the sidebar
  * @param {Boolean} [options.mentionable = false] Whether the role should ne mentionable
  * @param {Boolean} [options.position] The role's position
  * @example
  * // Modifing a role to be an Admin role
  * Role.modify({name: "Administrator", permissions: 0x8, color: 0xCE2E2E, hoist: true, mentionable: false})
  *   .then(role => console.log('Modified a role to be an Administrator'))
  *   .catch(e => console.error(e))
  */
  async modify(options) {
    let payload = {}
    let keys = Object.keys(options) // Prevent looping too much
    const url = this.client.APIManager.endpoints.ENDPOINTS_GUILDS.roles.modify(this.guild.id, this.id);
    if (keys.length === 1) {
      payload[keys[0]] = options[keys[0]]
    } else {
      keys.forEach(key => {
        payload[key] = options[key]
      });
    }
    try {
      const request = await this.client.APIManager.makeRequest('patch', url, payload)
      return new Role(this.client, this.guild, request)
    } catch (e) {
      throw e
    }
  }

  /**
  * @param {Number} position The role's position
  * @returns {Promise}
  * @example
  * Role.changePosition(10)
  *   .then(role => console.log(`New role: ${role}`))
  *   .catch(e => console.error(e))
  */
  async changePosition(position) {
    if (typeof position !== 'number') throw new Error('Position must be an integer');
    const url = this.client.APIManager.endpoints.ENDPOINTS_GUILDS.roles.modifyPositions(this.guild.id);
    const payload = {
      id: this.id,
      position: 1
    }
    try {
      let request = await this.client.APIManager.makeRequest('patch', url, payload)
      return new Role(this.client, this.guild, request.filter(e => e.id === this.id)[0]);
    } catch (e) {
      throw e
    }
  }

}

module.exports = Role
