async function hidehlp() {
    var x = document.getElementById("hlptxt");
    var scale = (300) / 10;
    for (var i = scale;i > 0;i--) {
        x.style.width = i * 10 + "px";
        x.style.height = i * 10 + "px";
        await sleep(1);
    }
    x.style.display = "none";
}

async function toghlp() {
    var x = document.getElementById("hlptxt");
    var scale = (300) / 10;
    if (x.style.display === "none" || !x.style.display) {
        x.style.display = "block";
        for (var i = 0;i < scale;i++) {
            x.style.width = i * 10 + "px";
            x.style.height = i * 10 + "px";
            await sleep(1);
        }
    } else {
        for (var i = scale;i > 0;i--) {
            x.style.width = i * 10 + "px";
            x.style.height = i * 10 + "px";
            await sleep(1);
        }
        x.style.display = "none";
    }
}

function plcordr() {
    //alert("Boring Processing Stuff...")
    var bottomofelem = document.getElementById("bottomof")
    bottomofelem.classList.add('addedclass');
    var orderstuffelem = document.getElementById("orderstuff")
    orderstuffelem.innerHTML = "<h3>Your order has been placed!</h3>"
}

//window.onresize() {
//    document.getElementById("grad").height = window.outerHeight;
//}

//window.onload() {
//    document.getElementById("grad").height = window.outerHeight;
//}

function changebg(element) {
//    element.style.backgroundColor = (element.style.backgroundColor == "red") ? "white":"red";
//    element.style.backgroundColor = (element.style.backgroundColor == "#dddddd") ? "red":"#dddddd";
    if (element.style.backgroundColor == "red") {
        if (Number(element.parentElement.id.replace("menu-row","")) / 2 == Math.floor(Number(element.parentElement.id.replace("menu-row","")) / 2)) {
            toset = "#dddddd";
        } else {
            toset = "white";
        }
    } else {
        toset = "red";
    }
    element.style.backgroundColor = toset;
//    alert(element.id);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function formatOrders() {
    var orderNumber = 1;
    var orderElems = document.getElementsByClassName("order-unformatted");
    var orderElem;
    var loopAmount = orderElems.length;
    for (var i = 0;i < loopAmount;i++) {
        orderElem = orderElems[0];
        var orderFormatted = "";
        for (const [index, element] of orderElem.innerHTML.split('').entries()) {
            if (element == 1) {
                orderFormatted += "<br>" + menuObjectCode[index];
            }
        }
        orderElem.innerHTML = orderFormatted.replace("<br>", "");
        var idtemp = orderElem.dataset.orderId
        alert(idtemp);
        orderElem.remove();
        var orderDiv = document.createElement("div");
        orderDiv.classList.add("order-formatted");
        orderDiv.classList.add("selectable");
        var orderHeader = document.createElement("h2");
        orderHeader.innerHTML = "Order " + orderNumber + "&#9660;";
        orderHeader.orderNum = orderNumber;
        orderDiv.dataset.orderId = idtemp;
        alert(orderDiv.dataset.orderId);
        orderHeader.onclick = function(event) {var thisOrderDiv = event.target.parentElement;thisOrderDiv.lastChild.hidden = !thisOrderDiv.lastChild.hidden;var orderNum = event.target.orderNum;event.target.innerHTML = "Order " + orderNum + ((thisOrderDiv.lastChild.hidden) ? "&#9660;" : "&#9650;");};
        orderDiv.appendChild(orderHeader);
        var order = document.createElement("p");
        order.innerHTML = orderFormatted.replace("<br>","");
        order.hidden = true;
        orderDiv.appendChild(order);
        var button = document.createElement("button");
        button.value = "delete";
        button.onclick = function(event) {};
        orderDiv.appendChild(button);

        document.getElementById("formattedOrders").appendChild(orderDiv);
        orderNumber += 1;
    }
}