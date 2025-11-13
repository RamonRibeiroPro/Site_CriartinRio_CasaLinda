document.addEventListener('DOMContentLoaded', () => {
    // Menu Mobile
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (burgerMenu && navLinks) {
        burgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            burgerMenu.classList.toggle('toggle');
        });
    }

    // Carrossel de Produtos
    const productGrid = document.getElementById('productGrid');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (productGrid && prevBtn && nextBtn) {
        let currentIndex = 0;
        const products = productGrid.children;
        const totalProducts = products.length;
        const productsPerView = window.innerWidth <= 768 ? 1 : window.innerWidth <= 1024 ? 3 : 5;
        
        function updateCarousel() {
            const translateX = -(currentIndex * (100 / productsPerView));
            productGrid.style.transform = `translateX(${translateX}%)`;
        }
        
        prevBtn.addEventListener('click', () => {
            currentIndex = currentIndex > 0 ? currentIndex - 1 : Math.max(0, totalProducts - productsPerView);
            updateCarousel();
        });
        
        nextBtn.addEventListener('click', () => {
            currentIndex = currentIndex < totalProducts - productsPerView ? currentIndex + 1 : 0;
            updateCarousel();
        });
        
        // Auto-play do carrossel
        setInterval(() => {
            currentIndex = currentIndex < totalProducts - productsPerView ? currentIndex + 1 : 0;
            updateCarousel();
        }, 5000);
    }

    // Animações de Scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Aplicar animações aos elementos
    const animatedElements = document.querySelectorAll('.benefit-item, .product-item, .about-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Smooth Scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Efeito de hover nos ícones de navegação
    const navIcons = document.querySelectorAll('.nav-icons i');
    navIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'scale(1.2) rotate(10deg)';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Efeito de parallax no hero
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Loading animation para imagens
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
        }
    });

    // Contador animado (se necessário)
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            element.textContent = Math.floor(current);
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            }
        }, 20);
    }

    // Aplicar contador aos números (se houver)
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        observer.observe(counter);
        counter.addEventListener('intersect', () => {
            animateCounter(counter, target);
        });
    });
});

