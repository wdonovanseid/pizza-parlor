// BUSINESS LOGIC //
// Pizza Stuff

function Pizza() {
  this.size = "";
  this.toppings = [];
  this.totalPrice = 0;
}

Pizza.prototype.addSize = function(size) {
  this.size.concat(size);
}

Pizza.prototype.addToppings = function() {
  let allToppings = document.forms[0];
  for (i=0; i<allToppings.length; i++) {
    if (allToppings[i].checked) {
      this.toppings.push(allToppings[i]);
      this.totalPrice = this.totalPrice + allToppings[i].val();
    }
  }
  this.toppings.push(topping);
}

// USER INTERFACE //

$(document).ready(function() {
  $("form#pizza-order").submit(function(event) {
    event.preventDefault();
    const userName = $("input#user-name").val();
    const pizzaSize = $("select#pizza-size").val();
    let 
  });
});