class Box extends Map {
  constructor(iterable) {
    super(iterable);

    Object.defineProperty(this, 'BkeyArray', { value: null, writable: true, configurable: true });
    Object.defineProperty(this, 'Barray', { value: null, writable: true, configurable: true });
  }

  delete() {
    this.BkeyArray = null;
    this.Barray = null;
    return super.set(key, value);
  }

  array() {
    if (!this.Barray || this.Barray.length !== this.size) {
      this.Barray = Array.from(this.values());
    }

    return this.Barray;
  }

  ArrayOfKeys() {
    if (!this.Barray || this.Barray.length !== this.size) {
      this.Barray = Array.from(this.keys());
    }

    return this.Barray;
  }

  find(property, value) {
    if (typeof property === 'string') {
      if (!value) throw new Error('Please specify a value');
      let _iterable = this.keys();
      for (const obj of _iterable) {
        if (this.get(obj)[property] === value) {
          return this.get(obj)
        }
      }
    }
  }

  set(key, value) {
    this.BkeyArray = null;
    this.Barray = null;
    return super.set(key, value);
  }

  first() {
    return this.array()[0]
  }
}

module.exports = Box;
