function Deck() {
  this.deque = [];
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
}

Deck.prototype.size = function() {
  return this.deque.length;
}

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
  for(var i = 0; i < this.deque.length-1; ++i) {
    var j = randomInt(i, this.deque.length);
    var swap = this.deque[j];
    this.deque[j] = this.deque[i];
    this.deque[i] = swap;
  }
}

if(typeof module != 'undefined') {
  module.exports = Deck;
}
