const data = {
  poker: [
    { sv: 5, "PPC units": 5, "PPC Spend": 100, CPC: 5, CVR: 30, ACOS: 20 },
    { x: "02/05/2024", y: 5 },
    { x: "01/05/2024", y: 4 },
    { x: "30/04/2024", y: 5 },
    { x: "29/04/2024", y: 4 },
    { x: "28/04/2024", y: 4 },
  ],
  "poker chips": [
    { sv: 3, "PPC units": 4, "PPC Spend": 1100, CPC: 2, CVR: 36, ACOS: 20 },
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
  ],
};

const ppcTableHeaders = ["KWs"];

const ppcTableContainer = document.getElementById("ppc_table_container");

const ppcTable = document.createElement("div");
ppcTable.className = "ppc_table";

ppcTableContainer.appendChild(ppcTable);

function createPpcTAble(tableData) {
  ppcTable.innerHTML = `
 <div class="ppc_table_normal">
     <div class="ppc_table_header"></div>
     <div class="ppc_table_data"></div>
 </div>
 <div class="ppc_table_heatmap">
     <div class="ppc_table_heatmap_header"></div>
     <div class="ppc_table_heatmap_data"></div>
 </div>
`;

  const keyWords = Object.keys(tableData);

  const heatmapHeaderObjs = [...tableData.poker].slice(1);
  const heatmapHeaders = heatmapHeaderObjs.map((hmObj) => hmObj["x"]);

  const tableHeaders = [...ppcTableHeaders, ...Object.keys(tableData.poker[0])];

  const ppcTableHeader = ppcTable.querySelector(".ppc_table_header");
  const ppcTableData = ppcTable.querySelector(".ppc_table_data");
  const ppcTableHeatmapHeader = ppcTable.querySelector(
    ".ppc_table_heatmap_header"
  );
  const ppcTableHeatmapData = ppcTable.querySelector(".ppc_table_heatmap_data");

  tableHeaders.forEach((th) => {
    const p = document.createElement("p");
    p.innerHTML =
      th === "sv"
        ? `<span>${th.trim()}
            <span>
             <i class="fa-solid fa-arrow-up sort" data-type="asc"></i>
             <i class="fa-solid fa-arrow-down sort" data-type="dsc"></i>
            </span>
           </span>`
        : th.trim();

    if (th === "sv") {
      const sortEls = [...p.querySelectorAll(".sort")];
      sortEls.forEach((sortEl) => {
        sortEl.addEventListener("click", (e) => {
          e.preventDefault();
          handleSortClick(e.target.dataset.type);
        });
      });
    }

    ppcTableHeader.append(p);
  });

  keyWords.forEach((kw) => {
    const row = Array.from(tableData[kw]);
    const tableRow = document.createElement("div");
    tableRow.className = "ppc_table_row";
    tableRow.innerHTML = `<span>${kw}</span>`;
    ppcTableData.appendChild(tableRow);
    row.forEach((rd) => {
      const rowKeys = Object.keys(rd);
      rowKeys.forEach((rowKey) => {
        if (rowKey === "x" || rowKey === "y") return;
        tableRow.innerHTML += `<span>${rd[rowKey] ? rd[rowKey] : "-"}</span>`;
      });
    });
  });

  heatmapHeaders.forEach((th) => {
    const p = document.createElement("p");
    p.innerHTML = convertDateFormatWithDay(th.trim());
    ppcTableHeatmapHeader.append(p);
  });

  keyWords.forEach((key) => {
    const tableRow = document.createElement("div");
    tableRow.className = "ppc_table_row";
    ppcTableHeatmapData.appendChild(tableRow);

    const row = tableData[key].slice(1);

    row.forEach((rd) => {
      tableRow.innerHTML += `<span class="${selectClassForHeatmap(rd["y"])}">${
        rd["y"] ? rd["y"] : "-"
      }</span>`;
    });
  });
}

function selectClassForHeatmap(heatValue) {
  if (heatValue < 10) return "very-low";

  let className =
    heatValue >= 10 && heatValue < 50
      ? "low"
      : heatValue >= 50 && heatValue < 70
      ? "medium"
      : heatValue >= 70 && heatValue < 90
      ? "high"
      : "very-high";

  return className;
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

  createPpcTAble(sortedData);
}

createPpcTAble(data);
