// Use this how you may Cedric. Test run it with `node /workspace/rapidservehtml/public/js/connect.js`

const xhttp = new XMLHttpRequest();

// Define a callback function
xhttp.onload = function() {
  console.log(this.responseText);
}

// Send a request
xhttp.open("get", "https://3030-mteam88-rapidserver-3phd7aoe8mi.ws-us27.gitpod.io/public/js/connect.js");
xhttp.send();