document.addEventListener('DOMContentLoaded', () => {
    // Get category from URL
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'general';
    
    // Set category title
    const categoryTitle = document.getElementById('categoryTitle');
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    
    // Load category data
    loadCategoryData(category);
    
    // Set up search functionality
    const searchInput = document.getElementById('searchInput');
    const clearButton = document.getElementById('clearSearch');
    
    searchInput.addEventListener('input', filterTiles);
    clearButton.addEventListener('click', () => {
        searchInput.value = '';
        filterTiles();
    });
});

function loadCategoryData(category) {
    fetch('categories.json')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load categories data: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Categories data loaded successfully:", data);
            
            // Get data for current category or use empty array if not found
            const items = data[category] || [];
            console.log(`Items for category '${category}':`, items);
            
            // Generate tiles
            const tileContainer = document.getElementById('tileContainer');
            if (!tileContainer) {
                console.error("Element with ID 'tileContainer' not found in the document");
                return;
            }
            tileContainer.innerHTML = '';
            
            items.forEach((item, index) => {
                const tile = document.createElement('a');
                tile.href = `viewer.html?category=${category}&id=${item.id}`;
                tile.className = 'tile';
                tile.dataset.title = item.title.toLowerCase();
                tile.style.animationDelay = `${index * 0.1}s`;
                
                tile.innerHTML = `
                    <div class="tile-content">
                        <img src="images/${category}/${item.icon}" alt="${item.title}">
                        <span>${item.title}</span>
                    </div>
                `;
                
                tileContainer.appendChild(tile);
            });
        })
        .catch(error => {
            console.error('Error loading category data:', error);
            // Error logging
            const tileContainer = document.getElementById('tileContainer');
            if (tileContainer) {
                tileContainer.innerHTML = `<div class="error-message">Failed to load content: ${error.message}</div>`;
            } else {
                console.error("Could not display error message - tileContainer not found");
            }
        });
}

function filterTiles() {
    const searchText = document.getElementById('searchInput').value.toLowerCase();
    const tiles = document.querySelectorAll('.tile');
    const noResults = document.getElementById('noResults');
    
    let visibleCount = 0;
    
    tiles.forEach(tile => {
        const tileTitle = tile.dataset.title;
        
        // Normalize search terms (handle "wifi", "wi fi", "wi-fi", etc.)
        const normalizedTitle = tileTitle.replace(/[-\s]/g, '');
        const normalizedSearch = searchText.replace(/[-\s]/g, '');
        
        if (normalizedTitle.includes(normalizedSearch) || tileTitle.includes(searchText)) {
            tile.style.display = '';
            visibleCount++;
        } else {
            tile.style.display = 'none';
        }
    });
    
    // Show or hide "no results" message
    if (visibleCount === 0 && searchText !== '') {
        noResults.classList.remove('hidden');
    } else {
        noResults.classList.add('hidden');
    }
}