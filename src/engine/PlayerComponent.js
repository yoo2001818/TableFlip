/**
 * Represents a player in the game.
 * This is basic implementation, You can change the player component from
 * {@link TurnEngine}.
 * @constructor
 * @extends Component
 * @param id {Number} - The player's ID
 * @param name {String} - The player's name
 */
function PlayerComponent(id, name) {
  /**
   * The player's ID.
   * @var {Number}
   */
  this.id = id;
  /**
   * The player's name.
   * @var {String}
   */
  this.name = name;
}

PlayerComponent.create = function(options) {
  return new PlayerComponent(options.id, options.name);
}

Package.components.PlayerComponent = PlayerComponent;
