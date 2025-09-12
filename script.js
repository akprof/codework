// Nature's Essence - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initSmoothScrolling();
    initAddToCart();
    initContactForm();
    initNewsletterSignup();
    initScrollAnimations();
});

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Shopping cart functionality (placeholder)
let cart = [];

function initAddToCart() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productType = this.getAttribute('data-product');
            addToCart(productType);
        });
    });
}

function addToCart(productType) {
    // Simple cart functionality - in a real app, this would connect to a backend
    const products = {
        'single': { name: 'Single Bottle', price: 29.99 },
        'bundle-3': { name: '3-Bottle Bundle', price: 79.99 },
        'bundle-6': { name: '6-Bottle Bundle', price: 139.99 }
    };

    const product = products[productType];
    if (product) {
        cart.push(product);
        updateCartDisplay();

        // Show success message
        showNotification(`Added ${product.name} to cart!`, 'success');
    }
}

function updateCartDisplay() {
    // Update cart count in navbar (placeholder - would need cart icon in navbar)
    const cartCount = cart.length;
    console.log(`Cart items: ${cartCount}`);

    // In a real implementation, you'd update a cart icon/badge
    // For now, just log the cart contents
    console.log('Cart contents:', cart);
}

// Contact form handling
function initContactForm() {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = new FormData(this);
            const data = Object.fromEntries(formData);

            // Simulate form submission
            console.log('Contact form submitted:', data);

            // Show success message
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');

            // Reset form
            this.reset();
        });
    }
}

// Newsletter signup
function initNewsletterSignup() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');

    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const email = this.querySelector('input[type="email"]').value;

            if (email) {
                // Simulate newsletter signup
                console.log('Newsletter signup:', email);

                // Show success message
                showNotification('Thank you for subscribing! Welcome to our community.', 'success');

                // Reset form
                this.reset();
            }
        });
    });
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add notification styles
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${type === 'success' ? '#52b788' : '#e53e3e'};
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1001;
        font-weight: 500;
        max-width: 300px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;

    // Add to page
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Mobile menu toggle (if needed in future)
function initMobileMenu() {
    // Placeholder for mobile menu functionality
    // Could be added if navigation becomes more complex
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add some CSS for animations
const style = document.createElement('style');
style.textContent = `
    .animate-in {
        animation: fadeInUp 0.6s ease-out forwards;
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .notification {
        font-family: 'Inter', sans-serif;
    }
`;
document.head.appendChild(style);

// Export functions for potential use in other scripts
window.NaturesEssence = {
    addToCart,
    showNotification,
    updateCartDisplay
};
