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
    var bottomofelem = document.getElementById("bottomof");
    bottomofelem.classList.add('addedclass');
    var orderstuffelem = document.getElementById("orderstuff");
    orderstuffelem.innerHTML = "<h3>Your order has been placed!</h3>";
}

//window.onresize() {
//    document.getElementById("grad").height = window.outerHeight;
//}

//window.onload() {
//    document.getElementById("grad").height = window.outerHeight;
//}

function changebg(element) {
    if (element.classList.contains("invisible")) {
        return;
    }
//    element.style.backgroundColor = (element.style.backgroundColor == "red") ? "white":"red";
//    element.style.backgroundColor = (element.style.backgroundColor == "#dddddd") ? "red":"#dddddd";
    if (element.style.backgroundColor == "red") {
        if (Number(element.parentElement.id.replace("menu-row","")) / 2 == Math.floor(Number(element.parentElement.id.replace("menu-row","")) / 2)) {
            toset = "#dddddd";
        } else {
            toset = "#fcfcfc";
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
        var orderElemObject = JSON.parse(orderElem.innerHTML.replace(/_/g,"underscore"));
        for (const [index, element] of orderElemObject.orderBody.split('').entries()) {
            if (element == 1) {
                orderFormatted += "<br>" + menuObjectCode[index];
            }
        }
        orderElem.remove();
        var orderDiv = document.createElement("div");
        orderDiv.classList.add("order-formatted");
        orderDiv.classList.add("selectable");
        orderDiv.id = "staff-order" + i;
        var orderHeader = document.createElement("h2");
        orderHeader.innerHTML = "Order " + orderNumber + "&#9660;";
        orderHeader.orderNum = orderNumber;
        orderHeader.onclick = function(event) {var thisOrderDiv = event.target.parentElement;thisOrderDiv.lastChild.hidden = !thisOrderDiv.lastChild.hidden;var orderNum = event.target.orderNum;event.target.innerHTML = "Order " + orderNum + ((thisOrderDiv.lastChild.hidden) ? "&#9660;" : "&#9650;");};
        orderDiv.appendChild(orderHeader);
        var button = document.createElement("p");
        button.innerHTML = "delete";
        button.orderId = orderElemObject.underscoreid;
        button.orderNum = i;
        button.onclick = function(event) {deleteOrderById(event.target.orderId);document.getElementById("staff-order" + event.target.orderNum).remove();};
        orderDiv.appendChild(button);
        var order = document.createElement("p");
        order.innerHTML = orderFormatted.replace("<br>","");
        order.hidden = true;
        orderDiv.appendChild(order);

        document.getElementById("formattedOrders").appendChild(orderDiv);
        orderNumber += 1;
    }
}

function deleteOrderById(id) {
    var endpoint = `/staff/${id}`;
    fetch(endpoint, {
        method: 'DELETE',
    })
        .then((result) => {
            console.log(result);
        })
        .catch((err) => {
            console.warn(err);
        })
}