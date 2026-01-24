document.addEventListener("DOMContentLoaded", () => {
    const filterInput = document.getElementById("filterSelect");
    const categoryFilter = document.getElementById("categoryFilter");
    const cols = document.querySelectorAll("#listprojects .col"); // note: κρύβουμε το col

    function filterProjects() {
        const searchTerm = filterInput.value.toLowerCase();
        const selectedCategory = categoryFilter.value.toLowerCase();

        cols.forEach(col => {
            const card = col.querySelector(".profile-card");
            const title = card.querySelector("h5")?.textContent.toLowerCase() || "";
            const description = card.querySelector("p")?.textContent.toLowerCase() || "";
            const badges = Array.from(card.querySelectorAll(".skill-badge")).map(b => b.textContent.toLowerCase());

            // Έλεγχος αναζήτησης
            const matchSearch = !searchTerm ||
                                title.includes(searchTerm) ||
                                description.includes(searchTerm) ||
                                badges.some(badge => badge.includes(searchTerm));

            // Έλεγχος κατηγορίας
            const matchCategory = selectedCategory === "all" ||
                                  badges.some(badge => badge.includes(selectedCategory));

            // Εμφάνιση / Απόκρυψη COLUMN
            col.style.display = (matchSearch && matchCategory) ? "" : "none";
        });
    }

    filterInput.addEventListener("input", filterProjects);
    categoryFilter.addEventListener("change", filterProjects);
});


