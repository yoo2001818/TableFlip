var Engine = require('./Engine');
var ComponentGroup = require('./ComponentGroup');
var Turn = require('./Turn');

/**
 * 턴 기반 멀티플레이어 게임 엔진
 * Player, Action으로 정보 저장 및 교환함
 * Player 객체도 Entity로써 저장됨.
 * 플레이어 컴포넌트를 등록시 같이 지정함
 */
 
/**
 * 게임의 모든 플레이어가 한 턴씩 가질때를 '시퀀스'라고 부름.
 *
 * 턴
 * player - 해당 턴의 플레이어 객체
 * id - 턴 ID
 * seqId - 시퀀스 ID
 */
 
/**
 * Represents an turn based game engine.
 * It's like a normal ECS with Action and Turn.
 * @constructor
 * @extends Engine
 * @param {Boolean} [isServer=false] - Whether if it's a server or not
 * @see Action
 * @see Turn
 */
function TurnEngine(isServer) {
  Engine.call(this);
  /**
   * A boolean contains whether if it's a server or not.
   * @var {Boolean}
   */
  this.isServer = isServer || false;
  /**
   * An array holding all the {@link Turn} used in the game.
   * @var {Array}
   * @see Turn
   */
  this.turns = [];
  /**
   * An arraying holding all the player {@link Entity} in the game.
   * @var {Array}
   * @see Entity
   */
  this.players = this.getEntitiesFor('player');
  this._actions = {};
}

TurnEngine.prototype = Object.create(Engine.prototype);
TurnEngine.prototype.constructor = TurnEngine;

/**
 * Returns current Turn object.
 * It'll call {@link TurnEngine#nextTurn} if the game hasn't started yet.
 * @returns {Turn} The current Turn
 */
TurnEngine.prototype.getTurn = function() {
  if(this.turns.length == 0) {
    return this.nextTurn();
  }
  return this.turns[this.turns.length-1];
}

/**
 * Finishes the current Turn and starts next Turn.
 * @returns {Turn} The current Turn
 * @throws If there are no players in the game
 * @fires TurnEngine#gameInit
 * @fires TurnEngine#sequenceNext
 * @fires TurnEngine#turnNext
 */
TurnEngine.prototype.nextTurn = function() {
  this.sortSystems();
  if(this.turns.length == 0) {
    if(this.players[0] == null) {
      throw new Error('There should be at least one player in the game');
    }
    var turn = new Turn(0, 0, 0, this.players[0]);
    this.turns.push(turn);
    /**
     * This event is fired when the game starts.
     *
     * @event TurnEngine#gameInit
     * @type {Turn}
     */
    this.emit('gameInit', turn);
    /**
     * This event is fired when the sequence changes.
     *
     * @event TurnEngine#sequenceNext
     * @type {Turn}
     */
    this.emit('sequenceNext', turn);
    /**
     * This event is fired when the turn changes.
     *
     * @event TurnEngine#turnNext
     * @type {Turn}
     */
    this.emit('turnNext', turn);
    this.systems.forEach(function(system) {
      if(system.onInit) {
        system.onInit(turn);
      }
    });
    this.systems.forEach(function(system) {
      if(system.onSequence) {
        system.onSequence(turn);
      }
    });
    this.systems.forEach(function(system) {
      if(system.onTurn) {
        system.onTurn(turn);
      }
    });
    return turn;
  }
  // 원래 있던 턴 객체의 플레이어 인덱스 + 1
  var prevTurn = this.getTurn();
  var seqId = prevTurn.seqId;
  var id = prevTurn.id;
  var order = this.players.indexOf(prevTurn.player) + 1;
  if(order >= this.players.length) {
    seqId ++;
    order = 0;
  }
  var turn = new Turn(id + 1, order, seqId, this.players[order]);
  this.turns.push(turn);
  if(order == 0) {
    this.emit('sequenceNext', turn);
    this.systems.forEach(function(system) {
      if(system.onSequence) {
        system.onSequence(turn);
      }
    });
  }
  this.emit('turnNext', turn);
  this.systems.forEach(function(system) {
    if(system.onTurn) {
      system.onTurn(turn);
    }
  });
  return turn;
}

/* 
- Define Action in Engine
    engine.a('add', action)
- Create Action
    engine.a('add', player, entity, options)
- Run Action
    engine.a(action)
 */

TurnEngine.prototype.a = function(name, player, entity, options) {
  if(typeof name !== 'string') {
    return this.runAction(name);
  }
  if(arguments.length == 2) return this.defineAction(name, player);
  return this.createAction(name, player, entity, options);
}

TurnEngine.prototype.defineAction = function(name, constructor) {
  this._actions[name] = constructor;
}

TurnEngine.prototype.getActionConstructor = function(name) {
  return this._actions[name];
}

TurnEngine.prototype.createAction = function(name, player, entity, options) {
  return new (this.getActionConstructor(name))(player, entity, options);
}

/**
 * Runs the Action.
 * Action shouldn't have run yet if {@link TurnEngine#isServer} is true,
 * but it should have run on server and have {@link Action#result} if not.
 * @param action {Action} - The Action to run.
 * @fires TurnEngine#action
 * @fires TurnEngine#preAction
 */
TurnEngine.prototype.runAction = function(action) {
  if(this.isServer) {
    if(action.result) {
      throw new Error('Action has already run');
    }
  } else {
    if(!action.result) {
      throw new Error('Action hasn\'t run on server yet');
    }
  }
  var turn = this.getTurn();
  /**
   * This event is fired before the action executes.
   * @event TurnEngine#preAction
   * @property {Turn} 0 - The current Turn.
   * @property {Action} 1 - The Action object.
   */
  this.emit('preAction', turn, action);
  this.systems.forEach(function(system) {
    if(system.onPreAction) {
      system.onPreAction(turn, action);
    }
  });
  turn.addAction(action);
  action.run(engine);
  /**
   * This event is fired when the action executes.
   * @event TurnEngine#action
   * @property {Turn} 0 - The current Turn.
   * @property {Action} 1 - The Action object.
   */
  this.emit('action', turn, action);
  this.systems.forEach(function(system) {
    if(system.onAction) {
      system.onAction(turn, action);
    }
  });
  return action.result;
}

if(typeof module !== 'undefined') {
  module.exports = TurnEngine;
}
