
/**
 * Represents the group of components.
 * Basically it's a criteria for finding Entity.
 * ComponentGroup has three BitSet which will be used to search Entity:
 * contain, intersect, exclude.
 * contain will only match if a Entity has all the Component in BitSet.
 * intersect will match if a Entity has at least one of the Component in BitSet.
 * exclude will match if a Entity doesn't have a Component in BitSet.
 * This class can be generated by a {@link ComponentGroup.createBuilder}.
 * @constructor
 * @extends EventEmitter
 * @see BitSet
 * @see Entity
 * @see Component
 */
function ComponentGroup(contain, intersect, exclude) {
  Package.EventEmitter.call(this);
  /**
   * The ID of this object.
   * This will be given by Engine, and it shouldn't be edited.
   * @readonly
   * @var {Number}
   */
  this.id = null;
  /**
   * The Engine associated with this object.
   * @private
   * @var {Engine}
   */
  this._engine = null;
  /**
   * The 'contain' criteria. 
   * This will only match if a Entity has all the Component in this BitSet.
   * @var {BitSet}
   */
  this.contain = contain;
  /**
   * The 'intersect' criteria. 
   * This will match if a Entity has at least one of the Component in BitSet.
   * @var {BitSet}
   */
  this.intersect = intersect;
  /**
   * The 'exclude' criteria. 
   * This will match if a Entity doesn't have a Component in this BitSet.
   * @var {BitSet}
   */
  this.exclude = exclude;
}

ComponentGroup.prototype = Object.create(Package.EventEmitter.prototype);
ComponentGroup.prototype.constructor = ComponentGroup;

/**
 * Checkes whether if the Entity matches its criteria.
 * @param entity {Entity} - The Entity to check.
 * @returns {Boolean} Whether if the Entity matches its criteria.
 */
ComponentGroup.prototype.matches = function(entity) {
  var compBits = entity.componentBits;
  
  if(compBits.isEmpty()) return false;
  if(!compBits.contains(this.contain)) return false;
  if(!this.intersect.isEmpty() && !this.intersect.intersects(compBits)) return false;
  if(this.exclude.intersects(compBits)) return false;
  return true;
}

/**
 * Checkes whether if the ComponentGroup equals the other.
 * The ComponentGroups are equal if they have same criteria.
 * @param o {ComponentGroup} - The other ComponentGroup.
 * @returns {Boolean} Whether if the ComponentGroups are equal.
 */
ComponentGroup.prototype.equals = function(o) {
  if(!this.contain.equals(o.contain)) return false;
  if(!this.intersect.equals(o.intersect)) return false;
  if(!this.exclude.equals(o.exclude)) return false;
  return true;
}

/**
 * Creates a Builder object that helps to make ComponentGroup object.
 * @static
 * @param engine {Engine} - The Engine which will use this ComponentGroup.
 * @returns {ComponentGroup.Builder} A Builder object.
 */
ComponentGroup.createBuilder = function(engine) {
  return new ComponentGroup.Builder(engine);
}

/**
 * This class helps to create a ComponentGroup object.
 * @constructor
 * @param engine {Engine} - The Engine which will use this object.
 */
ComponentGroup.Builder = function(engine) {
  this._engine = engine;
  this._contain = new BitSet();
  this._intersect = new BitSet();
  this._exclude = new BitSet();
}

/**
 * Resets the criteria of this object.
 * @returns {ComponentGroup.Builder} The Builder itself to make it chainable.
 */
ComponentGroup.Builder.prototype.reset = function() {
  this._contain = new BitSet();
  this._intersect = new BitSet();
  this._exclude = new BitSet();
  return this;
}

/**
 * Sets contain condition of the object.
 * @param args... {Function} - The list of component constructors.
 * @returns {ComponentGroup.Builder} The Builder itself to make it chainable.
 */
ComponentGroup.Builder.prototype.contain = function(args) {
  this._contain.or(this._engine.getComponentsBitSet(arguments));
  return this;
}

/**
 * Sets intersect condition of the object.
 * @param args... {Function} - The list of component constructors.
 * @returns {ComponentGroup.Builder} The Builder itself to make it chainable.
 */
ComponentGroup.Builder.prototype.intersect = function(args) {
  this._intersect.or(this._engine.getComponentsBitSet(arguments));
  return this;
}

/**
 * Sets exclude condition of the object.
 * @param args... {Function} - The list of component constructors.
 * @returns {ComponentGroup.Builder} The Builder itself to make it chainable.
 */
ComponentGroup.Builder.prototype.exclude = function(args) {
  this._exclude.or(this._engine.getComponentsBitSet(arguments));
  return this;
}

/**
 * Builds ComponentGroup object.
 * @returns {ComponentGroup} The CompoentGroup object.
 */
ComponentGroup.Builder.prototype.build = function() {
  return new ComponentGroup(this._contain, this._intersect, this._exclude);
}

/**
 * This event is fired to ComponentGroup when a Entity matching its criteria
 * has added to {@link Engine}.
 *
 * @event ComponentGroup#entityAdded
 * @type {Entity}
 * @see Engine
 */

/**
 * This event is fired to ComponentGroup when a Entity matching its criteria
 * has removed from {@link Engine}.
 *
 * @event ComponentGroup#entityRemoved
 * @type {Entity}
 * @see Engine
 */

if(typeof module !== 'undefined') {
  module.exports = ComponentGroup;
}
