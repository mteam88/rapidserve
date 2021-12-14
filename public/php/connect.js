ReadPHP();
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
    /*var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        alert(this.responseText);
      }
    };
    xmlhttp.open("GET","public/php/connect.php?action=read",true);
    xmlhttp.send();*/
    const fs = require('fs');
  
// Data which will write in a file.
let data = "Learning how toeddw.";  
  
// Write data in 'Output.txt' .
fs.writeFile('public/php/storage.txt', data, (err) => {
      
    // In case of a error throw err.
    if (err) throw err;
});
}