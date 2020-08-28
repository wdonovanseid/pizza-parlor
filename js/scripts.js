function Pizza() {
  this.size = "";
  this.toppings = [];
}

Pizza.prototype.addSize = function(size) {
  this.size.concat(size);
}

Pizza.prototype.addTopping = function(topping) {
  this.toppings.push(topping);
}

