/**
 * Test implementation of solitare.
 */

var Card = require('../src/Card');
var Deck = require('../src/Deck');

var initialDeck = new Deck();

var decks = [];

/*
 * A trump card set has
 * - Hearts set of K ... A
 * - Diamonds set of K ... A
 * - Clubs set of K ... A
 * - Spades set of K ... A
 */

var numbers = ['K', 'Q', 'J', '10', '9', '8', '7', '6', '5', '4', '3', '2', 'A'].reverse();
var types = ['hearts', 'diamonds', 'clubs', 'spades'];

types.forEach(function(type, typeIndex) {
  numbers.forEach(function(number, index) {
    initialDeck.push(new Card({
      number: index,
      type: typeIndex
    }));
  });
});

initialDeck.shuffle();

console.log(initialDeck.deque);

console.log(initialDeck.size());

for(var i = 1; i <= 8; ++i) {
  var deck = new Deck();
  for(var j = 0; j < i; ++j) {
    deck.push(initialDeck.pop());
  }
  decks[i] = deck;
}

console.log(initialDeck.deque);
