function Card(id) {
  this.id = id;
  this.direction = false; 
}

Card.prototype.reverse = function() {
  this.direction = !this.direction;
}

if(typeof module != 'undefined') {
  module.exports = Card;
}
