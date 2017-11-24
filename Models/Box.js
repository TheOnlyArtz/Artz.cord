
/**
* A Box Add-on meant to make our lives easier
* @extends Map
* @param {Array} iterable An iterable instance would be something like an Array
*/
class Box extends Map {
  constructor(iterable) {
    super(iterable);

    Object.defineProperty(this, 'BkeyArray', { value: null, writable: true, configurable: true });
    Object.defineProperty(this, 'Barray', { value: null, writable: true, configurable: true });
  }

  /**
  * Deletes a Box instance via key
  * @param {String} key A box object key to delete
  * @example
  * Box.delete('xxxxxx');
  */
  delete(key) {
    this.BkeyArray = null;
    this.Barray = null;
    return super.delete(key);
  }

  /**
  * Returns an Array of the Box instances
  * @example
  * Box.array();
  */
  array() {
    if (!this.Barray || this.Barray.length !== this.size) {
      this.Barray = Array.from(this.values());
    }

    return this.Barray;
  }

  /**
  * Returns an Array of Box keys
  * @example
  * Box.ArrayOfKeys();
  */
  ArrayOfKeys() {
    if (!this.Barray || this.Barray.length !== this.size) {
      this.Barray = Array.from(this.keys());
    }

    return this.Barray;
  }

  /**
  * Lets you find a Box instance by simply giving it a base property and a base value
  * @param {String} property The base property the search will look for
  * @param {String} value The value the search system will look for
  * @example
  * Box.find('name', 'BoxRocks'); // returns an instance with which has the name of BoxRocks (If there)
  */
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

  /**
  * Setting a new map instance
  * @param {String} key The key
  * @param {Object|String|Boolean|Number} value The instance's value
  * @example
  * Box.set('NewInstance', 'Object|String|Boolean|Number');
  */
  set(key, value) {
    this.BkeyArray = null;
    this.Barray = null;
    return super.set(key, value);
  }

  /**
  * Returns the first instance in the Box
  * @example
  * Box.first();
  */
  first() {
    return this.array()[0]
  }
}

module.exports = Box;
