/**
 * Test implementation of solitare.
 */

var Card = require('../src/Card');
var Deck = require('../src/Deck');
var TrumpCard = require('./TrumpCard');

var initialDeck = TrumpCard.createDeck();

var decks = [];

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
