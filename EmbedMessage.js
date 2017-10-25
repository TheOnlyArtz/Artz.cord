module.exports =
class EmbedMessage {
	constructor() {
		this.fields = [];
		this.description = null;
		this.title = null;
		this.footer = null;
		this.author = null;
		this.provider = null;
		this.image = null;
		this.thumbnail = null;
		this.video = null;
    // Am so tired :D
	}

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

	color(integer) {
    // TODO: Do some research about converting from HEX / RGB / VSL / RGBA
	}

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

	newAuthor(name, url) {
		if (this.author || this.author !== null) {
			throw new Error('Can\'t set more than 1 author.');
		}

    if (!name) {
      throw new Error('Can\'t set an empty author (Name missing)');
    }

    const payload = {
      name: name,
      icon_url: url,
    }

    this['author'] = payload;
    return this;
	}

  // TODO: Write all of them!
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

  setImage(url) {
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

  setThumbnail(url) {
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

  setVideo(url) {
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
