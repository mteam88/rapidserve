/*
functions to interact with sql database
*/
//var XMLHttpRequest = require('xhr2');
getOrder();
function placeOrder() {

}
function getOrder() {

    var xhr = new XMLHttpRequest();
    // we defined the xhr

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        if (this.status == 200) {
            var data = JSON.parse(this.responseText);

            alert(data);
        } else {
            alert(this.status);
        }
        // end of state change: it can be after some time (async)
    };

    xhr.open('GET', "https://3030-mteam88-rapidserver-drcw8e1dldg.ws-us32.gitpod.io/public/js/connect.js", true);
    xhr.send();
}
function editMenu() {
    
}
function getMenu() {
    
}