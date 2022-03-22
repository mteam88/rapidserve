var menuObject;
var request = new XMLHttpRequest();
request.open("GET", "/public/assets/menu.json", false);
request.send(null);
if (request.status != 200) {
    menuObject = "could not recive menu";
} else {
    menuObject = JSON.parse(request.responseText);
}