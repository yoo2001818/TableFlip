/**
 * Test implementation of solitare /w TurnEngine.
 */

var Card = require('../src/Card');
var Deck = require('../src/Deck');
var TrumpCard = require('./TrumpCard');

var TurnEngine = require('../src/TurnEngine');
var Entity = require('../src/Entity');
var Action = require('../src/Action');

var PlayerComponent = require('../src/PlayerComponent');

// Create engine and add Components
var engine = new TurnEngine(true);
engine.c('player', PlayerComponent);
engine.c('deck', (function() {
  function DeckComponent(args) {
    this.deck = args;
  }
  return DeckComponent;
})());

// Add actions
engine.a('createDeck', Action.scaffold(function(engine) {
  var entity = engine.e().c('deck', TrumpCard.createDeck());
  this.result = entity.id;
}));

// Add systems
engine.s('deck').init(function(turn, engine) {
    if(!engine.isServer) return;
    console.log(engine.e(engine.aa('createDeck')).c('deck'));
  }).done();

// Add Player entities
engine.e().c('player', {id: 0, name: 'Test 1'});
engine.e().c('player', {id: 1, name: 'Test 2'});
engine.e().c('player', {id: 2, name: 'Test 3'});

// Turns test
for(var i = 0; i < 10; ++i) {
  var turn = engine.nextTurn();
  console.log('Seq', turn.seqId, 'Turn', turn.order, '(#'+turn.id+')');
  console.log(turn.player.get('player').name);
}
