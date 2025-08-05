document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Sprawdź zapisany tryb w localStorage
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    // Ustaw początkowy tryb
    htmlElement.setAttribute('data-bs-theme', savedTheme);
    updateButtonIcon(savedTheme);
    
    // Obsługa przycisku z animacją
    themeToggle.addEventListener('click', function() {
        this.classList.add('animate__animated', 'animate__rubberBand');
        
        const currentTheme = htmlElement.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        htmlElement.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateButtonIcon(newTheme);
        
        setTimeout(() => {
            this.classList.remove('animate__animated', 'animate__rubberBand');
        }, 1000);
    });
    
    function updateButtonIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            themeToggle.classList.remove('btn-outline-light');
            themeToggle.classList.add('btn-outline-dark');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            themeToggle.classList.remove('btn-outline-dark');
            themeToggle.classList.add('btn-outline-light');
        }
    }
});