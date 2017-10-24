module.exports =
class EmbedMessage {
	constructor() {
		this.fields = [];
		this.description = null;
		this.title = null;
		this.footer = null;
		this.author = null;
    // Am so tired :D
	}

	createField(title, content, inline = false) {
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

	description(content) {
		if (this.description || this.description !== null) {
			throw new Error('Can\'t create more than 1 description.');
		}

		if (!content) {
			throw new Error('Can\t create an empty description (Content missing)');
		}

		this.description = content;
		return this;
	}

	title(title) {
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

	footer(content, icon = null) {
    // TODO: convert URL to 64bit string.
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

	author(name, url) {
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
  provider() {
    return this;
  }

  image() {
    return this;
  }

  thumbnail() {
    return this;
  }

  video() {
    return this;
  }

};
