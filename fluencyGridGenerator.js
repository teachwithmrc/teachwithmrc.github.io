
function generateGrid() {
  const contentType = document.querySelector('input[name="contentType"]:checked');
  const gridSizeOption = document.querySelector('input[name="gridSize"]:checked');
  const skillCheckboxes = document.querySelectorAll('.skill:checked');
  const includeTricky = document.getElementById('includeTricky').checked;

  if (!contentType || !gridSizeOption || skillCheckboxes.length === 0) {
    alert("Please select content type, at least one skill, and grid size.");
    return;
  }

  const content = contentType.value;
  const gridSize = parseInt(gridSizeOption.value);
  const selectedSkills = Array.from(skillCheckboxes).map(cb => cb.value);

  let pool = [];

  selectedSkills.forEach(skill => {
    if (content === "words" || content === "both") {
      if (fluencyWords[skill]) pool.push(...fluencyWords[skill]);
    }
    if (content === "sentences" || content === "both") {
      if (fluencySentences[skill]) pool.push(...fluencySentences[skill]);
    }
  });

  if (includeTricky && content !== "sentences") {
    pool.push(...trickyWords);
  }

  const shuffled = pool.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, gridSize);

  // Create grid
  const gridContainer = document.getElementById("gridContainer");
  gridContainer.innerHTML = "";

  const table = document.createElement("table");
  table.className = "grid-table";

  const columns = gridSize === 15 ? 3 : gridSize === 20 ? 4 : 5;
  for (let i = 0; i < gridSize; i += columns) {
    const row = document.createElement("tr");
    for (let j = 0; j < columns; j++) {
      const cell = document.createElement("td");
      const word = selected[i + j] || "";
      cell.textContent = word;
      if (word && word.trim().split(" ").length > 1) {
        cell.classList.add("sentence");
      }
      row.appendChild(cell);
    }
    table.appendChild(row);
  }

  gridContainer.appendChild(table);

  document.getElementById("gridTitle").innerText = "Fluency Grid";

  const skillLabel = selectedSkills.map(s => skillLabels[s] || s).join(", ");
  document.getElementById("skillLabelPrint").innerText = "Skills: " + skillLabel;
}
