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
    switch (type) {
      case 0:
        type = "Text Channel";
        break;
      case 1:
        type = "Direct Messages";
        break;
      case 2:
        type = "Voice Channel";
        break;
      case 3:
        type = "DM Group";
        break;
      case 4:
        type = "Guild Category";
        break;
      default: "unknown";

    }

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
