/**
* A class that allows the client to send Embed objects
* @property {Array} fields The array of the embed fields
* @property {Number} color The color of the embed (RGB color codes ONLY)
* @property {String} description The embed's description
* @property {String} title The embed's title
* @property {String} footer The embed's footer
* @property {String} author The embed's author
* @property {String} provider The embed's provider
* @property {URI} image The embed's image (URL must be image resolvable)
* @property {URI} thumbnail The embed's thumbnail (URL must be image resolvable)
* @property {URI} video The embed's video (URL mest be video resolvable)
* @example
* // creating a simple embed
* let myEmbed = new Discord.EmbedMessage()
*		.newDescription('Hey. this is how to make an embed with ArtzyCord')
*		.newThumbnail('https://goo.gl/Sgg1hD')
* message.channel.send(myEmbed);
*/
class EmbedMessage {
	constructor() {
		this.fields = [];
		this.color = null
		this.description = null;
		this.title = null;
		this.footer = null;
		this.author = null;
		this.provider = null;
		this.image = null;
		this.thumbnail = null;
		this.video = null;
	}

	/**
	* Lets you assign a new field for the embed
	* @param {String} title Field's title
	* @param {String} content Field's inner content
	* @param {Boolean} [inline = false] Whether the field will be inline or not
	* @example
	* new EmbedMessage().newField('TITLE', 'CONTENT', true)
	*/
	newField(title, content, inline = false) {
		if (this.fields.length >= 25) {
			throw new Error('ERROR: Embed Limit has been reached, can\'t set more than 25 fields.');
		}

		if (!title) {
			throw new Error('ERROR: Please supply the title of the field.');
		}

		if (!content) {
			throw new Error('ERROR: Can\'t create an empty field (Content missing)');
		}

		const payload = {
			name: title,
			value: content,
			inline
		};
		this.fields.push(payload);

		return this;
	}

	/**
	* Lets you assign a description for the embed
	* @param {String} content Description's content
	* @example
	* new EmbedMessage().newDescription('CONTENT')
	*/
	newDescription(content) {
		if (this.description || this.description !== null) {
			throw new Error('Can\'t create more than 1 description.');
		}

		if (!content) {
			throw new Error('Can\t create an empty description (Content missing)');
		}

		this.description = content;
		return this;
	}

	/**
	* Lets you assign a title for the embed
	* @param {String} title Title's content
	* @example
	* new EmbedMessage().newTitle('TITLE')
	*/
	newTitle(title) {
		if (this.title || this.title !== null) {
			throw new Error('Can\'t create more than 1 title.');
		}

		if (!title) {
			throw new Error('Can\t create an empty title (Content missing)');
		}

		this.title = title;
		return this;
	}

	/**
	* SOOOON
	* @param {Number} color Embed's color
	* @example
	* new EmbedMessage().setColor(0xf1f08f)
	*/
	setColor(color) {
    this.color = color ? color : ''
	}

	/**
	* Lets you assign a footer for the embed
	* @param {String} content Footer's content
	* @param {URI} [icon = null] Footer's ICON
	* @example
	* new EmbedMessage().newFooter('CONTENT', 'https://goo.gl/Sgg1hD')
	*/
	newFooter(content, icon = null) {
		if (this.footer || this.footer !== null) {
			throw new Error('Can\'t create more than 1 footer.');
		}

		if (!content) {
			throw new Error('Can\t create an empty footer (Content missing)');
		}

		const payload = {
			text: content,
			icon_url: icon
		};

		this.footer = payload;
		return this;
	}

	/**
	* Lets you assign an author for the embed
	* @param {String} name Author's name
	* @param {URI} [icon = null] Author's ICON
	* @example
	* new EmbedMessage().newAuthor('NAME', 'https://goo.gl/Sgg1hD')
	*/
	newAuthor(name, icon) {
		if (this.author || this.author !== null) {
			throw new Error('Can\'t set more than 1 author.');
		}

    if (!name) {
      throw new Error('Can\'t set an empty author (Name missing)');
    }

    const payload = {
      name: name,
      icon_url: icon,
    }

    this['author'] = payload;
    return this;
	}

	/**
	* Lets you assign a provider for the embed
	* @param {String} name provider's name
	* @param {URI} [url = null] provider's ICON
	* @example
	* new EmbedMessage().newProvider('NAME', 'https://goo.gl/Sgg1hD')
	*/
  newProvider(name, url) {
		if (this.provider || this.provider !== null) {
			throw new Error('Can\'t set more than 1 provider.');
		}

		if (!name) {
			throw new Error('Can\'t set an empty author (Name missing)');
		}

		const payload = {
			name: name,
			icon_url: url,
		}

		this['provider'] = payload;
    return this;
  }

	/**
	* Lets you assign an image for the embed
	* @param {URI} url Footer's ICON (image resolvable)
	* @example
	* new EmbedMessage().newImage('https://goo.gl/Sgg1hD')
	*/
  newImage(url) {
		if (this.image || this.image !== null) {
			throw new Error('Can\'t set more than 1 image.');
		}

		if (!url) {
			throw new Error('Can\'t set an empty image (Image resolvable missing)');
		}

		const payload = {
			url: url,
		}

		this['image'] = payload
    return this;
  }

	/**
	* Lets you assign a thumbnail for the embed
	* @param {URI} url Thumbnail's image (image resolvable)
	* @example
	* new EmbedMessage().newThumbnail('https://goo.gl/Sgg1hD')
	*/
  newThumbnail(url) {
		if (this.thumbnail || this.thumbnail !== null) {
			throw new Error('Can\'t set more than 1 thumbnail.');
		}

		if (!url) {
			throw new Error('Can\'t set an empty thumbnail (Image resolvable missing)');
		}

		const payload = {
			url : url
		}

		this['thumbnail'] = payload;
    return this;
  }

	/**
	* Lets you assign a video for the embed
	* @param {URI} url a valid video URL
	* @example
	* new EmbedMessage().newVideo('https://youtube.be/watch?v=Idontknow')
	*/
  newVideo(url) {
		if (this.video || this.video !== null) {
			throw new Error('Can\'t set more than 1 video.');
		}

		if (!url) {
			throw new Error('Can\'t set an empty video (Image resolvable missing)');
		}

		const payload = {
			url : url
		}

		this['video'] = payload;

    return this;
  }

};

module.exports = EmbedMessage
