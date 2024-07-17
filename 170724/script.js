const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results-container');
const addWebsiteBtn = document.getElementById('add-website-btn');
const menuIcon = document.querySelector('.menu-icon');
const sideMenu = document.getElementById('side-menu');
const websiteSelection = document.getElementById('website-selection');
const closeMenuButton = document.getElementById('close-menu-btn');
const searchButton = document.getElementById('search-button'); // Get the search button

// Add this to the top of your script.js file
const searchContainer = document.querySelector('.search-container');
const suggestionContainer = document.createElement('div');
suggestionContainer.id = 'suggestion-container';
suggestionContainer.style.position = 'absolute';
suggestionContainer.style.width = '60%';
suggestionContainer.style.maxWidth = '800vh';
suggestionContainer.style.backgroundColor = '#444';
suggestionContainer.style.border = '1px solid #333';
suggestionContainer.style.borderRadius = '10px';
suggestionContainer.style.zIndex = '1000';
suggestionContainer.style.width = (searchInput.offsetWidth + 25) + 'px';
suggestionContainer.style.top = (searchInput.offsetHeight + 160) + 'px'; // Position below the search input field
searchContainer.appendChild(suggestionContainer);

// Function to fetch search suggestions from Wikipedia API
async function fetchSuggestions(query) {
  const response = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=${query}`);
  const data = await response.json();
  return data[1]; // Return the list of suggestions
}

// Function to display suggestions
function displaySuggestions(suggestions) {
  suggestionContainer.innerHTML = ''; // Clear previous suggestions
  suggestions.forEach(suggestion => {
    const suggestionElement = document.createElement('div');
    suggestionElement.classList.add('suggestion');
    suggestionElement.style.textAlign = 'left';
    suggestionElement.style.color = '#fff';
    suggestionElement.style.maxwidth = '1200px';
    suggestionElement.style.border = '1px solid #333';
    suggestionElement.style.padding = '8px';
    suggestionElement.style.cursor = 'pointer';
    suggestionElement.textContent = suggestion;
    suggestionElement.addEventListener('click', () => {
      searchInput.value = suggestion; // Populate the search input with the selected suggestion
      suggestionContainer.innerHTML = ''; // Clear suggestions
      updateSearchResults(); // Trigger search results update
    });
    suggestionContainer.appendChild(suggestionElement);
  });
}

// Event listener for search input changes
searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim();
  if (query.length > 2) { // Fetch suggestions only if query length is greater than 2
    const suggestions = await fetchSuggestions(query);
    displaySuggestions(suggestions);
  } else {
    suggestionContainer.innerHTML = ''; // Clear suggestions if query is too short
  }
});

// Hide suggestions when clicking outside the search input or suggestions
document.addEventListener('click', (event) => {
  if (!searchContainer.contains(event.target) && !suggestionContainer.contains(event.target)) {
    suggestionContainer.innerHTML = ''; // Clear suggestions
  }
});




// Categorized websites 
const platforms = {
  'Search Engines': [
    {
      name: 'Google',
      logo: 'https://image.similarpng.com/very-thumbnail/2020/06/Logo-google-icon-PNG.png', 
      searchUrl: 'https://www.google.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Bing',
      logo: 'https://www.thewindowsclub.com/wp-content/uploads/2020/11/Bing-Logo-1.png',
      searchUrl: 'https://www.bing.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'DuckDuckGo',
      logo: 'https://duckduckgo.com/assets/icons/meta/DDG-icon_256x256.png',
      searchUrl: 'https://duckduckgo.com/',
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'Social Media': [
    {
      name: 'YouTube',
      logo: 'https://cdn-icons-png.flaticon.com/256/1384/1384060.png',
      searchUrl: 'https://www.youtube.com/results',
      searchQueryParameter: 'search_query' // Parameter for search queries
    },
    {
      name: 'Twitter',
      logo: 'https://abs.twimg.com/favicons/twitter.ico',
      searchUrl: 'https://twitter.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Facebook',
      logo: 'https://www.facebook.com/favicon.ico',
      searchUrl: 'https://www.facebook.com/search/top',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Telegram',
      logo: 'https://cdn-icons-png.flaticon.com/512/2111/2111646.png',
      searchUrl: 'https://web.telegram.org/a/', // Search URL for Telegram
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Medium',
      logo: 'https://cdn-icons-png.flaticon.com/512/5968/5968906.png',
      searchUrl: 'https://medium.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'Shopping': [
    {
      name: 'Amazon',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png',
      searchUrl: 'https://www.amazon.in/s',
      searchQueryParameter: 'k' // Parameter for search queries
    },
    {
      name: 'Flipkart',
      logo: 'https://uxwing.com/wp-content/themes/uxwing/download/brands-and-social-media/flipkart-icon.png', 
      searchUrl: 'https://www.flipkart.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Myntra',
      logo: 'https://image.pngaaa.com/360/405360-middle.png',
      searchUrl: 'https://www.myntra.com/{search}',
      searchQueryParameter: 'rawQuery' // Parameter for search queries
    }
  ],
  'Education': [
    {
      name: 'Wikipedia',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Wikipedia-logo-v2.svg/1200px-Wikipedia-logo-v2.svg.png',
      searchUrl: 'https://en.wikipedia.org/wiki/Special:Search', 
      searchQueryParameter: 'search' // Parameter for search queries
    },
    {
      name: 'Google Scholar',
      logo: 'https://scholar.google.com/favicon.ico',
      searchUrl: 'https://scholar.google.com/scholar',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Coursera',
      logo: 'https://www.coursera.org/favicon.ico',
      searchUrl: 'https://www.coursera.org/search',
      searchQueryParameter: 'query' // Parameter for search queries
    },
    {
      name: 'Khan Academy',
      logo: 'https://www.khanacademy.org/favicon.ico',
      searchUrl: 'https://www.khanacademy.org/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Duolingo',
      logo: 'https://e7.pngegg.com/pngimages/38/992/png-clipart-duolingo-logo-thumbnail-tech-companies-thumbnail.png',
      searchUrl: 'https://www.duolingo.com/search',
      searchQueryParameter: 'query' // Parameter for search queries
    },
    {
      name: 'PubMed',
      logo: 'https://www.ncbi.nlm.nih.gov/favicon.ico',
      searchUrl: 'https://pubmed.ncbi.nlm.nih.gov/', 
      searchQueryParameter: 'term' // Parameter for search queries
    }
  ],
  'News': [ // Add Google News to the News category
    {
      name: 'Google News',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Google_News_icon.svg/2503px-Google_News_icon.svg.png', 
      searchUrl: 'https://news.google.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'Entertainment': [
    {
      name: 'Spotify',
      logo: 'https://w7.pngwing.com/pngs/158/639/png-transparent-spotify-streaming-media-logo-playlist-spotify-app-icon-logo-music-download-circle-thumbnail.png',
      searchUrl: 'https://open.spotify.com/search/',
      searchQueryParameter: null // Parameter for search queries
    },
    {
      name: 'Netflix',
      logo: 'https://i.pinimg.com/originals/1b/54/ef/1b54efef3720f6ac39647fc420d4a6f9.png', 
      searchUrl: 'https://www.netflix.com/browse',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Amazon Prime Video',
      logo: 'https://static.vecteezy.com/system/resources/previews/019/766/188/original/prime-video-logo-prime-video-icon-transparent-logo-free-png.png',
      searchUrl: 'https://www.amazon.com/gp/video/storefront/ref=atv_hm_top_nav_storefront',
      searchQueryParameter: 'k' // Parameter for search queries
    }
  ],
  'Travel': [
    {
      name: 'Google Maps',
      logo: 'https://w7.pngwing.com/pngs/490/807/png-transparent-google-map-location-logo-icon.png',
      searchUrl: 'https://www.google.com/maps/search/',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'TripAdvisor',
      logo: 'https://www.tripadvisor.com/favicon.ico',
      searchUrl: 'https://www.tripadvisor.com/Search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Booking.com',
      logo: 'https://w7.pngwing.com/pngs/875/1014/png-transparent-booking-com-logo-square-tech-companies-thumbnail.png',
      searchUrl: 'https://www.booking.com/searchresults.html',
      searchQueryParameter: 'ss' // Parameter for search queries
    },
    {
      name: 'Skyscanner',
      logo: 'https://www.skyscanner.com/favicon.ico',
      searchUrl: 'https://www.skyscanner.com/transport/flights/hyd/',
      searchQueryParameter: null // Parameter for search queries
    }
  ],
  'Other': [
    {
      name: 'Stack Overflow',
      logo: 'https://stackoverflow.com/favicon.ico',
      searchUrl: 'https://stackoverflow.com/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Perplexity',
      logo: 'https://seeklogo.com/images/P/perplexity-ai-logo-13120A0AAE-seeklogo.com.png',
      searchUrl: 'https://www.perplexity.ai/search',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Quora',
      logo: 'https://www.quora.com/favicon.ico',
      searchUrl: 'https://www.quora.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Reddit',
      logo: 'https://www.iconpacks.net/icons/2/free-reddit-logo-icon-2436-thumb.png',
      searchUrl: 'https://www.reddit.com/search', 
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'Pinterest',
      logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Pinterest-logo.png',
      searchUrl: 'https://www.pinterest.com/search/pins',
      searchQueryParameter: 'q' // Parameter for search queries
    },
    {
      name: 'LinkedIn',
      logo: 'https://www.linkedin.com/favicon.ico',
      searchUrl: 'https://www.linkedin.com/search/results/all',
      searchQueryParameter: 'keywords' // Parameter for search queries
    },
    {
      name: 'Bing Image Creator',
      logo: 'https://imgeng.jagran.com/images/2023/mar/Bing%201679474760226.jpg', 
      searchUrl: 'https://www.bing.com/images/create', 
      searchQueryParameter: null // No search parameter, the user will be redirected to the page.
    },
    {
      name: 'IMDb',
      logo: 'https://cdn4.iconfinder.com/data/icons/logos-and-brands/512/171_Imdb_logo_logos-512.png',
      searchUrl: 'https://www.imdb.com/find', // Updated search URL for IMDb
      searchQueryParameter: 'q' // Parameter for search queries
    }
  ],
  'cars': [
    {
      name: 'carwale',
      logo: 'https://seekvectorlogo.com/wp-content/uploads/2020/10/carwale-vector-logo.png', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://www.carwale.com/',
      searchQueryParameter: 's'// No search parameter, the user will be redirected to the page.
    },
    {
      name: 'cardekho',
      logo: 'https://etimg.etb2bimg.com/photo/87261183.cms', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://www.cardekho.com/cars/',
      searchQueryParameter: null // No search parameter, the user will be redirected to the page.
    },
    {
      name: 'autocarindia',
      logo: 'https://apdirectory.haymarketsac.in/wp-content/uploads/2018/08/ACI-LOGO-WITHOUT-URL-white-BG-pdf.jpg', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://www.autocarindia.com/cars/',
      searchQueryParameter: null // No search parameter, the user will be redirected to the page.
    },
    {
      name: 'spinny',
      logo: 'https://static.ambitionbox.com/assets/v2/images/rs:fit:1280:960:false:false/bG9jYWw6Ly8vbG9nb3Mvb3JpZ2luYWxzL3NwaW5ueS5qcGc.png', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://www.spinny.com/',
      searchQueryParameter: 's' // No search parameter, the user will be redirected to the page.
    }
  ],

  'Movies': [
    {
      name: '5movierulz',
      logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGjrJsoXwfelPVcpO2n1QMszNC4HqyQaxuRA&s', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://www.5movierulz.bid/search_movies',
      searchQueryParameter: 's' // No search parameter, the user will be redirected to the page.
    },
    {
      name: 'iBomma',
      logo: 'https://www.example.com/favicon.ico', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://sit.ibomma.day/telugu-movies/',
      searchQueryParameter: null // No search parameter, the user will be redirected to the page.
    },
    {
      name: 'MyFlixerz',
      logo: 'https://cdn-www.bluestacks.com/bs-images/4e8a616925cc7daa486b5249581f28bd.png', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://myflixerz.org/search-query/',
      searchQueryParameter: null // No search parameter, the user will be redirected to the page.
    },
    {
      name: 'BollyFlix',
      logo: 'https://izigames.net/uploads/2024/4/bollyflix-apk-latest-version.png', // Placeholder for logo - you can add a way to get the logo dynamically later
      searchUrl: 'https://bollyflix.band/search/',
      searchQueryParameter: null // No search parameter, the user will be redirected to the page.
    }
  ]
};

// Function to create website checkboxes in the side menu
// Function to create website checkboxes in the side menu
let categoryOrder = Object.keys(platforms);

// Function to create website checkboxes in the side menu
// Function to save selected sites to localStorage
function saveSelectedSites() {
  const selectedSites = [];
  const checkboxes = websiteSelection.querySelectorAll('.website-item input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      selectedSites.push(checkbox.id);
    }
  });
  localStorage.setItem('selectedSites', JSON.stringify(selectedSites));
}

// Function to load selected sites from localStorage
function loadSelectedSites() {
  const selectedSites = JSON.parse(localStorage.getItem('selectedSites')) || [];
  const checkboxes = websiteSelection.querySelectorAll('.website-item input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    if (selectedSites.includes(checkbox.id)) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }
  });
  updateSearchResults();
}

// Update the createWebsiteCheckboxes function to call saveSelectedSites
function createWebsiteCheckboxes() {
  let html = '<button id="add-category-btn">Add Category</button><br>'; // Add the "Add Category" button at the top
  html += '<input type="text" id="site-search" placeholder="Search sites..."><br>'; // Add search bar
  categoryOrder.forEach(category => {
    html += `<div class="website-category" data-category="${category}">
              <h3>
                <input type="checkbox" class="category-checkbox" data-category="${category}">
                ${category}
                <button class="rename-category-btn" data-category="${category}">Rename</button>
              </h3>
              <div class="website-items">`;
    platforms[category].forEach(platform => {
      html += `<div class="website-item" data-website-name="${platform.name}"> 
                <div class="drag-handle">☰</div> <!-- Add drag handle -->
                <div class="website-checkbox">
                  <input type="checkbox" id="${platform.name}" name="${platform.name}">
                  <label for="${platform.name}">${platform.name}</label>
                </div>
                <button class="delete-btn" data-website-name="${platform.name}">Delete</button>
              </div>`;
    });
    html += `</div></div>`;
  });
  websiteSelection.innerHTML = html;

  // Event listener for checkboxes
  const checkboxes = websiteSelection.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
      updateSearchResults();
      saveSelectedSites(); // Save selected sites whenever a checkbox is changed
    });
  });

  // Event listener for category checkboxes
  const categoryCheckboxes = websiteSelection.querySelectorAll('.category-checkbox');
  categoryCheckboxes.forEach(categoryCheckbox => {
    categoryCheckbox.addEventListener('change', (event) => {
      const category = event.target.dataset.category;
      const isChecked = event.target.checked;
      const categoryItems = websiteSelection.querySelectorAll(`.website-category[data-category="${category}"] .website-item input[type="checkbox"]`);
      categoryItems.forEach(itemCheckbox => {
        itemCheckbox.checked = isChecked;
      });
      updateSearchResults();
      saveSelectedSites(); // Save selected sites whenever a category checkbox is changed
    });
  });

  // Add event listeners to rename category buttons
  const renameCategoryButtons = websiteSelection.querySelectorAll('.rename-category-btn');
  renameCategoryButtons.forEach(button => {
    button.addEventListener('click', () => {
      const oldCategoryName = button.dataset.category;
      const newCategoryName = prompt('Enter the new category name:', oldCategoryName);
      if (newCategoryName && newCategoryName !== oldCategoryName) {
        platforms[newCategoryName] = platforms[oldCategoryName];
        delete platforms[oldCategoryName];
        // Update the category order array
        const index = categoryOrder.indexOf(oldCategoryName);
        if (index !== -1) {
          categoryOrder[index] = newCategoryName;
        }
        createWebsiteCheckboxes(); // Update the checkboxes
        createCategoryButtons(); // Update the category buttons
        updateSearchResults(); // Update search results
      }
    });
  });

  // Initialize SortableJS for each category with handle
  const categories = websiteSelection.querySelectorAll('.website-category .website-items');
  categories.forEach(category => {
    new Sortable(category, {
      group: 'shared', // Allow dragging between categories
      animation: 150,
      handle: '.drag-handle', // Use the drag handle for sorting
      onEnd: (evt) => {
        const itemEl = evt.item; // dragged HTMLElement
        const oldCategory = evt.from.closest('.website-category').dataset.category;
        const newCategory = evt.to.closest('.website-category').dataset.category;
        const websiteName = itemEl.dataset.websiteName;

        // Find the website object
        const website = platforms[oldCategory].find(website => website.name === websiteName);

        // Remove from old category
        platforms[oldCategory] = platforms[oldCategory].filter(website => website.name !== websiteName);

        // Add to new category
        if (website) {
          platforms[newCategory].splice(evt.newIndex, 0, website);
        }

        // Update the checkboxes and search results
        createWebsiteCheckboxes();
        updateSearchResults();
      }
    });
  });

  // Add event listeners to delete buttons
  const deleteButtons = websiteSelection.querySelectorAll('.delete-btn');
  deleteButtons.forEach(button => {
    button.addEventListener('click', () => {
      const websiteName = button.dataset.websiteName; // Get the website name to delete

      // Find the category and index of the website to delete
      let categoryToDelete = null;
      let indexToDelete = null;

      for (const category in platforms) {
        const index = platforms[category].findIndex(website => website.name === websiteName);
        if (index !== -1) {
          categoryToDelete = category;
          indexToDelete = index;
          break;
        }
      }

      if (categoryToDelete && indexToDelete !== -1) {
        platforms[categoryToDelete].splice(indexToDelete, 1); // Remove the website
        createWebsiteCheckboxes(); // Update the checkboxes
        updateSearchResults(); // Update search results
      }
    });
  });

  // Add event listener for search bar
  const siteSearch = document.getElementById('site-search');
  siteSearch.addEventListener('input', () => {
    const searchTerm = siteSearch.value.toLowerCase();
    const websiteItems = websiteSelection.querySelectorAll('.website-item');
    websiteItems.forEach(item => {
      const websiteName = item.dataset.websiteName.toLowerCase();
      if (websiteName.includes(searchTerm)) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  });

  // Load selected sites from localStorage when the page loads
  loadSelectedSites();
}

// Call loadSelectedSites when the page loads
document.addEventListener('DOMContentLoaded', () => {
  createWebsiteCheckboxes();
  loadSelectedSites();
});

// Function to create category buttons
function createCategoryButtons() {
  const categoryButtonsContainer = document.getElementById('category-buttons');
  categoryButtonsContainer.innerHTML = ''; // Clear any existing buttons

  categoryOrder.forEach(category => {
    const button = document.createElement('button');
    button.classList.add('category-button');
    button.textContent = category;
    button.dataset.category = category; // Store the category name in the button's data attribute

    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.category;
      updateSearchResults(selectedCategory); // Update search results based on the selected category
    });

    categoryButtonsContainer.appendChild(button);
  });
}

// Event listener for the "Add Website" button (now in the header)
document.getElementById('add-website-btn').addEventListener('click', () => {
  const websiteName = prompt('Enter the website name:');
  const websiteUrl = prompt('Enter the website URL:');
  const category = prompt('Enter the category:');

  if (websiteName && websiteUrl && category) {
    if (!platforms[category]) {
      platforms[category] = [];
      categoryOrder.push(category);
    }
    platforms[category].push({ name: websiteName, searchUrl: websiteUrl });
    createWebsiteCheckboxes(); // Update the checkboxes
    createCategoryButtons(); // Update the category buttons
    updateSearchResults(); // Update search results
  }
});




// Function to extract search information from a sample URL
function extractSearchInfo(sampleSearchUrl) {
  const urlParts = new URL(sampleSearchUrl);
  const searchUrl = urlParts.origin + urlParts.pathname;
  const searchParams = new URLSearchParams(urlParts.search);
  let searchQueryParameter = null; // Initialize searchQueryParameter as null
  let searchTerm = null; // Initialize searchTerm as null

  // Check if there are any search parameters
  if (searchParams.has('q')) {
    searchQueryParameter = 'q'; // If 'q' parameter is present, use it
    searchTerm = searchParams.get('q');
  } else if (searchParams.has('k')) {
    searchQueryParameter = 'k'; // If 'k' parameter is present, use it
    searchTerm = searchParams.get('k');
  } else if (searchParams.has('rawQuery')) {
    searchQueryParameter = 'rawQuery'; // If 'rawQuery' parameter is present, use it
    searchTerm = searchParams.get('rawQuery');
  } // Add more 'else if' conditions for other query parameters

  return [searchUrl, searchQueryParameter, searchTerm];
}


// Function to update search results based on selected websites
// Function to update search results based on selected websites
// Function to update search results based on selected websites
// Modify the updateSearchResults function to handle @sitename searchterm
function updateSearchResults(selectedCategory = null) {
  const selectedPlatforms = [];
  const checkboxes = websiteSelection.querySelectorAll('input[type="checkbox"]:checked');
  checkboxes.forEach(checkbox => {
    selectedPlatforms.push(checkbox.id);
  });

  let searchTerm = searchInput.value.trim();
  let specificPlatform = null;

  // Check if the search term starts with @sitename
  if (searchTerm.startsWith('@')) {
    const parts = searchTerm.split(' ');
    const platformName = parts[0].substring(1); // Extract platform name without @
    searchTerm = parts.slice(1).join(' '); // Extract the actual search term

    // Find the platform object
    specificPlatform = Object.values(platforms).flat().find(platform => platform.name.toLowerCase() === platformName.toLowerCase());
  }

  resultsContainer.innerHTML = ''; // Clear previous results

  if (specificPlatform) {
    // Direct search on the specific platform
    const resultElement = document.createElement('a'); // Use 'a' for links
    resultElement.classList.add('result');
    // Construct the search URL
    if (specificPlatform.searchQueryParameter) {
      resultElement.href = `${specificPlatform.searchUrl}?${specificPlatform.searchQueryParameter}=${searchTerm}`; 
    } else {
      resultElement.href = `${specificPlatform.searchUrl}${searchTerm}`;
    }
    resultElement.target = '_blank'; // Open in a new tab 

    resultElement.addEventListener('click', () => {
      // Make it open in a new tab (or window)
      if (specificPlatform.searchQueryParameter) {
        window.open(`${specificPlatform.searchUrl}?${specificPlatform.searchQueryParameter}=${searchTerm}`, 'Search Window', 'width=600,height=400'); 
      } else {
        window.open(`${specificPlatform.searchUrl}${searchTerm}`, 'Search Window', 'width=600,height=400'); 
      }
    });

    resultElement.innerHTML = `
      <img src="${specificPlatform.logo}" class="platform-logo" alt="${specificPlatform.name} Logo">
      <div class="platform-name">${specificPlatform.name}</div>
    `;
    resultsContainer.appendChild(resultElement);
  } else if (selectedCategory) {
    // Show websites from the selected category only
    platforms[selectedCategory].forEach(platform => {
      const resultElement = document.createElement('a'); // Use 'a' for links
      resultElement.classList.add('result');
      // Construct the search URL
      if (platform.searchQueryParameter) {
        resultElement.href = `${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`; 
      } else {
        resultElement.href = `${platform.searchUrl}${searchTerm}`;
      }
      resultElement.target = '_blank'; // Open in a new tab 

      resultElement.addEventListener('click', () => {
        // Make it open in a new tab (or window)
        if (platform.searchQueryParameter) {
          window.open(`${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`, 'Search Window', 'width=600,height=400'); 
        } else {
          window.open(`${platform.searchUrl}${searchTerm}`, 'Search Window', 'width=600,height=400'); 
        }
      });

      resultElement.innerHTML = `
        <img src="${platform.logo}" class="platform-logo" alt="${platform.name} Logo">
        <div class="platform-name">${platform.name}</div>
      `;
      resultsContainer.appendChild(resultElement);
    });
  } else {
    // Show all results, as before
    selectedPlatforms.forEach(platformName => {
      const platform = platforms[Object.keys(platforms).find(category => platforms[category].some(p => p.name === platformName))]
                           .find(p => p.name === platformName);
      if (platform) {
        const resultElement = document.createElement('a'); // Use 'a' for links
        resultElement.classList.add('result');
        // Construct the search URL
        if (platform.searchQueryParameter) {
          resultElement.href = `${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`; 
        } else {
          resultElement.href = `${platform.searchUrl}${searchTerm}`; // Append searchTerm directly to the URL path
        }
        resultElement.target = '_blank'; // Open in a new tab 

        resultElement.addEventListener('click', () => {
          // Make it open in a new tab (or window)
          if (platform.searchQueryParameter) {
            window.open(`${platform.searchUrl}?${platform.searchQueryParameter}=${searchTerm}`, 'Search Window', 'width=600,height=400'); 
          } else {
            window.open(`${platform.searchUrl}${searchTerm}`, 'Search Window', 'width=600,height=400'); 
          }
        });

        resultElement.innerHTML = `
          <img src="${platform.logo}" class="platform-logo" alt="${platform.name} Logo">
          <div class="platform-name">${platform.name}</div>
        `;
        resultsContainer.appendChild(resultElement);
      }
    });
  }
}

// Function to create category buttons
function createCategoryButtons() {
  const categoryButtonsContainer = document.getElementById('category-buttons');
  categoryButtonsContainer.innerHTML = ''; // Clear any existing buttons

  categoryOrder.forEach(category => {
    const button = document.createElement('button');
    button.classList.add('category-button');
    button.textContent = category;
    button.dataset.category = category; // Store the category name in the button's data attribute

    button.addEventListener('click', () => {
      const selectedCategory = button.dataset.category;
      updateSearchResults(selectedCategory); // Update search results based on the selected category
    });

    categoryButtonsContainer.appendChild(button);
  });
}

// Event listener for the "Add Website" button (now in the header)
addWebsiteBtn.addEventListener('click', () => {
  // Prompt for website name
  const newWebsiteName = prompt('Enter the name of the website:', '');

  // Prompt for a sample search URL
  const sampleSearchUrl = prompt('Enter a sample search URL from this website (e.g., "https://www.google.com/search?q=example"):', '');

  if (newWebsiteName && sampleSearchUrl) {
    if (isValidUrl(sampleSearchUrl)) { // Validate the URL
      const [searchUrl, searchQueryParameter, searchTerm] = extractSearchInfo(sampleSearchUrl);

      if (searchUrl && searchQueryParameter) {
        const newWebsite = {
          name: newWebsiteName,
          logo: 'https://www.example.com/favicon.ico', // Placeholder for logo - you can add a way to get the logo dynamically later
          searchUrl: searchUrl,
          searchQueryParameter: searchQueryParameter // Store the search query parameter
        };

        // Add the new website to a suitable category (you'll need to implement logic for this)
        platforms['Other'].push(newWebsite);

        // Update the side menu with the new website
        createWebsiteCheckboxes();
        updateSearchResults();
        createCategoryButtons();
      } else {
        alert('Please enter a valid sample search URL.');
      }
    } else {
      alert('Please enter a valid website URL.');
    }
  }
});



// Event listener for the menu icon
menuIcon.addEventListener('click', () => {
  sideMenu.classList.toggle('show');
  menuIcon.classList.toggle('active'); // Add active class to the menu icon
});

// Event listener for the close menu button
closeMenuButton.addEventListener('click', () => {
  sideMenu.classList.remove('show');
  menuIcon.classList.remove('active'); // Remove active class from the menu icon
});

// Initialize the side menu with website checkboxes
createWebsiteCheckboxes();

// Initial update of search results
updateSearchResults();

// Event listener for search input (now uses the search button)
searchButton.addEventListener('click', () => {
  updateSearchResults(); // Update results when the button is clicked
});

searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    updateSearchResults(); // Update results when Enter key is pressed
  }
});

// Function to validate the URL
function isValidUrl(url) {
  const urlRegex = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\.-]+(?:\/[\w\.\-]+)*\/?$/;
  return urlRegex.test(url);
}

// Create category buttons on page load
createCategoryButtons();