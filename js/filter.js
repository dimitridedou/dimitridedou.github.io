document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const filterSelect = document.getElementById("filterSelect");
    const table = document.getElementById("search");
    const rows = table.getElementsByTagName("tr");

    function filterTable() {
        const searchText = searchInput.value.toLowerCase();
        const selectedLang = filterSelect.value.toLowerCase();

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName("td");

            if (cells.length > 0) {
                const rowText = row.textContent.toLowerCase();
                const rowLang = row.getAttribute("data-lang")?.toLowerCase() || "";

                const matchSearch = rowText.includes(searchText);
                const matchLang = selectedLang === "" || rowLang.includes(selectedLang);

                row.style.display = matchSearch && matchLang ? "" : "none";
            }
        }
    }

    searchInput.addEventListener("keyup", filterTable);
    filterSelect.addEventListener("change", filterTable);
});
