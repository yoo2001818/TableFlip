function Deck() {
  this.deque = [];
  this.direction = false;
}

Deck.prototype = {
  push: function(card) {
    this.deque.push(card);
  },

  pop: function() {
    return this.deque.pop();
  },

  unshift: function(card) {
    this.deque.unshift(card);
  },

  shift: function() {
    return this.deque.shift();
  },

  reverse: function() {
    this.deque.reverse();
    this.direction = !this.direction;
  },

  get length() {
    return this.deque.length;
  },

  get: function(index) {
    return this.deque[index];
  },

  set: function(index, value) {
    this.deque[index] = value;
  },

  forEach: function(callback, thisArg) {
    this.deque.forEach(callback, thisArg);
  },
  // Fisher-Yates shuffle
  shuffle: function() {
    for(var i = 0; i < this.deque.length-1; ++i) {
      var j = randomInt(i, this.deque.length);
      var swap = this.deque[j];
      this.deque[j] = this.deque[i];
      this.deque[i] = swap;
    }
  }
};

function randomInt(min, max) {
  return Math.random() * (max-min) + min | 0;
}

if(typeof module != 'undefined') {
  module.exports = Deck;
}
