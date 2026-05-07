// articles/lightbox.js (Updated for Freedom/Multiple Figures)

document.addEventListener('DOMContentLoaded', function() {
    const lightbox = document.getElementById('physics-lightbox');
    const lightboxImage = document.getElementById('lightbox-display');
    const closeBtn = document.getElementById('lightbox-close');
    
    // 1. Target ALL elements with the class 'clickable-plot'
    const figures = document.getElementsByClassName('clickable-plot');

    // 2. Loop through every figure found and add the same logic to each
    for (let figure of figures) {
        figure.addEventListener('click', function() {
            lightbox.style.display = 'flex'; // Open the window
            lightboxImage.src = this.src;     // Copy the plot source
        });
    }

    // 3. Close Logic (Remains unique/ID)
    closeBtn.addEventListener('click', function() {
        lightbox.style.display = 'none';
    });

    // 4. Background Click Logic (Remains unique/ID)
    lightbox.addEventListener('click', function(event) {
        if (event.target === this) {
            lightbox.style.display = 'none';
        }
    });
});
