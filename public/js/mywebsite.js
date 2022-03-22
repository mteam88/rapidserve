function hidehlp() {
    var x = document.getElementById("hlptxt");
    x.style.display = "none";
    }

function toghlp() {
    var x = document.getElementById("hlptxt");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    }

function plcordr() {
    alert("Boring Processing Stuff...")
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