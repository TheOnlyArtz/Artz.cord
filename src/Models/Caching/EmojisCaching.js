const Emoji = require('../Emoji.js');

class EmojisCaching {
	constructor(client, iterable) {
		this.iterable = iterable;
		Object.defineProperty(this, 'client', {value: client});
	}

	_cache() {
		const that = this;
		if (this.iterable && Array.isArray(this.iterable)) {
			this.iterable.forEach(i => {
				this.client.emojis.set(i.id, new Emoji(that.client, i));
			});
		}
	}
}

module.exports = EmojisCaching;
