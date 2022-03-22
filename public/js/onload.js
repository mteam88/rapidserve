var menu;
var request = new XMLHttpRequest();
request.open("GET", "/public/assets/menu.json", false);
request.send(null);
if (request.status != 200) {
    menu = "could not recive menu";
} else {
    menu = JSON.parse(request.responseText);
}