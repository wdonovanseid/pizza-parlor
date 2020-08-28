// BUSINESS LOGIC //
// Pizza Stuff

function Pizza() {
  this.size;
  this.toppings = [];
  this.totalPrice = 0;
}

Pizza.prototype.addSize = function(size) {
  this.size = size;
}

Pizza.prototype.addToppings = function() {
  let allToppings = $("form input:checkbox");
  for (i=0; i<allToppings.length; i++) {
    if (allToppings[i].checked) {
      this.toppings.push(allToppings[i].value);
      this.totalPrice = this.totalPrice
    }
  }
}

// Global Variables

let thePizza = new Pizza();

// USER INTERFACE //

$(document).ready(function() {
  $("form#pizza-order").submit(function(event) {
    event.preventDefault();
    const userName = $("input#user-name").val();
    const pizzaSize = $("select#pizza-size").val();

    thePizza.addSize(pizzaSize);
    thePizza.addToppings();
  });
});