function Deck() {
  this.deque = [];
  this.direction = false;
}

Deck.prototype.push = function(card) {
  this.deque.push(card);
}

Deck.prototype.pop = function() {
  return this.deque.pop();
}

Deck.prototype.unshift = function(card) {
  this.deque.unshift(card);
}

Deck.prototype.shift = function() {
  return this.deque.shift();
}

Deck.prototype.reverse = function() {
  this.deque.reverse();
  this.direction = !this.direction;
}

Object.defineProperty(Deck.prototype, 'length', {
  get: function() {
    return this.deque.length;
  }
});

Deck.prototype.get = function(index) {
  return this.deque[index];
}

Deck.prototype.set = function(index, value) {
  this.deque[index] = value;
}

Deck.prototype.forEach = function(callback, thisArg) {
  this.deque.forEach(callback, thisArg);
}

function randomInt(min, max) {
  return Math.random() * (max-min) + min | 0;
}

// Fisher-Yates shuffle
Deck.prototype.shuffle = function() {
  for(var i = 0; i < this.deque.length; ++i) {
    var j = randomInt(i, this.deque.length);
    var swap = this.deque[j];
    this.deque[j] = this.deque[i];
    this.deque[i] = swap;
  }
}

Deck.prototype.slice = function(quantity, deck) {
  if(deck == null) deck = new Deck();
  for(var i = 0; i < quantity; ++i) deck.push(this.pop());
  return deck; 
}

Deck.prototype.applyIndex = function(index) {
  var newDeque = [];
  index.forEach(function(value, i) {
    newDeque[i] = this.deque[value];
  }, this);
  this.deque = newDeque;
}

Deck.createShuffleIndex = function(length) {
  var index = [];
  for(var i = 0; i < length; ++i) {
    var j = randomInt(0, i);
    if(j != i) index[i] = index[j];
    index[j] = i;
  }
  return index;
}

if(typeof module != 'undefined') {
  module.exports = Deck;
}
