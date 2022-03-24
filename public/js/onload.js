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
var loopAmountLoad = 0;
for (let [key, value] of Object.entries(menuObject)) {
    if (value.length + 1 > loopAmountLoad) {
      loopAmountLoad = value.length + 1;
    }
}
for (var j = 0;j < loopAmountLoad;j++) {
    if (j == 0) {
        continue;
    }
    for (var [key, value] of Object.entries(menuObject)) {
        if (value.length >= j) {
            menuObjectCode.push(value[j - 1]);
        }
    }
}