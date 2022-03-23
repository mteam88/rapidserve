window.setInterval(CheckIfHovering, 10);
var overlay = document.createElement("div");
overlay.id = "overlay";
overlay.classList.add("overlay");
document.body.appendChild(overlay);
var checkIfLoaded = window.setInterval(CheckIfLoaded, 100);

function CheckIfHovering() {
    var fullStyles = window.getComputedStyle(document.getElementById("sidebar"));
    overlay.style.backgroundColor = "rgba(0, 0, 0, " + (0.7 / 175 * (Number(fullStyles.getPropertyValue("width").replace("px","")) - 74)) + ")";
}

function CheckIfLoaded() {
    if (document.getElementById("sidebar")) {
        var sidebarButtons = document.getElementsByClassName("sidebar-button");
        var loopAmount = sidebarButtons.length;
        for (var i = 0;i < loopAmount;i++) {
            sidebarButtons[i].addEventListener("click", ChangePage, false);
            sidebarButtons[i].page = sidebarButtons[i].lastChild.innerHTML;
        }
        window.clearInterval(checkIfLoaded);
    }
}

function ChangePage(event) {
    var page = event.currentTarget.page;
    var newPageURL = "pages/" + page + ".ejs";
    newPageURL = "/views/pages/tesdt.txt";
    if (fileExists(newPageURL)) {
        alert("exists");
    } else {
        alert("does not exist");
    }
}

function fileExists(url) {
    if(url) {
        var req = new XMLHttpRequest();
        req.open('GET', url, false);
        req.send(null);
        var exists = (request.responseText);
        return exists;
    } else {
        return false;
    }
}