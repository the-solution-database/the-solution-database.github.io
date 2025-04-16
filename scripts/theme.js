document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#checkbox');

    // dark theme default
    if (localStorage.getItem('theme') !== 'light') {
        document.body.classList.add('dark-theme');
        themeToggle.checked = false;
    } else {
        document.body.classList.remove('dark-theme');
        themeToggle.checked = true;
    }

    // Handle theme toggle
    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.remove('dark-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
});
