document.addEventListener('DOMContentLoaded', () => {
    const tiles = document.querySelectorAll('.tile');
    
    tiles.forEach((tile, index) => {
        tile.style.animationDelay = `${index * 0.1}s`;
    });
});