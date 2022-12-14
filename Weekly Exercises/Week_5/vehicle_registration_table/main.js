const dataInput = document.querySelectorAll(".data-input");
const createData = document.getElementById("submit");
const table = document.querySelector("tbody");
const form = document.querySelector("form");
const registrationInput = document.getElementById("reg-year");

let searchBox = document.getElementById("search");
const searchBtn = document.getElementById("btn-search");
let searchResultTxt = document.getElementById("search-result-txt");
const input = document.getElementById("search--2");

/**************/

// Creation of dynamic input data every time
let tableDataRows = [];
function createVehicle() {
  let owner = document.getElementById("owner-name").value.toUpperCase();
  let registration = document.getElementById("reg-no").value.toUpperCase();
  let company = document.getElementById("vehicle-company").value.toUpperCase();
  let type = document.getElementById("vehicle-type").value.toUpperCase();
  let model = document.getElementById("vehicle-model").value.toUpperCase();
  let year = document.getElementById("reg-year").value;

  if (!owner || !registration || !company || !type || !model || !year) {
    return false;
  }

  class Vehicle {
    constructor(registration, owner, company, model, type, year) {
      this.registration = registration;
      this.owner = owner;
      this.company = company;
      this.model = model;
      this.type = type;
      this.year = year;
    }
  }

  let newVehicle = new Vehicle(registration, owner, company, model, type, year);

  //Simplifying the table row entry
  const tableRow = document.createElement("tr");
  table.appendChild(tableRow);
  tableRow.innerHTML = `<td>${registration}</td><td>${owner}</td><td>${company}</td><td>${model}</td><td>${type}</td><td>${year}</td>`;

  //addTableRow(registration, owner, company, model, type, year);
  tableDataRows.push(newVehicle);
  form.reset();
  console.table(tableDataRows);
}

// Function for adding table row and contents.
// function addTableRow(
//   cell1value,
//   cell2value,
//   cell3value,
//   cell4value,
//   cell5value,
//   cell6value
// ) {
//   const tableRow = document.createElement("tr");
//   const cell1 = document.createElement("td");
//   const cell2 = document.createElement("td");
//   const cell3 = document.createElement("td");
//   const cell4 = document.createElement("td");
//   const cell5 = document.createElement("td");
//   const cell6 = document.createElement("td");

//   table.appendChild(tableRow);
//   tableRow.appendChild(cell1);
//   tableRow.appendChild(cell2);
//   tableRow.appendChild(cell3);
//   tableRow.appendChild(cell4);
//   tableRow.appendChild(cell5);
//   tableRow.appendChild(cell6);

//   cell1.textContent = cell1value;
//   cell2.textContent = cell2value;
//   cell3.textContent = cell3value;
//   cell4.textContent = cell4value;
//   cell5.textContent = cell5value;
//   cell6.textContent = cell6value;
// }

// Filtering a table by license number
function filterItem() {
  let myTable, tr, td, textValue;
  filterTxt = input.value.toUpperCase();
  myTable = document.getElementById("myTable");
  tr = myTable.querySelectorAll("tr");

  for (let i = 0; i < tr.length; i++) {
    td = tr[i].querySelectorAll("td")[0];
    if (td) {
      textValue = td.textContent;
      if (textValue.toUpperCase().indexOf(filterTxt) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

// Function for searching vehicle data by registration number ** returning 'result not found' on not finding the vehicle.
function searchVehicleItem() {
  searchVal = searchBox.value.toUpperCase();
  let result = tableDataRows.find(
    (vehicleData) => vehicleData.registration == searchVal
  );
  if (tableDataRows.length === 0) {
    searchResultTxt.textContent = "Please insert a search term.";
  } else if (result !== undefined) {
    searchResultTxt.innerHTML = `The searched vehicle is <strong>${result.registration}, ${result.company} ${result.model} (${result.year})</strong> registered to <strong>${result.owner}.</strong>`;
  } else {
    searchResultTxt.textContent = "Result not found for given license number!";
  }
}
// Resetting the table
function resetTable() {
  table.innerHTML = "";
  searchResultTxt.innerHTML = "";
  tableDataRows.length = 0;
  console.table(tableDataRows);
}

createData.addEventListener("click", createVehicle);
registrationInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    createVehicle();
  }
});
input.addEventListener("keyup", filterItem);
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  searchVehicleItem();
});
searchBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    searchVehicleItem();
  }
});
