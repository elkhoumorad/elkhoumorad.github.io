/* script-cours.js */

document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. LIGHTBOX (Zoom sur les images) ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.getElementById('close-lightbox');
    const zoomableImages = document.querySelectorAll('.zoomable-img');

    // Ouvrir la lightbox
    zoomableImages.forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Empêche de scroller derrière l'image
        });
    });

    // Fermer avec le bouton
    closeBtn.addEventListener('click', closeLightbox);

    // Fermer en cliquant n'importe où dans la zone noire
    lightbox.addEventListener('click', (e) => {
        if (e.target !== lightboxImg) {
            closeLightbox();
        }
    });

    // Fermer avec la touche Echap
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape" && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Réactive le scroll
    }

    // --- 2. SCROLL REVEAL ANIMATIONS ---
    // Cette fonction fait apparaître les sections du cours au fur et à mesure que l'élève descend
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100; // La section apparaît quand elle est à 100px du bas de l'écran

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    // Déclencher une fois au chargement, puis à chaque scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- 3. SMOOTH SCROLLING (Menu de gauche) ---
    document.querySelectorAll('.lesson-nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetSection.offsetTop - 100, // Laisse un espace avec le haut de l'écran
                behavior: 'smooth'
            });
        });
    });
});
