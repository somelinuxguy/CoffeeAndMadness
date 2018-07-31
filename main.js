// initialize: check localStorage for saved order.
// load saved orders in to the array.
// populate the page.
// accept new orders:
//      save order to array, push array to localStorage

var loadOrders = function() {
    console.log('loading saved orders...');
    return JSON.parse(localStorage.getItem('coffee-orders'));
}

var saveOrder = function(orderList) {
    console.log("Saving orders to disk.");
    localStorage.setItem('coffee-orders', JSON.stringify(orderList));
}

var clearDisplay = function() {
    var container = document.querySelector(".currentOrders");
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
}

var populateOrderPage = function(orderList) {
    var container = document.querySelector(".currentOrders");
    // nuke currentOrders div
    clearDisplay();
    // write the orders in to the new currentOrders div (named container)
    orderList.forEach(function(order) {
        console.log("Adding order to page: " + order.name);
        var orderDIV = document.createElement('div');
        var orderP = document.createElement('p');
        orderDIV.classList.add('order');
        const templateStr = `Name: ${order.name} Location: ${order.location} Brain: ${order.size} Adulterants: ${order.adulterant} Sacrifices: ${order.cultists}`;
        orderP.textContent = templateStr;
        orderDIV.appendChild(orderP);
        container.appendChild(orderDIV);
        // remove order event handler
        var removeOrder = function(event) {
            console.log('remove item: ' + order);
            // this doesnt find the position of the order.name KEY in the array.
            var index = orderList.indexOf(order);
            if (index !== -1) {
                orderList.splice(index, 1);
            };
            // therefore - remove order from orderList
            saveOrder(orderList);
            populateOrderPage(orderList);
        };
        orderDIV.addEventListener('click',removeOrder);
    });
}

var newOrder = function(event) {
    event.preventDefault();
    console.log('New Order In.');
    var myName = document.querySelector('[name="myName"]');
    var myLocation = document.querySelector('[name="myLocation"]');
    var mySize = document.querySelector('[name="size"]:checked');
    var myAdulterant = document.querySelector('[name="state"]');
    var myCultists = document.querySelector('[name="numberOfCultists"]');
    var orderInfo = {
        name: myName.value,
        location: myLocation.value,
        size: mySize.value,
        adulterant: myAdulterant.value,
        cultists: myCultists.value,
        };
    orderList.push(orderInfo);
    saveOrder(orderList);
    populateOrderPage(orderList);
}
// -- main -- //
var myForm = document.querySelector(".formBox");
var orderList = loadOrders();
if (orderList == null) {
    orderList = [];
}
else {
    populateOrderPage(orderList);
}

myForm.addEventListener('submit', newOrder);