function hidehlp() {
    var x = document.getElementById("hlptxt");
    x.style.display = "none";
    }

function toghlp() {
    var x = document.getElementById("hlptxt");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
    }