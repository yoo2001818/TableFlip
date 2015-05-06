function Card() {
  this.type = type;
  this.direction = false; 
}

Card.prototype.flip = function() {
  this.direction = !this.direction;
}

if(typeof module != 'undefined') {
  module.exports = Card;
}
