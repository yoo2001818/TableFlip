var Card = require('../src/Card');

var CARD_NUMBERS = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
var CARD_TYPES = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];

/*
 * A trump card set has
 * - Hearts set of K ... A
 * - Diamonds set of K ... A
 * - Clubs set of K ... A
 * - Spades set of K ... A
 * - 2 Jokers
 */

/**
 * Represents a single trump card.
 */
var TrumpCard = function(id) {
  if(typeof id != 'number') throw new Error('TrumpCard ID should be a number');
  if(id < 0 || id > 52) throw new Error('TrumpCard ID should be between 0 and 52');
  this.id = id|0;
}

TrumpCard.prototype = Object.create(Card.prototype, {
  number: {
    get: function() {
      return CARD_NUMBERS[this.id%CARD_NUMBERS.length];
    }
  },
  
  numberRaw: {
    get: function() {
      return this.id%CARD_NUMBERS.length;
    }
  },
  
  type: {
    get: function() {
      return CARD_TYPES[this.id/CARD_NUMBERS.length|0];
    }
  },
  
  typeRaw: {
    get: function() {
      return this.id/CARD_NUMBERS.length|0;
    }
  }
});

TrumpCard.prototype.toString = function() {
  return this.type + ' ' + this.number + (this.direction ? ' (Fliped)': '');
}

TrumpCard.prototype.inspect = function() {
  return this.toString();
}
TrumpCard.prototype.constructor = TrumpCard;

module.exports = TrumpCard;
