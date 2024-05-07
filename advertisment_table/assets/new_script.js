const data = {
  poker: [
    { sv: 5, "PPC units": 5, "PPC Spend": 100, CPC: 5, CVR: 30, ACOS: 20 },
    { x: "02/05/2024", y: 5 },
    { x: "01/05/2024", y: 4 },
    { x: "30/04/2024", y: 5 },
    { x: "29/04/2024", y: 4 },
    { x: "28/04/2024", y: 4 },
    { x: "02/05/2024", y: 5 },
    { x: "01/05/2024", y: 4 },
    { x: "30/04/2024", y: 5 },
    { x: "29/04/2024", y: 4 },
    { x: "28/04/2024", y: 4 },
    { x: "02/05/2024", y: 5 },
    { x: "01/05/2024", y: 4 },
    { x: "30/04/2024", y: 9 },
    { x: "29/04/2024", y: 4 },
    { x: "28/04/2024", y: 4 },
  ],
  "poker chips": [
    { sv: 3, "PPC units": 4, "PPC Spend": 1100, CPC: 2, CVR: 36, ACOS: 20 },
    { x: "02/05/2024", y: 59 },
    { x: "01/05/2024", y: 53 },
    { x: "30/04/2024", y: 55 },
    { x: "29/04/2024", y: 52 },
    { x: "28/04/2024", y: 52 },
    { x: "02/05/2024", y: 52 },
    { x: "01/05/2024", y: 53 },
    { x: "30/04/2024", y: 55 },
    { x: "29/04/2024", y: 52 },
    { x: "28/04/2024", y: 52 },
    { x: "02/05/2024", y: 52 },
    { x: "01/05/2024", y: 53 },
    { x: "30/04/2024", y: 55 },
    { x: "29/04/2024", y: 52 },
    { x: "28/04/2024", y: 52 },
  ],
  "poker chips set": [
    { sv: 45, "PPC units": 6, "PPC Spend": 120, CPC: 5, CVR: 20, ACOS: 10 },
    { x: "02/05/2024", y: 70 },
    { x: "01/05/2024", y: 70 },
    { x: "30/04/2024", y: "" },
    { x: "29/04/2024", y: 90 },
    { x: "28/04/2024", y: 70 },
    { x: "02/05/2024", y: 70 },
    { x: "01/05/2024", y: 70 },
    { x: "30/04/2024", y: "" },
    { x: "29/04/2024", y: 90 },
    { x: "28/04/2024", y: 70 },
    { x: "02/05/2024", y: 70 },
    { x: "01/05/2024", y: 70 },
    { x: "30/04/2024", y: "" },
    { x: "29/04/2024", y: 90 },
    { x: "28/04/2024", y: 70 },
  ],
};

const ppcTableHeaders = ["KWs"];

const ppcTableContainer = document.getElementById("ppc_table_container");

const ppcTable = document.createElement("div");
ppcTable.className = "ppc_table";

ppcTableContainer.appendChild(ppcTable);

function createPpcTableStructure() {
  ppcTable.innerHTML = `
  <button type="button" class="collapse_btn">
    <i class="fa fa-plus-circle"></i>
  </button>
 <div class="ppc_table_normal">
     <div class="ppc_table_header"></div>
     <div class="ppc_table_data"></div>
 </div>
 <div class="ppc_table_heatmap">
     <div class="ppc_table_heatmap_header"></div>
     <div class="ppc_table_heatmap_data"></div>
 </div>
`;
}

function setupCollapseButton() {
  const collapse_btn = ppcTable.querySelector(".collapse_btn");
  collapse_btn.addEventListener("click", handleCollapseClick(ppcTable));
}

function setupTableHeader(tableData) {
  const ppcTableHeader = ppcTable.querySelector(".ppc_table_header");
  const tableHeaders = [...ppcTableHeaders, ...Object.keys(tableData.poker[0])];

  tableHeaders.forEach((th) => addHeaderCell(th, ppcTableHeader));
}

function addHeaderCell(headerText, ppcTableHeader) {
  const p = document.createElement("p");
  if (headerText.trim() !== "KWs" && headerText.trim() !== "sv") {
    p.classList = "collapsible";
  }
  p.innerHTML =
    headerText === "sv"
      ? `<span>${headerText.trim()}
            <span>
             <i class="fa-solid fa-arrow-up sort" data-type="asc"></i>
             <i class="fa-solid fa-arrow-down sort" data-type="dsc"></i>
            </span>
           </span>`
      : headerText.trim();

  if (headerText === "sv") {
    const sortEls = [...p.querySelectorAll(".sort")];
    sortEls.forEach((sortEl) => {
      sortEl.addEventListener("click", (e) => {
        handleSortClick(e.target.dataset.type);
      });
    });
  }

  ppcTableHeader.append(p);
}

function setupTableData(tableData) {
  const ppcTableData = ppcTable.querySelector(".ppc_table_data");
  const keyWords = Object.keys(tableData);

  keyWords.forEach((kw) => addTableRow(kw, tableData[kw], ppcTableData));
}

function addTableRow(keyword, rowData, ppcTableData) {
  const row = Array.from(rowData);
  const tableRow = document.createElement("div");
  tableRow.className = "ppc_table_row";
  tableRow.innerHTML = `<span>${keyword}</span>`;
  ppcTableData.appendChild(tableRow);
  row.forEach((rd) => {
    const rowKeys = Object.keys(rd);
    rowKeys.forEach((rowKey) => {
      if (rowKey !== "x" && rowKey !== "y") {
        const cellValue = rd[rowKey] ? rd[rowKey] : "-";
        tableRow.innerHTML += `<span class="${
          rowKey !== "sv" ? "collapsible" : ""
        }">${cellValue}</span>`;
      }
    });
  });
}

function setupHeatmapHeader(heatmapHeaders) {
  const ppcTableHeatmapHeader = ppcTable.querySelector(
    ".ppc_table_heatmap_header"
  );

  heatmapHeaders.forEach((th) => {
    const p = document.createElement("p");
    p.innerHTML = convertDateFormatWithDay(th.trim());
    ppcTableHeatmapHeader.append(p);
  });
}

function setupHeatmapData(tableData) {
  const ppcTableHeatmapData = ppcTable.querySelector(".ppc_table_heatmap_data");
  const keyWords = Object.keys(tableData);

  keyWords.forEach((key) => {
    addHeatmapDataRow(tableData[key], ppcTableHeatmapData);
  });
}

function addHeatmapDataRow(rowData, ppcTableHeatmapData) {
  const tableRow = document.createElement("div");
  tableRow.className = "ppc_table_row";
  ppcTableHeatmapData.appendChild(tableRow);

  const row = rowData.slice(1);

  row.forEach((rd) => {
    tableRow.innerHTML += `<span style="background-color: ${selectBgColorForHeatmapData(
      rd["y"]
    )}">${rd["y"] ? rd["y"] : "-"}</span>`;
  });
}

function createPpcTable(tableData) {
  createPpcTableStructure();
  setupCollapseButton();
  setupTableHeader(tableData);
  setupTableData(tableData);

  const heatmapHeaderObjs = [...tableData.poker].slice(1);
  const heatmapHeaders = heatmapHeaderObjs.map((hmObj) => hmObj["x"]);
  setupHeatmapHeader(heatmapHeaders);
  setupHeatmapData(tableData);
}

function selectBgColorForHeatmapData(heatValue) {
  let colorCode = null;

  colorCode =
    heatValue <= 3
      ? "#00ff00"
      : heatValue > 3 && heatValue <= 5
      ? "#33ff00"
      : heatValue > 5 && heatValue <= 8
      ? "#66ff00"
      : heatValue > 8 && heatValue <= 12
      ? "#99ff00"
      : heatValue > 12 && heatValue <= 15
      ? "#ccff00"
      : heatValue > 15 && heatValue <= 20
      ? "#FFFF00"
      : heatValue > 20 && heatValue <= 25
      ? "#FFCC00"
      : heatValue > 25 && heatValue <= 35
      ? "#ff9900"
      : heatValue > 35 && heatValue <= 45
      ? "#ff6600"
      : heatValue > 45 && heatValue <= 55
      ? "#FF3300"
      : "#ff0000";

  return colorCode;
}

function convertDateFormatWithDay(dateString) {
  const parts = dateString.split("/");
  const day = parseInt(parts[0]);
  const month = parseInt(parts[1]);
  const year = parseInt(parts[2]);

  const dateObject = new Date(year, month - 1, day);

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const dayOfWeek = days[dateObject.getDay()];

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const monthName = months[month - 1];

  const dayString = day.toString();

  return `<span>
   ${dayOfWeek}
  </span><span>${dayString}</span><span>${monthName.slice(0, 3)}</span>`;
}

function handleCollapseClick(ppcTable) {
  return (e) => {
    e.preventDefault();
    ppcTable.classList.toggle("collapse");
  };
}

function handleSortClick(sortType) {
  const sortedKeys = Object.keys(data).sort((a, b) => {
    const svA = data[a].find((item) => typeof item === "object").sv;
    const svB = data[b].find((item) => typeof item === "object").sv;
    return sortType === "asc" ? svB - svA : svA - svB;
  });

  const sortedData = {};

  sortedKeys.forEach((key) => {
    sortedData[key] = data[key];
  });

  createPpcTable(sortedData);
}

createPpcTable(data);
