document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const header = document.getElementById('header');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Sticky header styling on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('shadow-md', 'py-2');
            header.classList.remove('py-4');
            // Hide topbar on scroll for cleaner look
            header.style.top = '0';
        } else {
            header.classList.remove('shadow-md', 'py-2');
            header.classList.add('py-4');
            if(window.innerWidth >= 768) {
                header.style.top = '36px'; // Account for topbar height
            }
        }
    });

    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            menuBtn.querySelector('i').classList.remove('fa-times');
            menuBtn.querySelector('i').classList.add('fa-bars');
        });
    });
});

// FAQ accordion toggle (flexible for both homepage and service pages)
function toggleFaq(element) {
    const item = element.closest('.faq-item');
    if (!item) return;
    
    const answer = item.querySelector('.faq-answer');
    const iconContainer = item.querySelector('.faq-icon');
    const iconI = item.querySelector('.faq-icon i');
    
    // Detect open state (handles both 'hidden' class and Tailwind max-h classes)
    const isHidden = answer.classList.contains('hidden');
    const isCollapsed = answer.classList.contains('max-h-0');
    const isOpen = !isHidden && !isCollapsed;

    // Close other items in the same container
    const container = item.closest('#faq-accordion') || item.closest('.space-y-4');
    if (container) {
        container.querySelectorAll('.faq-item').forEach(otherItem => {
            if (otherItem !== item) {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                const otherIconContainer = otherItem.querySelector('.faq-icon');
                const otherIconI = otherItem.querySelector('.faq-icon i');
                
                if (otherAnswer) {
                    otherAnswer.classList.add('hidden', 'max-h-0', 'opacity-0');
                    otherAnswer.classList.remove('max-h-96', 'opacity-100');
                }
                if (otherIconI) {
                    otherIconI.classList.remove('rotate-45', 'fa-minus');
                    otherIconI.classList.add('fa-plus');
                } else if (otherIconContainer) {
                    otherIconContainer.textContent = '+';
                }
            }
        });
    }

    // Toggle current item
    if (isOpen) {
        answer.classList.add('hidden', 'max-h-0', 'opacity-0');
        answer.classList.remove('max-h-96', 'opacity-100');
        if (iconI) {
            iconI.classList.remove('rotate-45', 'fa-minus');
            iconI.classList.add('fa-plus');
        } else if (iconContainer) {
            iconContainer.textContent = '+';
        }
    } else {
        answer.classList.remove('hidden', 'max-h-0', 'opacity-0');
        answer.classList.add('max-h-96', 'opacity-100');
        if (iconI) {
            iconI.classList.add('rotate-45', 'fa-minus');
            iconI.classList.remove('fa-plus');
        } else if (iconContainer) {
            iconContainer.textContent = '−';
        }
    }
}

