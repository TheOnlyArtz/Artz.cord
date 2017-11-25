const User = require('./user.js');
const Structure = require('./Structure.js');
const Box = require('./Box.js')

/**
* A GuildMember class meant to control over GuildMember properties and methods
* @extends Structure A base Structure class
* @param {Object} client Artzycord's Client instance
* @param {Object} guild A valid Guild instance
* @param {Object} member A valid Guild Member data Object
* @property {String} guildID The Guild's ID
* @property {Boolean} muted Whether the member is voice muted or not
* @property {Date} joinedAt When did the member joined the guild
* @property {User} user The user instance
* @property {Boolean} deaf Whether the member is deaf or not
* @property {Box} roles The roles the member has
*/
class GuildMember extends Structure {
  constructor(client, guild, member) {
    super(client);
    Object.defineProperty(this, 'guild', {value: guild});
    Object.defineProperty(this, 'member', {value: member});
    this.guildID = guild.id;
    this.muted = member.mute;
    this.joinedAt = member.joined_at;
    this.user = this.client.users.get(member.user.id) ? this.client.users.get(member.user.id) : new User(client, member.user)
    this.deaf = member.deaf;

    this.roles = new Box;
    for (let role of member.roles) {
      this.roles.set(role, guild.roles.get(role))
    }

  }

  /**
  * @returns {String} User's mention String
  * @example
  * // Get the mention String
  * message.channel.send(`${GuildMember.toString()}`)
  * // It will mention the user too
  */
  toString() {
    return `<@${this.member.user.id}>`
  }

  /**
  * Lets you ban a GuildMember
  * @param {Number} days The amount of days messages will be deleted
  * @param {String} reason The reason
  * @returns {Promise} Returns GuildMember Object (The banned member)
  * @example
  * // bans a guild member
  * GuildMember.ban(7, 'Reason, Because I can?')
  *		.then(user => console.log(`Banned ${user.username}`))
  * 	.catch(e => console.error(e));
  */  async ban(days, reason) {
    try {
      let promise = await this.guild.banMember(this.user.id, days, reason)
      return this;
    } catch (e) {
      throw e;
    }
  }

  async kick(options) {

    const payload = {
      reason : options && options.reason ? options.reason : null
    }

    const guildID = this.guild.id;

    const endpoint = this.client.APIManager.endpoints
      .ENDPOINTS_GUILDS
      .members
      .remove(guildID, this.user.id);
      try {
        let res = await this.client.APIManager.makeRequest('delete', endpoint, {}, payload);
      } catch (e) {
        throw new Error(e);
      }

  }

  async changeNickname(nickname) {
      if (!nickname) {
        throw new Error('ERROR: Please supply a nickname');
      }

      let guildID = this.guild.id;

      const payload = {
        nick: nickname,
      };

      const endpoint = this.client.APIManager.endpoints
        .ENDPOINTS_GUILDS
        .members
        .modify(guildID, this.user.id);

      try {
        let res = await this.client.APIManager.makeRequest('patch', endpoint, payload);
      } catch (e) {
        throw new Error(e)
      }

  }

  async assignRole(Snowflake) {


  }

  async removeRole(Snowflake) {
  }


}

module.exports = GuildMember;
