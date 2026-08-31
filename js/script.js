function uploadLogo() {
    const fileInput = document.getElementById('logoInput');
    const file = fileInput.files[0];

    if (!file) {
        alert('Please select a file first!');
        return;
    }

    // Check file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
        alert('File size exceeds 5MB limit!');
        return;
    }

    // Check file type
    const validTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image file (PNG, JPG, GIF, or WebP)!');
        return;
    }

    // Read and display the logo
    const reader = new FileReader();
    reader.onload = function(e) {
        const logoElement = document.getElementById('logo');
        logoElement.src = e.target.result;
        alert('Logo uploaded successfully!');
        // Save to localStorage for persistence
        localStorage.setItem('maktech-logo', e.target.result);
        fileInput.value = ''; // Clear input
    };
    reader.readAsDataURL(file);
}

// Load logo from localStorage on page load
window.addEventListener('load', function() {
    const savedLogo = localStorage.getItem('maktech-logo');
    if (savedLogo) {
        document.getElementById('logo').src = savedLogo;
    }
});

// Smooth scrolling for navigation links
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

// Form submission
document.querySelector('.contact-form form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will contact you soon.');
    this.reset();
});

// Add active navigation link styling on scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});