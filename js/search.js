let project = []; // Αρχικά κενή λίστα
  const projectPerPage = 10; // Αριθμός project ανά σελίδα
  let currentPage = 1;     // Τρέχουσα σελίδα
  let filteredproject = []; // Τα project μετά από αναζήτηση

  // Φόρτωση project από το JSON αρχείο
  fetch('./json/project.json')
    .then(response => response.json())
    .then(data => {
      project = data; // Αποθήκευση των project
      filteredproject = project; // Ενημέρωση της λίστας φιλτραρισμένων project
      loadproject(); // Φόρτωση των project στην πρώτη σελίδα
    })
    .catch(error => console.error('Σφάλμα κατά την φόρτωση των project:', error));

  // Φόρτωση των project σε κάθε σελίδα
  function loadproject(page = 1) {
    const start = (page - 1) * projectPerPage;
    const end = start + projectPerPage;
    const projectToDisplay = filteredproject.slice(start, end);

    const projectContainer = document.getElementById('projectContainer');
    projectContainer.innerHTML = ''; 

    projectToDisplay.forEach((post, index) => {
      const postHTML = `
        <div class="card mb-3 post-item">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <div class="post-content" id="post-content-${index}">
              ${post.content.substring(0, 100)}
              <span class="show-more"> ${post.content.substring(100)}</span>
            </div>
            <a class="btn btn-dark btn-sm" href="${post.url}">Show Project</a>
          </div>
        </div>
      `;
      projectContainer.innerHTML += postHTML;
    });

    // Ενημέρωση κουμπιών σελιδοποίησης
    setupPagination(filteredproject.length, page);
  }


  // Δημιουργία κουμπιών σελιδοποίησης
  function setupPagination(totalproject, currentPage) {
    const totalPages = Math.ceil(totalproject / projectPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Καθαρισμός προηγούμενων κουμπιών

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.innerHTML = `
        <button class="page-link ${i === currentPage ? 'active' : ''}" onclick="loadproject(${i})">
          ${i}
        </button>
      `;
      paginationContainer.appendChild(pageItem);
    }
  }

  // Λειτουργία Αναζήτησης
  function searchproject() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    filteredproject = project.filter(post => post.title.toLowerCase().includes(input));
    loadproject(1); // Επανεκκίνηση της σελιδοποίησης από την πρώτη σελίδα μετά την αναζήτηση
  }
