php = require("php");
function WriteToPhp() {
    var line = "hi";
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert("Done");
      }
    };
    xmlhttp.open("GET","public/php/connect.php?action=write&line="+line,true);
    xmlhttp.send();
}

function ReadPHP() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
      }
    };
    xmlhttp.open("GET","public/php/connect.php?action=read",true);
    xmlhttp.send();
}