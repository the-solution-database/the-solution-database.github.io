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
    const response = await fetch('../categories.json');
    const sampleData = await response.json();
    // Get data for current category or use empty array if not found
    const items = infoData[category] || [];
    
    // Generate tiles
    const tileContainer = document.getElementById('tileContainer');
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