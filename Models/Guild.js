class Guild {
	constructor(client, data) {
		this.id = data.id;
		this.name = data.name;
		this.icon = data.icon;
		this.splash = data.splash;
		this.ownerID = data.owner_id;
		this.region = data.region;
		this.afkChannelID = data.afk_channel_id;
		this.afkTimeout = data.afk_timeout;
		this.embedEnabled = data.embed_enabled;
		this.verificationLevel = data.verification_level;
		this.defaultMessageNotifications = data.default_message_notifications;
		this.embedChannelID = data.embed_channel_id;
		this.explicitContentFilter = data.explicit_content_filter;
		this.roles = data.roles; // TODO: Collection
		this.emojis = data.emojis; // TODO: Collection
		this.features = data.features;
		this.mfaLevel = data.mfa_level;
		this.widgetEnabled = data.widget_enabled;
		this.large = data.large;
		this.unavailable = data.unavailable;
		this.memberCount = data.member_count;
		this.voiceStates = data.voice_states;
		this.members = data.members; // TODO: collection
		this.channels = data.channels; // TODO: collection
		this.presence = data.presences; // TODO: Collection
	}
}

module.exports = Guild;
