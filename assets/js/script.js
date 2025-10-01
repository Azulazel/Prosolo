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
