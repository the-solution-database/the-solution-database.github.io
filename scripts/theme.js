document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#checkbox');

    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        themeToggle.checked = true;
    } else {
        themeToggle.checked = false;
    }

    themeToggle.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
        }
    });
});
