// articles/lightbox.js

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('physics-lightbox');
    const lightboxImage = document.getElementById('lightbox-display');
    
    // 1. Detect clicks on the SIDEBAR image
    document.getElementById('thumbnail-fig1').addEventListener('click', function() {
        lightbox.style.display = 'flex'; // Open the window
        lightboxImage.src = this.src;     // Copy the Whittaker plot source
    });

    // 2. Detect clicks on the CLOSE (x) button
    document.getElementById('lightbox-close').addEventListener('click', function() {
        lightbox.style.display = 'none'; // Close the window
    });

    // 3. Optional: Detect clicks on the dark background to close it
    lightbox.addEventListener('click', function(event) {
        if (event.target === this) {
            lightbox.style.display = 'none';
        }
    });
});
