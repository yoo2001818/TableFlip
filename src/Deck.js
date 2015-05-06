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

if(typeof module != 'undefined') {
  module.exports = Deck;
}
