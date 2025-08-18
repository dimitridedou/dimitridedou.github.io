let projects = []; // Αρχικά κενή λίστα
  const postsPerPage = 7; // Αριθμός projects ανά σελίδα
  let currentPage = 1;     // Τρέχουσα σελίδα
  let filteredPosts = []; // Τα projects μετά από αναζήτηση

  // Φόρτωση projects από το JSON αρχείο
  fetch('./json/projects.json')
    .then(response => response.json())
    .then(data => {
      projects = data; // Αποθήκευση των projects
      filteredPosts = projects; // Ενημέρωση της λίστας φιλτραρισμένων projects
      loadPosts(); // Φόρτωση των projects στην πρώτη σελίδα
    })
    .catch(error => console.error('Σφάλμα κατά την φόρτωση των projects:', error));

  // Φόρτωση των project σε κάθε σελίδα
  function loadPosts(page = 1) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToDisplay = filteredPosts.slice(start, end);

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; 

    postsToDisplay.forEach((post, index) => {
      const postHTML = `
        <div class="card mb-3 post-item">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <div class="post-content" id="post-content-${index}">
              ${post.content.substring(0, 100)}
              <span class="show-more"> ${post.content.substring(100)}</span>
            </div><br>
            <a class="btn btn-dark btn-sm" href="${post.url}">Open Project</a>
          </div>
        </div>
      `;
      postsContainer.innerHTML += postHTML;
    });

    // Ενημέρωση κουμπιών σελιδοποίησης
    setupPagination(filteredPosts.length, page);
  }


  // Δημιουργία κουμπιών σελιδοποίησης
  function setupPagination(totalPosts, currentPage) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    const paginationContainer = document.getElementById('pagination');
    paginationContainer.innerHTML = ''; // Καθαρισμός προηγούμενων κουμπιών

    for (let i = 1; i <= totalPages; i++) {
      const pageItem = document.createElement('li');
      pageItem.classList.add('page-item');
      pageItem.innerHTML = `
        <a class="btn btn-dark  ${i === currentPage ? 'active' : ''}" onclick="loadPosts(${i})">
          ${i}
        </a>
      `;
      paginationContainer.appendChild(pageItem);
    }
  }

  // Λειτουργία Αναζήτησης
  function searchPosts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    filteredPosts = projects.filter(post => post.title.toLowerCase().includes(input));
    loadPosts(1); // Επανεκκίνηση της σελιδοποίησης από την πρώτη σελίδα μετά την αναζήτηση
  }
