let date = null,
  airport = null;
let current = null,
  hiddenArray = null;

document.addEventListener("DOMContentLoaded", function () {
  let button = document.getElementById("add-destination");
  date = document.getElementById("date-destination");
  airport = document.getElementById("airport-destination");
  current = document.getElementById("current-destination");
  hiddenArray = document.getElementById("hidden-array");

  button.addEventListener("click", addDestination);
});

function addDestination(evt) {
  if (airport.value.toString() != "" && date.value.toString() != "") {
    current.innerHTML += `<strong> ${airport.value.toString()} </strong> - (${date.value.toString()})<br />`;

    destinationList.push({
      airport: airport.value.toString(),
      date: new Date(date.value.toString()),
    });
  }
}
