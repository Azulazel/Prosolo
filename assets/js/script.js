document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // 2. Interactive Header
    const header = document.querySelector('header');

    if (header) {
        const scrollThreshold = 50;
        const updateHeader = () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };
        window.addEventListener('scroll', updateHeader);
        updateHeader();
    }

    // 3. Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });

    // 4. Page Transitions
    const body = document.body;
    body.classList.add('body-visible'); // Fade in on load

    const allLinks = document.querySelectorAll('a');
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        // Apenas para links internos que não são âncoras vazias
        if (href && href.startsWith('/') && href !== window.location.pathname) {
            link.addEventListener('click', e => {
                e.preventDefault();
                body.classList.remove('body-visible'); // Fade out
                setTimeout(() => {
                    window.location.href = href;
                }, 400); // Tempo igual à transição do CSS
            });
        }
    });
});
