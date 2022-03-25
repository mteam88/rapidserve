var table = document.getElementById("menu-table");
var menuCheckStaff = window.setInterval(CreateMenuStaff, 100);
  
function CreateMenuStaff() {
    table.innerHTML = "";
    if (menuObject) {
        clearInterval(menuCheckStaff);
        var loopAmount = 0;
        var tableRow = document.createElement("tr");
        tableRow.id = "menu-row0";
        var k = 0;
        for (var [key, value] of Object.entries(menuObject)) {
            if (value.length + 1 > loopAmount) {
                loopAmount = value.length + 1;
            }
            var rowCell = document.createElement("th");
            rowCell.xCell = k;
            rowCell.yCell = 0;
            rowCell.classList.add("staffMenuHeaderCell");
            rowCell.innerHTML = key.replace(/_/g," ");
            tableRow.appendChild(rowCell);
            k += 1;
        }
        var x = tableRow.length;
        var rowCell = tableRow.insertCell(x);
        rowCell.xCell = x;
        rowCell.yCell = 0;
        rowCell.classList.add("staffMenuAddColumnCell");
        rowCell.classList.add("invisible");
        table.appendChild(tableRow);
        for (var i = 0;i < loopAmount + 1;i++) {
            if (i == 0) {
                continue;
            }
            var tableRow = document.createElement("tr");
            tableRow.id = "menu-row" + i;
            var k = 0;
            for (var [key, value] of Object.entries(menuObject)) {
                var rowCell = document.createElement("td");
                rowCell.classList.add("invisible");
                rowCell.xCell = k;
                rowCell.yCell = i;
                if (value.length >= i) {
                    rowCell.classList.add("staffMenuRowCell");
                    rowCell.classList.remove("invisible");
                    rowCell.innerHTML = value[i - 1];
                } else if (value.length == i - 1) {
                    rowCell.classList.add("staffMenuAddRowCell");
                }
                tableRow.appendChild(rowCell);
                k += 1;
            }
            var x = tableRow.length;
            var rowCell = tableRow.insertCell(x);
            rowCell.classList.add("invisible");
            rowCell.xCell = x;
            rowCell.yCell = i;
            table.appendChild(tableRow);
        }
        table.rows[table.rows.length - 1].hidden = true;
        var loopAmount = table.rows.length;
        for (var i = 0;i < loopAmount;i++) {
            table.rows[i].cells[table.rows[i].cells.length - 1].hidden = true;
        }
    }
}

function EditMenu() {
    document.getElementById("editMenuButton").hidden = true;
    document.getElementById("discardMenuButton").hidden = false;
    document.getElementById("saveMenuButton").hidden = false;
    var addRowCells = document.getElementsByClassName("staffMenuAddRowCell");
    var loopAmount = addRowCells.length;
        for (var i = 0;i < loopAmount;i++) {
            var addRowCell = addRowCells[i];
            addRowCell.classList.add("selectable");
            addRowCell.classList.remove("invisible");
            addRowCell.innerHTML = "<b>+</b>";
            addRowCell.onmousedown = function(event) {AddCell(this.xCell, this.yCell);};
        }
        var addColumnCells = document.getElementsByClassName("staffMenuAddColumnCell");
        var loopAmount = addColumnCells.length;
        for (var i = 0;i < loopAmount;i++) {
            var addColumnCell = addColumnCells[i];
            addColumnCell.classList.add("selectable");
            addColumnCell.classList.remove("invisible");
            if (i == 0) {
                addColumnCell.innerHTML = "<b>+</b>";
                addColumnCell.onmousedown = function(event) {AddColumn();};
            }
        }
        var rowCells = document.getElementsByClassName("staffMenuRowCell");
        var loopAmount = rowCells.length;
        for (var i = 0;i < loopAmount;i++) {
            rowCells[i].innerHTML = "<input type='text' placeholder='Input order' value='" + rowCells[i].innerHTML.replace('<span style="color: red"><i>empty</i></span>',"") + "'/><span onclick='RemoveCell(this.parentElement.xCell, this.parentElement.yCell);' class='removeButton'>Remove</span>";
        }
        var headerCells = document.getElementsByClassName("staffMenuHeaderCell");
        var loopAmount = headerCells.length;
        for (var i = 0;i < loopAmount;i++) {
            headerCells[i].innerHTML = "<input type='text' placeholder='Input order' value='" + headerCells[i].innerHTML.replace('<span style="color: red"><i>empty</i></span>',"") + "'/><span onclick='RemoveColumn(this.parentElement.xCell);' class='removeButton'>Remove</span>";
        }
        table.rows[table.rows.length - 1].hidden = false;
        var loopAmount = table.rows.length;
        for (var i = 0;i < loopAmount;i++) {
            table.rows[i].cells[table.rows[i].cells.length - 1].hidden = false;
          }
        }

        function DiscardMenu() {
          document.getElementById("editMenuButton").hidden = false;
          document.getElementById("discardMenuButton").hidden = true;
          document.getElementById("saveMenuButton").hidden = true;
          CreateMenuStaff();
        }

        function SaveMenu() {
          var sectionNamesTaken = [];
          var headerCells = document.getElementsByClassName("staffMenuHeaderCell");
          var loopAmount = headerCells.length;
          for (var i = 0;i < loopAmount;i++) {
            var headerCell = headerCells[i];
            if (headerCell.firstChild.value == "") {
              document.getElementById("error-text").innerHTML = "You have a section with no name (Section: " + (i + 1) + ")";
              return;
            } else if (sectionNamesTaken.includes(headerCell.firstChild.value.toLowerCase().replace(/ /g,"_"))) {
              document.getElementById("error-text").innerHTML = "You have duplicate section names (" + headerCell.firstChild.value.toLowerCase() + ")";
              return;
            }
            sectionNamesTaken.push(headerCell.firstChild.value.toLowerCase().replace(/ /g,"_"));
          }
          document.getElementById("editMenuButton").hidden = false;
          document.getElementById("discardMenuButton").hidden = true;
          document.getElementById("saveMenuButton").hidden = true;
          document.getElementById("error-text").innerHTML = "";
          var addRowCells = document.getElementsByClassName("staffMenuAddRowCell");
          var loopAmount = addRowCells.length;
          for (var i = 0;i < loopAmount;i++) {
            var addRowCell = addRowCells[i];
            addRowCell.classList.add("invisible");
            addRowCell.classList.remove("selectable");
            addRowCell.innerHTML = "";
            addRowCell.onmousedown = "";
          }
          var addColumnCells = document.getElementsByClassName("staffMenuAddColumnCell");
          var loopAmount = addColumnCells.length;
          for (var i = 0;i < loopAmount;i++) {
            var addColumnCell = addColumnCells[i];
            addColumnCell.classList.add("invisible");
            addColumnCell.classList.remove("selectable");
            addColumnCell.onmousedown = "";
            if (i == 0) {
              addColumnCell.innerHTML = "";
            }
          }
          menuObject = {};
          var headerCells = document.getElementsByClassName("staffMenuHeaderCell");
          var loopAmount = headerCells.length;
          for (var i = 0;i < loopAmount;i++) {
            var headerCell = headerCells[i];
            headerCell.innerHTML = headerCell.firstChild.value;
            menuObject[headerCell.innerHTML] = [];
          }
          var rowCells = document.getElementsByClassName("staffMenuRowCell");
          var loopAmount = rowCells.length;
          var cellOffset = 0;
          for (var i = 0;i < loopAmount;i++) {
              var rowCell = rowCells[i + cellOffset];
              rowCell.innerHTML = rowCell.firstChild.value;
              if (rowCell.innerHTML == "") {
                cellOffset -= 1;
                RemoveCell(rowCell.xCell, rowCell.yCell);
                continue;
              }
              menuObject[table.rows[0].cells[rowCell.xCell].innerHTML].push(rowCell.innerHTML.replace(/ /g,"_"));
          }
          table.rows[table.rows.length - 1].hidden = true;
          var loopAmount = table.rows.length;
          for (var i = 0;i < loopAmount;i++) {
            table.rows[i].cells[table.rows[i].cells.length - 1].hidden = true;
          }
          var endpoint = 'menu/';
          var value = JSON.stringify(menuObject);
          
          fetch(endpoint, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json'
              //'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: value
          })
          .then(response => response.json())
            .then((data) => {})
          .catch((err) => {alert(err)})
        }

        function AddCell(x, y) {
          var addRowCellsOffset = 0;
          if (y + 1 == table.rows.length) {
            var addRowCells = document.getElementsByClassName("staffMenuAddRowCell");
            var tempAddRowCells = [];
            var loopAmount = addRowCells.length;
            for (var i = 0;i < loopAmount;i++) {
              tempAddRowCells.push("");
            }
            for (var i = 0;i < loopAmount;i++) {
              tempAddRowCells[addRowCells[i].xCell] = addRowCells[i];
            }
            addRowCells = tempAddRowCells;
            table.rows[y].id = "menu-row" + (y + 1);
            var newRow = table.insertRow(y);
            newRow.id = "menu-row" + y;
            var loopAmount = table.rows[0].cells.length - 1;
            for (var i = 0;i < loopAmount;i++) {
              var rowCell = newRow.insertCell(i);
              rowCell.classList.add("invisible");
              rowCell.xCell = i;
              rowCell.yCell = y;
              var addRowCell = addRowCells[i];
              if (i == x) {
                rowCell.classList.remove("invisible");
                rowCell.classList.add("staffMenuRowCell");
                rowCell.innerHTML = "<input type='text' placeholder='Input order'/><span onclick='RemoveCell(this.parentElement.xCell, this.parentElement.yCell);' class='removeButton'>Remove</span>";
                rowCell.onmousedown = "";
                var loopAmount2 = addRowCells.length;
                for (var k = 0;k < loopAmount2;k++) {
                  var addRowCellTemp = addRowCells[k];
                  if (addRowCellTemp.xCell == x) {
                    addRowCellTemp.yCell = y + 1;
                    addRowCell.classList.remove("invisible");
                  }
                }
              } else if (addRowCell.yCell == y && addRowCell.xCell == i) {
                rowCell.classList.remove("invisible");
                rowCell.classList.add("staffMenuAddRowCellTemp");
                rowCell.classList.add("selectable");
                rowCell.innerHTML = "<b>+</b>";
                rowCell.onmousedown = function(event) {AddCell(this.xCell, this.yCell);};
                addRowCellsOffset -= 1;
                addRowCell.onmousedown = "";
                addRowCell.innerHTML = "";
                addRowCell.classList.add("invisible");
                addRowCell.classList.remove("staffMenuAddRowCell");
                addRowCell.classList.remove("selectable");
              }
            }
            var rowCell = newRow.insertCell(newRow.length);
            rowCell.classList.add("invisible");
            rowCell.xCell = i;
            rowCell.yCell = y;
            table.rows[y + 1].cells[i].yCell + 1;
            var addRowCellsTemp = document.getElementsByClassName("staffMenuAddRowCellTemp");
            var loopAmount = addRowCellsTemp.length;
            for (var i = 0;i < loopAmount;i++) {
              addRowCellsTemp[0].classList.add("staffMenuAddRowCell");
              addRowCellsTemp[0].classList.remove("staffMenuAddRowCellTemp");
            }
          } else {
            var rowCell = table.rows[y].cells[x];
            rowCell.classList.add("staffMenuRowCell");
            rowCell.classList.remove("invisible");
            rowCell.classList.remove("staffMenuAddRowCell");
            rowCell.classList.remove("selectable");
            rowCell.innerHTML = "<input type='text' placeholder='Input order'/><span onclick='RemoveCell(this.parentElement.xCell, this.parentElement.yCell);' class='removeButton'>Remove</span>";
            rowCell.onmousedown = "";
            var addRowCell = table.rows[y + 1].cells[x];
            addRowCell.classList.remove("invisible");
            addRowCell.classList.remove("staffMenuRowCell");
            addRowCell.classList.add("staffMenuAddRowCell");
            addRowCell.classList.add("selectable");
            addRowCell.xCell = x;
            addRowCell.yCell = y + 1;
            addRowCell.innerHTML = "<b>+</b>";
            addRowCell.onmousedown = function(event) {AddCell(this.xCell, this.yCell);};
          }
        }

        function AddColumn() {
          var loopAmount = table.rows.length;
          for (var l = 0;l < loopAmount;l++) {
            var tableRow = table.rows[l];
            var x = tableRow.cells.length;
            var newCell = tableRow.insertCell(x - 1);
            newCell.xCell = x - 1;
            newCell.yCell = l;
            if (l == 0) {
              newCell.classList.add("staffMenuHeaderCell");
              newCell.classList.remove("staffMenuAddColumnCell");
              newCell.classList.remove("selectable");
              newCell.innerHTML = "<input type='text' placeholder='Input order' value='" + newCell.innerHTML.replace('<span style="color: red"><i>empty</i></span>',"") + "'/><span onclick='RemoveColumn(this.parentElement.xCell);' class='removeButton'>Remove</span>";
              newCell.onmousedown = "";
            }
            if (l == 1) {
              newCell.classList.add("staffMenuAddRowCell");
              newCell.classList.add("selectable");
              newCell.innerHTML = "<b>+</b>";
              newCell.onmousedown = function(event) {AddCell(this.xCell, this.yCell);};
            } else if (l != 0) {
              newCell.classList.add("invisible");
            }
          }
        }

        function RemoveCell(x, y) {
          var loopAmount = table.rows.length - y - 1;
          for (var i = 0;i < loopAmount;i++) {
            var oldCell = table.rows[y + i].cells[x];
            var newCell = table.rows[y + i + 1].cells[x];
            oldCell.innerHTML = newCell.innerHTML;    
            oldCell.onmousedown = newCell.onmousedown;
            oldCell.classList = newCell.classList;
          }
          var oldCell = table.rows[y + loopAmount].cells[x];
          oldCell.classList.remove("staffMenuAddRowCell");
          oldCell.classList.remove("selectable");
          oldCell.classList.add("invisible");
          oldCell.innerHTML = "";
          oldCell.onmousedown = "";
        }

        function RemoveColumn(x) {
          var loopAmount = table.rows[0].cells.length - x - 1;
          for (var i = 0;i < loopAmount;i++) {
            var loopAmount2 = table.rows.length;
            for (var k = 0;k < loopAmount2;k++) {
              var oldCell = table.rows[k].cells[x + i];
              var newCell = table.rows[k].cells[x + i + 1];
              oldCell.innerHTML = newCell.innerHTML;    
              oldCell.onmousedown = newCell.onmousedown;
              oldCell.classList = newCell.classList;
            }
          }
          var loopAmount = table.rows.length;
          for (var k = 0;k < loopAmount;k++) {
            var oldCell = table.rows[k].cells[table.rows[k].cells.length - 1];
            oldCell.remove();
          }
        }