// Menu toggle functionality
const handleMenuToggle = () => {
    const menuToggle = document.querySelector('.header__menu-toggle');
    const nav = document.querySelector('.header__nav');

    if (!menuToggle || !nav) return;

    const handleClick = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    // Close menu when clicking outside
    const handleClickOutside = (event) => {
        if (
            menuToggle.getAttribute('aria-expanded') === 'true' &&
            !nav.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    };

    menuToggle.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleClickOutside);
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    handleMenuToggle();

    const shineElements = document.querySelectorAll('.shine-effect');
    
    shineElements.forEach(element => {
        const text = element.textContent;
        element.textContent = ''; // Clear the element
        
        // Create spans for each letter
        [...text].forEach((letter, index) => {
            const span = document.createElement('span');
            span.textContent = letter;
            span.style.opacity = '1';
            span.className = 'letter';
            element.appendChild(span);
        });
    });

    function animateLetters() {
        const words = document.querySelectorAll('.shine-effect');
        let totalDelay = 0;

        words.forEach(word => {
            const letters = word.querySelectorAll('.letter');
            letters.forEach((letter, index) => {
                setTimeout(() => {
                    letter.classList.add('shine');
                    // Remove the class after animation
                    setTimeout(() => {
                        letter.classList.remove('shine');
                    }, 500); // Duration of shine
                }, totalDelay + (index * 200)); // 200ms delay between letters
            });
            // Add delay for next word
            totalDelay += letters.length * 200 + 500;
        });

        // Restart animation after all letters are done
        setTimeout(animateLetters, totalDelay + 1000);
    }

    // Start animation
    setTimeout(animateLetters, 1000);
});

// The shine effect is now handled entirely by CSS animations
// Previous animation code removed as it's no longer needed 