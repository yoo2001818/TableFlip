var assert = require('assert');

var Engine = require('../src/Engine');
var Entity = require('../src/Entity');
var ComponentGroup = require('../src/ComponentGroup');

describe('Engine', function(){
  var engine = new Engine();
  var TestComponent = function() {
    this.value = 'default';
  }
  var entity = new Entity(engine);
  beforeEach(function(){
    engine = new Engine();
    entity = new Entity(engine);
  })
  describe('#Components', function(){
    it('should return 0 for first added component', function(){
      assert.equal(0, engine.registerComponent('test'));
    });
    it('should return null for already added component', function(){
      assert.equal(0, engine.registerComponent('test'));
      assert.equal(null, engine.registerComponent('test'));
    });
    it('should have component in engine._components[0]', function() {
      assert.equal(0, engine.registerComponent('test'));
      assert.equal('test', engine._components[0]);
    });
    it('should return 0 in getComponentBit()', function(){
      assert.equal(0, engine.getComponentBit('test'));
    });
  });
  describe('#Entities', function() {
    var testComp = new TestComponent();
    it('entity id should be 0 after addEntity()', function(){
      engine.addEntity(entity);
      assert.equal(0, entity.id);
    });
    it('should be able to get component by constructor', function(){
      entity.add('test', testComp);
      assert.equal(testComp, entity.get('test'));
    });
  });
  describe('#ComponentGroups', function(){
    beforeEach(function(){
      engine.addEntity(entity);
      var testComp = new TestComponent();
      entity.add('test', testComp);
    })
    it('getEntitiesFor(TestComponent) should return an array with an entity', function(){
      var entities = engine.getEntitiesFor('test');
      assert.equal(entity, entities[0]);
    });
    it('getEntitiesFor(ComponentGroup) should return an array with an entity', function(){
      var componentGroup = ComponentGroup.createBuilder(engine)
        .contain('test').build();
      var entities = engine.getEntitiesFor(componentGroup);
      assert.equal(entity, entities[0]);
    });
    it('Event should be called when an entity is added to ComponentGroup', function(done){
      var componentGroup = ComponentGroup.createBuilder(engine)
        .contain('test').build();
      componentGroup.on('entityAdded', function(evt) {
        assert.equal(entity, evt);
        done();
      });
      engine.getEntitiesFor(componentGroup);
    });
  });
});
