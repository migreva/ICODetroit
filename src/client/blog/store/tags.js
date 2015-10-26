import { filter } from 'lodash';

let TAGS = Symbol('tags');
let TAGMAP = Symbol('tagMap');
let TAG = Symbol('tag');
let COUNT = Symbol('count');
let ACTIVE = Symbol('active');

export default class TagStore {


  constructor() {
    // Array of tags
    this[TAGS] = [];

    // Maps tag strings to array in this.tags
    this[TAGMAP] = {};
  }

  /**
   * Get all the tags in the store. Ordered by Tag.count;
   *
   * @memberof TagStore
   * @returns {Array} Sorted array of tags
   */
  getAllTags() {
    return this[TAGS].sort(this.compareTags_)
  }

  /**
   * Get all the active tags in the store, ordered by Tag.count);
   *
   * @memberof TagStore
   * @returns {Array} Sorted array of tags that are active
   *
   */
  getActiveTags() {
    let activeTags = this[TAGS].filter(Tag.checkActive);
    return activeTags.sort(this.compareTags_);
  }

  /**
   * Get all inactive tags in the store, ordere by Tag.count
   *
   * @memberof TagStore
   * @returns {Array} Sorted array of tags that are inactive
   *
   */
  getInactiveTags() {
    let inactiveTags = this[TAGS].filter(function(t) { return !t.isActive() });
    return inactiveTags.sort(this.compareTags);
  }

  /**
   * Add a tag to the store. Creates the tag if needed, incremement the count
   *
   * @memberof TagStore
   * @param {String} tagString - string of characters representing a tag
   * @return {Tag}
   */
  addTag(tagString) {
    let tag = this.getTagAndCreate_(tagString);
    tag.incrementCount();
    return tag;
  }

  /**
   * Activate a tag specified by tagString. Noop if tagString isn't in the store
   *
   * @memberof TagStore
   * @param {String} tagString - string representing tag
   * @return {Tag/undefined} Tag if tagString in store, null otherwise
   */
  activateTag(tagString) {
    let tag = this.getTag_(tagString);
    if (tag) tag.setActive();
    return tag;
  }

  /**
   * Dectivate a tag specified by tagString. Noop if tagString isn't in the store
   *
   * @memberof TagStore
   * @param {String} tagString - string representing tag
   * @return {Tag/undefined} Tag if tagString in store, null otherwise
   */
  deactivateTag(tagString) {
    let tag = this.getTag_(tagString);
    if (tag) tag.setInactive();
    return tag;
  }

  /**
   * (Private) Get a tag represented by tagString. If we don't have the tag, create it
   *
   * @memberof TagStore
   * @param {String} tagString - string representing the tag to lookup
   * @return {Tag} Tag object
   */
  getTagAndCreate_(tagString) {
    let tag = this.getTag_(tagString);
    if (!tag) {
      tag = this.createTag_(tagString);
    }
    return tag;
  }

  /**
   * Get the tag represented by tagString, if it exists.
   *
   * @memberof TagStore
   * @param {String} tagString - string represnting tag
   * @return {Tag/null} Tag is found, null if not
   */
  getTag_(tagString) {
    let tag = null;
    if (tagString in this[TAGMAP]) {
      let index = this[TAGMAP][tagString];
      tag = this[TAGS][index];
    }
    return tag;
  }

  /**
   * (Private) create a tag in the store
   *
   * @memberof TagStore
   * @param {String} tagString - string representing the tag
   * @return {Tag} Created tag
   */
  createTag_(tagString) {
    let tag = new Tag(tagString);

    this[TAGS].push(tag);
    this[TAGMAP][tagString] = this[TAGS].length - 1;

    return tag
  }

  /**
   * Static method used to in Array.sort to sort tags by count
   *
   * @memberof TagStore
   * @param {Tag} a, b - Tags to compare
   */
  static compareTags_(a, b) {
    return a.getCount() - b.getCount();
  }
}

class Tag {

  constructor(tagString) {
    this[TAG] = tagString;
    this[COUNT] = 0;
    this[ACTIVE] = false;
  }

  // Setters
  incrementCount() { this[COUNT] += 1; }
  setActive() { this[ACTIVE] = true; }
  setInactive() { this[ACTIVE] = false; }

  // Getters
  getCount() { return this[COUNT]; }
  isActive() { return this[ACTIVE]; }
  toString() { return this[TAG]; }

  // Static
  static checkActive(tag) { return tag.isActive(); }

}

