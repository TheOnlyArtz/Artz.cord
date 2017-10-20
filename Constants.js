class Constants {
  constructor() {

    this.HTTP = {
      url: 'https://discordapp.com/api',
      version: "7",
    }

    this.VERSION = '0.0.1';

    this.CDN = {
      url: 'https://cdn.discordapp.com/',
      emojis: (id) => `emojis/${id}.png`,
      icons: (id, splash) => `icons/${id}/${splash}.png`,
      splashes: (id, splash) => `splashes/${id}/${splash}.png`,
      defaultAvatar: (discriminator) => `embed/avatars/${discriminator}.png`,
      userAvatar: (id, avatar, format) => `avatars/${id}/${avatar}.${format}`,
      appIcon: (id, icon) => `app-icons/${id}/${icon}.png`
    };

    this.ENDPOINTS = {
      channels: {
        get: (id) => `channels/${id}`,
        modify: (id) => `channels/${id}`,
        delete: (id) => `channels/${id}`,
        messages: {
          list: (id) => `channels/${id}/messages`,
          get: (ChannelID, MessageID) => `channels/${ChannelID}/messages/${MessageID}`,
          create: (id) => `channels/${id}/messages`,
          reactions: {
            create: (id, Mid, emoji) => `channels/${id}/messages/${Mid}/${emoji}/@me`,
            delete: (id, Mid, emoji) => `channels/${id}/messages/${Mid}/${emoji}/@me`,
            deleteUser: (id, Mid, userID) => `/channels/${id}/messages/${Mid}/reactions/${emoji}/${userID}`,
            get: (id, Mid, emoji) => `channels/${id}/messages/${Mid}/reactions/${emoji}`,
            deleteAll: (id, Mid) => `channels/${id}/messages/${Mid}/reactions`
          },
          permissions: {
            edit: (id, overwrite) => `channels/${id}/permissions/${overwrite}`,
            delete: (id, overwrite) => `channels/${id}/permissions/${overwrite}`,
          },
          invites: {
            create: (id) => `channels/${id}/invites`,
            list: (id) => `channels/${id}/invites`
          },
          edit: (id, Mid) => `channels/${id}/messages/${Mid}`,
          delete: (id, Mid) => `channels/${id}/messages/${Mid}`,
          bulkDelete: (id) => `channels/${id}/messages/bulk-delete`,
          typing: (id) => `channels/${id}/typing`,
          pins: {
            add: (id, Mid) => `channels/${id}/pins/${Mid}`,
            list: (id) => `channels/${id}/pins`,
            delete: (id, Mid) => `channels/${id}/pins/${Mid}`,
          },
          DMgroup: {
            add: (id, userID) `channels/${id}/recipients/${userID}`,
            remove: (id, userID) `channels/${id}/recipients/${userID}`,
          },
          emojis: {

          }
        }
      }
    }
  }

}

module.exports = Constants;
