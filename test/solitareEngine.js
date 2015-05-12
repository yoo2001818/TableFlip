/**
 * Test implementation of solitare /w TurnEngine.
 */

var Card = require('../src/Card');
var Deck = require('../src/Deck');
var TrumpCard = require('./TrumpCard');

var TurnEngine = require('../src/TurnEngine');
var Entity = require('../src/Entity');

var PlayerComponent = require('../src/PlayerComponent');

// Create engine and add Components
var engine = new TurnEngine(true);
engine.c('player', PlayerComponent);

// Add systems
engine.s('player').init(function() {
    console.log(engine.e('player').map(function(entity) {
      return entity.c('player').name;
    }));
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
