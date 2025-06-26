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

// Current filter state
const filterState = {
    propertyType: 'Svi tipovi',
    city: 'Svi gradovi',
    location: 'Sve lokacije',
    bedrooms: 'Sve',
    bathrooms: 'Sve'
};

// Filter Handlers
const handleFilterClick = (event) => {
    const button = event.currentTarget;
    const dropdown = button.nextElementSibling;
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    
    // Close all other dropdowns
    document.querySelectorAll('.filter-button[aria-expanded="true"]').forEach(btn => {
        if (btn !== button) {
            btn.setAttribute('aria-expanded', 'false');
            btn.nextElementSibling.hidden = true;
        }
    });

    // Toggle current dropdown
    button.setAttribute('aria-expanded', !isExpanded);
    dropdown.hidden = isExpanded;
};

const handleFilterOptionClick = (event) => {
    const option = event.target;
    const dropdown = option.parentElement;
    const button = dropdown.previousElementSibling;
    const valueSpan = button.querySelector('.filter-value');
    const filterLabel = button.querySelector('.filter-label').textContent;
    
    valueSpan.textContent = option.textContent;
    button.setAttribute('aria-expanded', 'false');
    dropdown.hidden = true;

    // Update filter state
    switch (filterLabel) {
        case 'Tip nekretnine':
            filterState.propertyType = option.textContent;
            break;
        case 'Grad':
            filterState.city = option.textContent;
            break;
        case 'Lokacija':
            filterState.location = option.textContent;
            break;
        case 'Spavaća soba':
            filterState.bedrooms = option.textContent;
            break;
        case 'Broj kupatila':
            filterState.bathrooms = option.textContent;
            break;
    }

    applyFilters();
};

const handleClearFilters = () => {
    // Reset filter state
    filterState.propertyType = 'Svi tipovi';
    filterState.city = 'Svi gradovi';
    filterState.location = 'Sve lokacije';
    filterState.bedrooms = 'Sve';
    filterState.bathrooms = 'Sve';

    // Reset UI
    document.querySelectorAll('.filter-button').forEach(button => {
        const filterLabel = button.querySelector('.filter-label').textContent;
        const valueSpan = button.querySelector('.filter-value');
        
        switch (filterLabel) {
            case 'Tip nekretnine':
                valueSpan.textContent = 'Svi tipovi';
                break;
            case 'Grad':
                valueSpan.textContent = 'Svi gradovi';
                break;
            case 'Lokacija':
                valueSpan.textContent = 'Sve lokacije';
                break;
            case 'Spavaća soba':
                valueSpan.textContent = 'Sve';
                break;
            case 'Broj kupatila':
                valueSpan.textContent = 'Sve';
                break;
        }
    });

    // Show all cards
    applyFilters();
};

const applyFilters = () => {
    const propertyCards = document.querySelectorAll('.property-card');

    propertyCards.forEach(card => {
        let shouldShow = true;

        // Property Type filter
        if (filterState.propertyType !== 'Svi tipovi') {
            const cardType = card.dataset.type;
            const filterTypeMap = {
                'Kupovina': 'kupovina',
                'Izdavanje': 'izdavanje',
                'Poslovni prostor': 'poslovni-prostor'
            };
            shouldShow = shouldShow && cardType === filterTypeMap[filterState.propertyType];
        }

        // City filter
        if (filterState.city !== 'Svi gradovi') {
            const cardCity = card.querySelector('.city').textContent;
            shouldShow = shouldShow && cardCity === filterState.city;
        }

        // Location filter
        if (filterState.location !== 'Sve lokacije') {
            const cardLocation = card.querySelector('.district').textContent;
            shouldShow = shouldShow && cardLocation === filterState.location;
        }

        // Bedrooms filter
        if (filterState.bedrooms !== 'Sve') {
            const bedroomFeature = card.querySelector('.feature span:not(.feature-icon)');
            if (bedroomFeature && bedroomFeature.textContent !== 'Open Space') {
                const cardBedrooms = parseInt(bedroomFeature.textContent);
                const requiredBedrooms = parseInt(filterState.bedrooms);
                shouldShow = shouldShow && cardBedrooms >= requiredBedrooms;
            } else if (bedroomFeature && bedroomFeature.textContent === 'Open Space') {
                shouldShow = filterState.bedrooms === 'Open Space';
            }
        }

        // Bathrooms filter
        if (filterState.bathrooms !== 'Sve') {
            const bathroomFeature = card.querySelectorAll('.feature span:not(.feature-icon)')[1];
            if (bathroomFeature) {
                const cardBathrooms = parseInt(bathroomFeature.textContent);
                const requiredBathrooms = parseInt(filterState.bathrooms);
                shouldShow = shouldShow && cardBathrooms >= requiredBathrooms;
            }
        }

        // Apply visibility
        card.style.display = shouldShow ? '' : 'none';
    });

    // Update grid layout
    const visibleCards = document.querySelectorAll('.property-card[style=""]').length;
    const grid = document.querySelector('.listings-grid');
    if (grid) {
        grid.style.justifyContent = visibleCards < 3 ? 'start' : 'space-between';
    }
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

    // Add click handlers to filter buttons
    document.querySelectorAll('.filter-button').forEach(button => {
        button.addEventListener('click', handleFilterClick);
    });

    // Add click handlers to filter options
    document.querySelectorAll('.filter-option').forEach(option => {
        option.addEventListener('click', handleFilterOptionClick);
    });

    // Add click handler to clear filters button
    const clearButton = document.querySelector('.clear-filters');
    if (clearButton) {
        clearButton.addEventListener('click', handleClearFilters);
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', (event) => {
        if (!event.target.closest('.filter-group')) {
            document.querySelectorAll('.filter-button[aria-expanded="true"]').forEach(button => {
                button.setAttribute('aria-expanded', 'false');
                button.nextElementSibling.hidden = true;
            });
        }
    });
});

// The shine effect is now handled entirely by CSS animations
// Previous animation code removed as it's no longer needed 