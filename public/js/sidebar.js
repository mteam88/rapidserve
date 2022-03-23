window.onload = function() {
    function SetOpacity(on) {
        if (on) {
            if (!document.getElementById("overlay")) {
                var overlay = document.createElement("div");
                overlay.id = "overlay";
                overlay.style.backgroundColor = "rgba(0, 0, 0, 0)";
                overlay.classList.add("overlay");
                document.body.appendChild(overlay);
                window.setTimeout(function() {FinishOpacity(true);}, 100);
            }
        } else {
            if (document.getElementById("overlay")) {
                window.setTimeout(function() {FinishOpacity(false);}, 100);
            }
        }
    }
    async function FinishOpacity(on) {
        var overlay = document.getElementById("overlay");
        var length = 50;
        length = 50 - (((overlay.style.backgroundColor.split(',')[3]) ? 0 : overlay.style.backgroundColor.split(',')[3]) / length);
        if (overlay) {
            if (on) {
                for (var i = 0;i < length;i++) {
                    overlay.style.backgroundColor = "rgba(0, 0, 0, " + (0.4 / length * i) + ")";
                    await sleep(1);
                }
            } else {
                for (var i = length;i > 0;i--) {
                    overlay.style.backgroundColor = "rgba(0, 0, 0, " + (0.4 / length * i) + ")";
                    await sleep(1);
                }
                if (document.getElementById("overlay")) {
                    document.getElementById("overlay").remove();
                }
            }
        }
    }
    var elements = document.getElementsByClassName("sidebar");
    var loopAmount = elements.length;
    for (var i = 0; i < loopAmount; i++) {
        elements[i].addEventListener('mouseover', function() {SetOpacity(true);}, false);
        elements[i].addEventListener('mouseout', function() {SetOpacity(false);}, false);
    }
};