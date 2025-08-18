let posts = []; // Αρχικά κενή λίστα
  const postsPerPage = 10; // Αριθμός posts ανά σελίδα
  let currentPage = 1;     // Τρέχουσα σελίδα
  let filteredPosts = []; // Τα posts μετά από αναζήτηση

  // Φόρτωση posts από το JSON αρχείο
  fetch('./json/posts.json')
    .then(response => response.json())
    .then(data => {
      posts = data; // Αποθήκευση των posts
      filteredPosts = posts; // Ενημέρωση της λίστας φιλτραρισμένων posts
      loadPosts(); // Φόρτωση των posts στην πρώτη σελίδα
    })
    .catch(error => console.error('Σφάλμα κατά την φόρτωση των posts:', error));

  // Φόρτωση των posts σε κάθε σελίδα
  function loadPosts(page = 1) {
    const start = (page - 1) * postsPerPage;
    const end = start + postsPerPage;
    const postsToDisplay = filteredPosts.slice(start, end);

    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = ''; // Καθαρισμός προηγούμενων posts

    postsToDisplay.forEach((post, index) => {
      const postHTML = `
        <div class="card mb-3 post-item">
          <div class="card-body">
            <h5 class="card-title">${post.title}</h5>
            <div class="post-content" id="post-content-${index}">
              ${post.content.substring(0, 100)}
              <span class="show-more"> ${post.content.substring(100)}</span>
            </div>
            <a class="btn btn-primary btn-sm" href="${post.url}">Διαβάστε περισσότερα</a>
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
        <button class="page-link ${i === currentPage ? 'active' : ''}" onclick="loadPosts(${i})">
          ${i}
        </button>
      `;
      paginationContainer.appendChild(pageItem);
    }
  }

  // Λειτουργία Αναζήτησης
  function searchPosts() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    filteredPosts = posts.filter(post => post.title.toLowerCase().includes(input));
    loadPosts(1); // Επανεκκίνηση της σελιδοποίησης από την πρώτη σελίδα μετά την αναζήτηση
  }
