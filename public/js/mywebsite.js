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
    if (x.style.display === "none") {
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

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}