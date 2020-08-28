// BUSINESS LOGIC //
// Pizza Object

function Pizza() {
  this.size;
  this.toppings = [];
  this.price = 0;
}

Pizza.prototype.addSize = function(size) {
  this.size = size;
  switch(size) {
    case "small":
      this.price = 10.75;
      break;
    case "medium":
      this.price = 14;
      break;
    case "large":
      this.price = 16.75;
      break;
    case "x-large":
      this.price = 22;
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
        this.price = this.price + 2;
      }
    }
  }
}

// Order Object

function Order() {
  this.pizzas = [];
  this.totalPrice = 0;
}

Order.prototype.addPizza = function(pizza) {
  this.pizzas.push(pizza);
  this.totalPrice = this.totalPrice + pizza.price;
}

// Global Variables

let customerOrder = new Order();

// functions

function displayPizzaDetails(orderToDisplay) {

}

// USER INTERFACE //

$(document).ready(function() {
  $("form#pizza-order").submit(function(event) {
    event.preventDefault();
    const userName = $("input#user-name").val();
    const pizzaSize = $("select#pizza-size").val();
    let thePizza = new Pizza();

    thePizza.addSize(pizzaSize);
    thePizza.addToppings();
    customerOrder.addPizza(thePizza);

    $("select#pizza-size").val("");
    $("input:checkbox").prop("checked", false);

    let orderTotal = customerOrder.totalPrice;
    $("#recipt").show();
    $("#name").text(userName);
    $("#order-total").text(orderTotal);
  });
});