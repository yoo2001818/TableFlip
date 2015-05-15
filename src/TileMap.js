function TileMap(w, h) {
  this.width = w;
  this.height = h;
  this.reset();
}

TileMap.prototype.reset = function() {
  this.map = [];
  for(var y = 0; y < this.height; y++) {
    this.map[y] = [];
    for(var x = 0; x < this.width; x++) {
      this.map[y][x] = new Tile(x, y);
    } 
  }
}

function Tile(x, y) {
  this.x = x;
  this.y = y;
}

TileMap.Tile = Tile;

if(typeof module != 'undefined') {
  module.exports = TileMap;
}
