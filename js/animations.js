document.addEventListener('DOMContentLoaded', function() {

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            

            this.classList.add('animate__animated', 'animate__rubberBand');
            this.innerHTML = '<i class="fas fa-check me-1"></i> Dodano';
            

            const cartCount = document.getElementById('cartCount');
            if (cartCount) {
                cartCount.textContent = parseInt(cartCount.textContent) + 1;
                cartCount.classList.add('animate__animated', 'animate__bounceIn');
                
                setTimeout(() => {
                    cartCount.classList.remove('animate__animated', 'animate__bounceIn');
                }, 1000);
            }
            
            setTimeout(() => {
                this.classList.remove('animate__animated', 'animate__rubberBand');
                this.innerHTML = '<i class="fas fa-cart-plus me-1"></i> Dodaj';
            }, 2000);
        });
    });


    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }


    if ('IntersectionObserver' in window) {
        const lazyImages = document.querySelectorAll('img.lazy');
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    img.classList.add('animate__animated', 'animate__fadeIn');
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    }


    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });


    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl, {
            animation: true
        });
    });
});