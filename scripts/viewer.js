document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'general';
    const id = urlParams.get('id');

    const backButton = document.getElementById('backButton');
    backButton.href = `category.html?category=${category}`;

    if (id) {
        loadMarkdownContent(category, id);
    } else {
        document.getElementById('markdownContent').innerHTML = '<div class="error">No solution specified</div>';
    }
});

function loadMarkdownContent(category, id) {
    const markdownPath = `markdown/${category}/${id}.md`;
    const titleElement = document.getElementById('solutionTitle');
    const contentElement = document.getElementById('markdownContent');

    const formattedTitle = id
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    titleElement.textContent = formattedTitle;

    fetch(markdownPath)
        .then(response => response.text())
        .then(markdown => {
            contentElement.innerHTML = marked.parse(markdown);
        })
        .catch(() => {
            contentElement.innerHTML = '<div class="error">Failed to load content (Or this page is under construction)</div>';
        });
}
