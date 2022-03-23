var menuObject;
var menuObjectCode = [];
var request = new XMLHttpRequest();
request.open("GET", "/public/assets/menu.json", false);
request.send(null);
if (request.status != 200) {
    menuObject = "could not recive menu";
} else {
    menuObject = JSON.parse(request.responseText);
}
var loopAmount = 0;
for (var [key, value] of Object.entries(menuObject)) {
    if (value.length + 1 > loopAmount) {
      loopAmount = value.length + 1;
    }
}
for (var i = 0;i < loopAmount;i++) {
    if (i == 0) {
        continue;
    }
    for (var [key, value] of Object.entries(menuObject)) {
        if (value.length >= i) {
            menuObjectCode.push(value[i - 1]);
        }
    }
}