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
    var orderstuffelem = document.getElementById("orderstuff")
    orderstuffelem.innerHTML = "<h3>Your order has been placed!</h3>"
    }

//window.onresize() {
//    document.getElementById("grad").height = window.outerHeight;
//}

//window.onload() {
//    document.getElementById("grad").height = window.outerHeight;
//}