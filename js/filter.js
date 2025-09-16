document.addEventListener("DOMContentLoaded", () => {
    const filterSelect = document.getElementById("filterSelect");
    const table = document.getElementById("search");
    const rows = table.getElementsByTagName("tr");

    function filterTable() {
        const selectedLang = filterSelect.value.toLowerCase();

        for (let i = 1; i < rows.length; i++) {
            const row = rows[i];
            const cells = row.getElementsByTagName("td");

            if (cells.length > 0) {
                const rowLang = row.getAttribute("data-lang")?.toLowerCase() || "";

                // Εμφανίζει τη γραμμή αν δεν έχει επιλεγεί φίλτρο
                // ή αν το data-lang περιέχει την τιμή του φίλτρου
                const matchLang = selectedLang === "" || rowLang.includes(selectedLang);

                row.style.display = matchLang ? "" : "none";
            }
        }
    }

    // Όποτε αλλάζει το dropdown → φιλτράρει
    filterSelect.addEventListener("change", filterTable);
});
