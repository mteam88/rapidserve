var table = document.getElementById("menu-table");
var menuCheckStaff = window.setInterval(CreateMenuStaff, 100);
  
function CreateMenuStaff() {
  table.innerHTML = "";
  if (menuObject) {
    clearInterval(menuCheckStaff);
    let k = loopAmount = 0, tableRow = table.insertRow(table.rows.length);
    tableRow.id = "menu-row0";
    for (let [key, value] of Object.entries(menuObject)) {
      if (value.length + 1 > loopAmount) loopAmount = value.length + 1;
      let rowCell = tableRow.insertCell(tableRow.cells.length);
      rowCell.classList.add("staffMenuHeaderCell");
      rowCell.xCell = k, rowCell.yCell = 0, rowCell.innerHTML = key.replace(/_/g," ");
      k++;
    }
    let rowCell = tableRow.insertCell(tableRow.length);
    rowCell.classList.add("staffMenuAddColumnCell","invisible");
    rowCell.xCell = tableRow.length, rowCell.yCell = 0;
    loopAmount++;
    for (let i = 0, k = 0;i < loopAmount;i++, tableRow = table.insertRow(table.rows.length), k = 0) {
      if (i === 0) continue;
      tableRow.id = "menu-row" + i;
      for (let [key, value] of Object.entries(menuObject)) {
        rowCell = tableRow.insertCell(tableRow.cells.length);
        rowCell.classList.add("invisible");
        rowCell.xCell = k, rowCell.yCell = i;
        if (value.length >= i) {
          rowCell.classList.add("staffMenuRowCell");
          rowCell.classList.remove("invisible");
          rowCell.innerHTML = value[i - 1];
        } else if (value.length === i - 1) rowCell.classList.add("staffMenuAddRowCell");
        k++;
      }
      rowCell = tableRow.insertCell(tableRow.length);
      rowCell.classList.add("invisible");
      rowCell.xCell = tableRow.length, rowCell.yCell = i;
    }
    tableRow.remove();
    table.rows[table.rows.length - 1].hidden = true;
    for (let tableRow of table.rows) tableRow.cells[tableRow.cells.length - 1].hidden = true;
  }
  EditSection();
}

function EditMenu() {
  document.getElementById("editMenuButton").hidden = true, document.getElementById("saveMenuButton").hidden = document.getElementById("discardMenuButton").hidden = false;
  let addRowCells = document.getElementsByClassName("staffMenuAddRowCell"), addColumnCells = document.getElementsByClassName("staffMenuAddColumnCell"), addColumnCellsArray = Array.prototype.slice.call(addColumnCells);
  for (let addRowCell of addRowCells) {
    addRowCell.classList.add("selectable");
    addRowCell.classList.remove("invisible");
    addRowCell.innerHTML = "<b>+</b>", addRowCell.onmousedown = function() {AddCell(this.xCell, this.yCell);};
  }
  for (let addColumnCell of addColumnCells) {
    addColumnCell.classList.add("selectable");
    addColumnCell.classList.remove("invisible");
    if (Array.prototype.slice.call(addColumnCells).indexOf(addColumnCell) === 0) {
      addColumnCell.innerHTML = "<b>+</b>", addColumnCell.onmousedown = () => {AddColumn();};
    }
  }
  let rowCells = document.getElementsByClassName("staffMenuRowCell"), headerCells = document.getElementsByClassName("staffMenuHeaderCell");
  for (let rowCell of rowCells) rowCell.innerHTML = "<input type='text' placeholder='Input order' value='" + rowCell.innerHTML.replace('<span style="color: red"><i>empty</i></span>',"") + "'/><span onclick='RemoveCell(this.parentElement.xCell, this.parentElement.yCell);' class='removeButton'>Remove</span>";
  for (let headerCell of headerCells) headerCell.innerHTML = "<input type='text' placeholder='Input order' value='" + headerCell.innerHTML.replace('<span style="color: red"><i>empty</i></span>',"") + "'/><span onclick='RemoveColumn(this.parentElement.xCell);' class='removeButton'>Remove</span>";
  table.rows[table.rows.length - 1].hidden = false;
  for (let tableRow of table.rows) tableRow.cells[tableRow.cells.length - 1].hidden = false;
}

function DiscardMenu() {
  document.getElementById("editMenuButton").hidden = false, document.getElementById("saveMenuButton").hidden = document.getElementById("discardMenuButton").hidden = true;
  CreateMenuStaff();
}

function SaveMenu() {
  let sectionNamesTaken = [];
  let headerCells = document.getElementsByClassName("staffMenuHeaderCell");
  for (let headerCell of headerCells) {
    if (headerCell.firstChild.value.length === 0) document.getElementById("error-text").innerHTML = "You have a section with no name (Section: " + (Array.prototype.slice.call(headerCells).indexOf(headerCell) + 1) + ")";
    else if (sectionNamesTaken.includes(headerCell.firstChild.value.toLowerCase().replace(/ /g,"_"))) document.getElementById("error-text").innerHTML = "You have duplicate section names (" + headerCell.firstChild.value.toLowerCase() + ")";
    else sectionNamesTaken.push(headerCell.firstChild.value.toLowerCase().replace(/ /g,"_"));
  }
  document.getElementById("editMenuButton").hidden = false, document.getElementById("saveMenuButton").hidden = document.getElementById("discardMenuButton").hidden = true;
  document.getElementById("error-text").innerHTML = "";
  let addRowCells = document.getElementsByClassName("staffMenuAddRowCell"), addColumnCells = document.getElementsByClassName("staffMenuAddColumnCell");
  for (let addRowCell of addRowCells) {
    addRowCell.classList.add("invisible");
    addRowCell.classList.remove("selectable");
    addRowCell.innerHTML = addRowCell.onmousedown = "";
  }
  for (let addColumnCell of addColumnCells) {
    addColumnCell.classList.add("invisible");
    addColumnCell.classList.remove("selectable");
    addColumnCell.onmousedown = "";
    if (Array.prototype.slice.call(addColumnCells).indexOf(addColumnCell) === 0) addColumnCell.innerHTML = "";
  }
  headerCells = document.getElementsByClassName("staffMenuHeaderCell");
  for (let headerCell of headerCells) {
    headerCell.innerHTML = headerCell.firstChild.value;
    menuObject[headerCell.innerHTML] = [];
  }
  let rowCells = document.getElementsByClassName("staffMenuRowCell"), cellOffset = 0, rowCell;
  for (let i in rowCells) {
    if (!rowCells[Number(i) + cellOffset]) continue;
    rowCell = rowCells[Number(i) + cellOffset], rowCell.innerHTML = rowCell.firstChild.value;
    if (rowCell.innerHTML.length === 0) {
      RemoveCell(rowCell.xCell, rowCell.yCell);
      cellOffset--;
    } else menuObject[table.rows[0].cells[rowCell.xCell].innerHTML].push(rowCell.innerHTML.replace(/ /g,"_"));
  }
  table.rows[table.rows.length - 1].hidden = true;
  for (let tableRow of table.rows) tableRow.cells[tableRow.cells.length - 1].hidden = true;
  const endpoint = 'menu/';
  let value = JSON.stringify(menuObject);
      
  fetch(endpoint, {method: 'POST',headers: {'Content-Type': 'application/json','Accept': 'application/json'},body: value}).then(response => response.json()).catch((error) => {console.log(error);});
}

function AddCell(x, y) {
  if (y + 1 === table.rows.length) {
    let addRowCells = document.getElementsByClassName("staffMenuAddRowCell"), tempAddRowCells = [];
    for (let addRowCell of addRowCells) tempAddRowCells[addRowCell.xCell] = addRowCell;
    addRowCells = tempAddRowCells;
    table.rows[y].id = "menu-row" + (y + 1);
    let newRow = table.insertRow(y);
    newRow.id = "menu-row" + y;
    let loopAmount = table.rows[0].cells.length - 1, rowCell = newRow.insertCell(0);
    for (let i = 0, addRowCell = addRowCells[0];i < loopAmount;i++, addRowCell = addRowCells[i], rowCell = newRow.insertCell(i)) {
      if (!addRowCell) addRowCell = "";
      rowCell.xCell = i, rowCell.yCell = y;
      if (i === x) {
        rowCell.classList.add("staffMenuRowCell");
        rowCell.innerHTML = "<input type='text' placeholder='Input order'/><span onclick='RemoveCell(this.parentElement.xCell, this.parentElement.yCell);' class='removeButton'>Remove</span>", rowCell.onmousedown = "";
        for (let addRowCellTemp of addRowCells) {
          if (addRowCellTemp.xCell == x) {
            addRowCellTemp.yCell = y + 1;
            addRowCell.classList.remove("invisible");
          }
        }
      } else if (addRowCell.yCell == y && addRowCell.xCell == i) {
        rowCell.classList.add("staffMenuAddRowCellTemp","selectable");
        rowCell.innerHTML = "<b>+</b>", rowCell.onmousedown = function() {AddCell(this.xCell, this.yCell);};
        addRowCellsOffset--;
        addRowCell.onmousedown = addRowCell.innerHTML = "";
        addRowCell.classList.add("invisible");
        addRowCell.classList.remove("staffMenuAddRowCell","selectable");
      } else rowCell.classList.add("invisible");
    }
    rowCell.classList.add("invisible");
    rowCell.xCell = newRow.length - 1, rowCell.yCell = y;
    table.rows[y + 1].cells[table.rows[y + 1].cells.length - 1].yCell++;
    let addRowCellsTemp = document.getElementsByClassName("staffMenuAddRowCellTemp");
    for (let i in addRowCellsTemp) {
      if (!addRowCellsTemp[0]) continue;
      addRowCellsTemp[0].classList.add("staffMenuAddRowCell");
      addRowCellsTemp[0].classList.remove("staffMenuAddRowCellTemp");
    }
  } else {
    let rowCell = table.rows[y].cells[x], addRowCell = table.rows[y + 1].cells[x];
    rowCell.classList.add("staffMenuRowCell");
    rowCell.classList.remove("invisible","staffMenuAddRowCell","selectable");
    rowCell.innerHTML = "<input type='text' placeholder='Input order'/><span onclick='RemoveCell(this.parentElement.xCell, this.parentElement.yCell);' class='removeButton'>Remove</span>", rowCell.onmousedown = "";
    addRowCell.classList.remove("invisible","staffMenuRowCell");
    addRowCell.classList.add("staffMenuAddRowCell","selectable");
    addRowCell.xCell = x, addRowCell.yCell = y + 1, addRowCell.innerHTML = "<b>+</b>", addRowCell.onmousedown = function() {AddCell(this.xCell, this.yCell);};
  }
}

function AddColumn() {
  for (let tableRow of table.rows) {
    let newCell = tableRow.insertCell(tableRow.cells.length - 1);
    newCell.xCell = tableRow.cells.length - 2, newCell.yCell = Array.prototype.slice.call(table.rows).indexOf(tableRow);
    switch (Array.prototype.slice.call(table.rows).indexOf(tableRow)) {
      case 0:
        newCell.classList.add("staffMenuHeaderCell");
        newCell.classList.remove("staffMenuAddColumnCell","selectable");
        newCell.innerHTML = "<input type='text' placeholder='Input order' value='" + newCell.innerHTML.replace('<span style="color: red"><i>empty</i></span>',"") + "'/><span onclick='RemoveColumn(this.parentElement.xCell);' class='removeButton'>Remove</span>", newCell.onmousedown = "";
        break;
      case 1:
        newCell.classList.add("staffMenuAddRowCell","selectable");
        newCell.innerHTML = "<b>+</b>", newCell.onmousedown = function() {AddCell(this.xCell, this.yCell);};
        break;
      default:
        newCell.classList.add("invisible");
    }
  }
}

function RemoveCell(x, y) {
  let loopAmount = table.rows.length - y - 1;
  for (let i = 0, oldCell = table.rows[y].cells[x], newCell = table.rows[y + 1].cells[x];i < loopAmount;i++, oldCell = table.rows[y + i].cells[x], newCell = table.rows[y + i + 1].cells[x]) oldCell.innerHTML = newCell.innerHTML, oldCell.onmousedown = newCell.onmousedown, oldCell.classList = newCell.classList;
  let oldCell = table.rows[y + loopAmount].cells[x];
  oldCell.classList.remove("staffMenuAddRowCell","selectable");
  oldCell.classList.add("invisible");
  oldCell.innerHTML = oldCell.onmousedown = "";
}

function RemoveColumn(x) {
  let loopAmount = table.rows[0].cells.length - x - 1;
  for (let i = 0;i < loopAmount;i++) {
    for (let tableRow of table.rows) {
      let oldCell = tableRow.cells[x + i], newCell = tableRow.cells[x + i + 1];
      oldCell.innerHTML = newCell.innerHTML, oldCell.onmousedown = newCell.onmousedown, oldCell.classList = newCell.classList;
    }
  }
  for (let tableRow of table.rows) tableRow.cells[tableRow.cells.length - 1].remove();
}

function EditSection(section) {
  let sidePanal = document.getElementById("sectionSidePanal");
  //section = sectionsObject[section];
  for (let i = 0;i < (300) / 10;i++) sidePanal.width = i * 10 + "px";
}