// BUSINESS LOGIC //
// Pizza Object

function Pizza() {
  this.size;
  this.toppings = [];
  this.totalPrice = 0;
}

Pizza.prototype.addSize = function(size) {
  this.size = size;
  switch(size) {
    case "small":
      this.totalPrice = 10.75;
      break;
    case "medium":
      this.totalPrice = 14;
      break;
    case "large":
      this.totalPrice = 16.75;
      break;
    case "x-large":
      this.totalPrice = 22;
  }
}

Pizza.prototype.addToppings = function() {
  let allToppings = $("form input:checkbox");
  let totalToppings = 0;
  for (i=0; i<allToppings.length; i++) {
    if (allToppings[i].checked) {
      this.toppings.push(allToppings[i].value);
      totalToppings += 1;
      if (totalToppings > 2) {
        this.totalPrice = this.totalPrice + 2;
      }
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

    let orderTotal = thePizza.totalPrice;
    $("#recipt").show();
    $("#name").text(userName);
    $("#order-total").text(orderTotal);
  });
});