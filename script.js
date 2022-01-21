function api() {
  const getRequest = new XMLHttpRequest();
  let html = ``;
  getRequest.onload = function () {
    responseTextJSON = JSON.parse(getRequest.responseText);
    let tableData = document.getElementById("table-data");
    totalOrder = document.getElementById("total-order");

    totalOrder.innerHTML = `All Orders ${Array.from(responseTextJSON).length}`;

    html += `<tr class="heading-container">
        <th>ORDER ID</th>
        <th>CUSTOMER</th>
        <th>ADDRESS</th>
        <th>PRODUCT</th>
        <th>DATE ORDER</th>
        <th>STATUS</th>
        </tr>`;
    Array.from(responseTextJSON).forEach(function (element) {
      html += `<tr class="table-row">
        <td>${element["order_id"]}</td>
        <td> ${element["customer"]}</td>
        <td><strong>${element["country"]}</strong><br><p>${element["address"]}</p></td>
        <td><strong>${element["product_title"]}</strong><br><p>${element["product_description"]}</p></td>
        <td>${element["date"]}</td>
        <td><span class="${element["status"]}">${element["status"]}</span></td>
        </tr>`;
    });
    tableData.innerHTML = html;
  };

  getRequest.open(
    "GET",
    "https://my-json-server.typicode.com/Ved-X/assignment/orders"
  );
  getRequest.send();
}
api();

function filterFunction() {
  let ul = document.getElementsByTagName("ul")[0];
  if (ul.style.display == "block") {
    ul.style.display = "none";
  } else {
    ul.style.display = "block";
  }
}

function searchFunction() {
  inputVal = document.getElementById("search").value.toLowerCase();
  tableRow = document.getElementsByClassName("table-row");
  Array.from(tableRow).forEach(function (element) {
    let name = element.getElementsByTagName("td")[1].innerText.toLowerCase();
    if (!name.includes(inputVal)) {
      element.style.display = "none";
    } else {
      element.style.display = "table-row";
    }
  });
}

function sortFunction(id) {
  tableRow = document.getElementsByClassName("table-row");
  Array.from(tableRow).forEach(function (element) {
    let status = element.getElementsByTagName("td")[5].innerText;
    if (id != status) {
      element.style.display = "none";
    } else {
      element.style.display = "table-row";
    }
  });
}

function sortDateFunction() {
  tableRow = document.getElementsByClassName("table-row");
  let array = [];
  Array.from(tableRow).forEach(function (element) {
    let date = element.getElementsByTagName("td")[4].innerText;
    array.push(date);
  });
  let newArray = array.sort(function (a, b) {
    var aa = a.split("/").reverse().join(),
      bb = b.split("/").reverse().join();
    return aa < bb ? -1 : aa > bb ? 1 : 0;
  });

  let dic;
  let dicArray = [];
  newArray.forEach(function (e) {
    Array.from(tableRow).forEach(function (element) {
      let date = element.getElementsByTagName("td")[4].innerText;
      if (e == date) {
        dic = {
          order_id: element.getElementsByTagName("td")[0].innerText,
          customer: element.getElementsByTagName("td")[1].innerText,
          country: element
            .getElementsByTagName("td")[2]
            .getElementsByTagName("strong")[0].innerText,
          address: element
            .getElementsByTagName("td")[2]
            .getElementsByTagName("p")[0].innerText,
          product_title: element
            .getElementsByTagName("td")[3]
            .getElementsByTagName("strong")[0].innerText,
          product_description: element
            .getElementsByTagName("td")[3]
            .getElementsByTagName("p")[0].innerText,
          date: element.getElementsByTagName("td")[4].innerText,
          status: element.getElementsByTagName("td")[5].innerText,
        };
      }
    });
    dicArray.push(dic);
  });

  let tableData = document.getElementById("table-data");
  let html = `<tr class="heading-container">
        <th>ORDER ID</th>
        <th>CUSTOMER</th>
        <th>ADDRESS</th>
        <th>PRODUCT</th>
        <th>DATE ORDER</th>
        <th>STATUS</th>
        </tr>`;
  dicArray.forEach(function (element) {
    html += `<tr class="table-row">
        <td>${element["order_id"]}</td>
        <td> ${element["customer"]}</td>
        <td><strong>${element["country"]}</strong><br><p>${element["address"]}</p></td>
        <td><strong>${element["product_title"]}</strong><br><p>${element["product_description"]}</p></td>
        <td>${element["date"]}</td>
        <td><span class="${element["status"]}">${element["status"]}</span></td>
        </tr>`;
  });
  tableData.innerHTML = html;
}
