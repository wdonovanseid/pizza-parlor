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
  this.currentId = 0;
  this.totalPrice = 0;
}

Order.prototype.addPizza = function(pizza) {
  pizza.id = this.assignId();
  this.pizzas.push(pizza);
  this.totalPrice = this.totalPrice + pizza.price;
}

Order.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

Order.prototype.findPizza = function(id) {
  for (let i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        return this.pizzas[i];
      }
    }
  };
  return false;
}

Order.prototype.deletePizza = function(id) {
  for (let i=0; i< this.pizzas.length; i++) {
    if (this.pizzas[i]) {
      if (this.pizzas[i].id == id) {
        this.totalPrice = this.totalPrice - this.pizzas[i].price;
        delete this.pizzas[i];
        return true;
      }
    }
  };
  return false;
}

// Global Variables

let customerOrder = new Order();

// Display and Listener Functions

function displayPizzaDetails(orderToDisplay) {
  let pizzasList = $("ul#pizzas");
  let htmlForPizzaInfo = "";
  orderToDisplay.pizzas.forEach(function(pizza) {
    htmlForPizzaInfo += "<li id=" + pizza.id + ">" + pizza.size.toUpperCase() + " PIZZA $ " + pizza.price + "</li>";
  });
  pizzasList.html(htmlForPizzaInfo);
}

function showPizza(pizzaId) {
  const pizza = customerOrder.findPizza(pizzaId);
  let htmlForPizzaToppings = "";
  $("#show-pizza").toggle();
  $(".pizza-size").html(pizza.size);
  pizza.toppings.forEach(function(topping) {
    htmlForPizzaToppings += topping + ", ";
  });
  $(".pizza-toppings").html(htmlForPizzaToppings);
  let buttons = $("#deleteButtons");
  buttons.empty();
  buttons.append("<button class='btn btn-primary' id=" + pizza.id + ">Delete Order</button>");
}

function attachPizzaListeners() {
  $("ul#pizzas").on("click", "li", function() {
    showPizza(this.id);
  });
  $("#deleteButtons").on("click", ".btn", function() {
    customerOrder.deletePizza(this.id);
    $("#show-pizza").hide();
    let orderTotal = customerOrder.totalPrice.toFixed(2);
    $(".order-total").text(orderTotal);
    displayPizzaDetails(customerOrder);
  });
  $("#checkout").on("click", function() {
    $("#recipt").show();
  });
  $("#pickup").on("click", function() {
    $("#pickup-info").show();
    $("#delivery").hide();
  });
  $("#delivery").on("click", function() {
    $("#delivery-info").show()
    $("#pickup").hide();
  });
}

// USER INTERFACE //

$(document).ready(function() {
  attachPizzaListeners();
  $("form#pizza-order").submit(function(event) {
    event.preventDefault();
    const pizzaSize = $("select#ordered-size").val();
    let thePizza = new Pizza();

    thePizza.addSize(pizzaSize);
    thePizza.addToppings();
    customerOrder.addPizza(thePizza);

    $("select#ordered-size").val("small");
    $("input:checkbox").prop("checked", false);

    let orderTotal = customerOrder.totalPrice.toFixed(2);
    
    $(".order-total").text(orderTotal);
    $("#pizza-list").show()
    displayPizzaDetails(customerOrder);
  });
  $("form#megadeath-pizza").submit(function(event) {
    event.preventDefault();
    const pizzaSize = $("select#megadeath-size").val();
    let megadeathPizza = new Pizza();

    megadeathPizza.addSize(pizzaSize);
    megadeathPizza.size = "megadeath " + pizzaSize;
    megadeathPizza.price += 20;
    customerOrder.addPizza(megadeathPizza);

    $("select#megadeath-size").val("small");

    let orderTotal = customerOrder.totalPrice.toFixed(2);

    $(".order-total").text(orderTotal);
    $("#pizza-list").show()
    displayPizzaDetails(customerOrder);
  });
  $("form#delivery-survey").submit(function(event) {
    event.preventDefault();
    const userName = $("input#input-name").val();
    const userAddress = $("input#input-address").val();
    $("#user-name").text(userName);
    $("#user-address").text(userAddress);
    $("#delivery-OTW").show();
  });
});