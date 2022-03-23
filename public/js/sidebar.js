window.setInterval(CheckIfHovering, 10);
var overlay = document.createElement("div");
overlay.id = "overlay";
overlay.classList.add("overlay");
document.body.appendChild(overlay);

function CheckIfHovering() {
    var fullStyles = window.getComputedStyle(document.getElementById("sidebar"));
    overlay.style.backgroundColor = "rgba(0, 0, 0, " + (0.4 / 225 * (Number(fullStyles.getPropertyValue("width").replace("px","")) - 74)) + ")";
}