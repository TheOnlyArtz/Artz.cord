/*
  Cache channels preventing API spam
*/
class ChannelCaching {
  constructor(client, iterable) {
    this.iterable = iterable;
    this.client = client;
  }

  _cache() {
    let that = this;
    this.iterable.forEach(i => {
      i.channels.forEach(o => {
        that.client.channels.set(o.id, that._cachingObj(o, i));
      });
    });
  };

  _cachingObj(data, guildData) {

    let type = data.type

    let initObj = {
      guildID              : guildData.id,
      type                 : type,
      topic                : data.topic,
      position             : data.position,
      permissionOverwrites : data.permission_overwrites,
      parentChannelID      : data.parent_id,
      nsfw                 : data.nsfw,
      name                 : data.name,
      lastMessageID        : data.last_message_id,
      id                   : data.id
    }

    return initObj
  }

}

module.exports = ChannelCaching;
