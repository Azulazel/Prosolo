document.addEventListener('DOMContentLoaded', () => {
    // 1. Hamburger Menu
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');
    const header = document.querySelector('header'); // Get the header element

    if (hamburger && navLinks && header) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            header.classList.toggle('menu-open'); // Toggle a class on the header
        });
    }

    // 2. Interactive Header
    if (header) {
        let scrollThreshold = 50;
        const heroSection = document.getElementById('inicio');
        const isHomePage = document.body.classList.contains('home-page');

        const calculateThreshold = () => {
            if (isHomePage && heroSection) {
                // O header muda quando o scroll passar da altura da seção hero, menos a altura do próprio header.
                // Usamos Math.max para garantir que o threshold não seja menor que um valor mínimo (ex: 70px).
                scrollThreshold = Math.max(70, heroSection.offsetHeight - header.offsetHeight);
            } else {
                scrollThreshold = 50;
            }
        };

        const updateHeader = () => {
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        };

        calculateThreshold();
        updateHeader();

        window.addEventListener('scroll', updateHeader);
        window.addEventListener('resize', () => {
            calculateThreshold();
            updateHeader();
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

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

    // 5. WhatsApp Redirect for Contact Form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const contact = document.getElementById('contact').value;
            const message = document.getElementById('message').value;

            const companyNumber = '5531971735566';
            const text = `Olá! Meu nome é ${name} (${contact}).\n\n${message}`;

            const whatsappUrl = `https://wa.me/${companyNumber}?text=${encodeURIComponent(text)}`;

            window.open(whatsappUrl, '_blank');
        });
    }
});
