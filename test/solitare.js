/**
 * Test implementation of solitare.
 */

var Card = require('../src/Card');
var Deck = require('../src/Deck');
var TrumpCard = require('./TrumpCard');

var initialDeck = new Deck();

var decks = [];

/*
 * A trump card set has
 * - Hearts set of K ... A
 * - Diamonds set of K ... A
 * - Clubs set of K ... A
 * - Spades set of K ... A
 */

for(var i = 0; i < 52; ++i) {
  initialDeck.push(new TrumpCard(i));
}

initialDeck.shuffle();

console.log(initialDeck.deque);

console.log(initialDeck.length);

for(var i = 1; i <= 8; ++i) {
  var deck = new Deck();
  for(var j = 0; j < i; ++j) {
    var card = initialDeck.pop();
    deck.push(card);
    // Only top card is visible
    if(j < i-1) card.reverse();
  }
  decks[i-1] = deck;
}

console.log(decks[7]);
