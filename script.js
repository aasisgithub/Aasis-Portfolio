document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();
    
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeToggleMobile = document.getElementById('theme-toggle-mobile');
    const moonIcons = document.querySelectorAll('.moon-icon');
    const sunIcons = document.querySelectorAll('.sun-icon');
    
    
    // Check for saved theme preference or use preferred color scheme
    function applyTheme() {
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
            document.body.classList.add('dark');
            moonIcons.forEach(icon => {
                icon.style.opacity = '0';
                icon.style.transform = 'rotate(180deg)';
            });
            sunIcons.forEach(icon => {
                icon.style.opacity = '1';
                icon.style.transform = 'rotate(0deg)';
            });
        } else {
            document.body.classList.remove('dark');
            moonIcons.forEach(icon => {
                icon.style.opacity = '1';
                icon.style.transform = 'rotate(0deg)';
            });
            sunIcons.forEach(icon => {
                icon.style.opacity = '0';
                icon.style.transform = 'rotate(180deg)';
            });
        }
    }
    
    // Apply theme on page load
    applyTheme();
    
    function toggleTheme() {
        const isDark = document.body.classList.toggle('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Smooth transition for icons
        moonIcons.forEach(icon => {
            icon.style.opacity = isDark ? '0' : '1';
            icon.style.transform = isDark ? 'rotate(180deg)' : 'rotate(0deg)';
        });
        sunIcons.forEach(icon => {
            icon.style.opacity = isDark ? '1' : '0';
            icon.style.transform = isDark ? 'rotate(180deg)' : 'rotate(180deg)';
        });
    }
    
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) {
            applyTheme();
        }
    });

// Mobile menu toggle - Updated to match your CSS classes
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

if (mobileMenuToggle && mobileMenu && menuIcon && closeIcon) {
    mobileMenuToggle.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Toggle menu visibility (using 'open' class from your CSS)
        mobileMenu.classList.toggle('open');
        
        // Toggle icon visibility
        if (mobileMenu.classList.contains('open')) {
            menuIcon.style.display = 'none';
            closeIcon.style.display = 'block';
        } else {
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
        }
        
        // Optional: Toggle body scroll when menu is open
        document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    
    // Close menu when clicking on menu items
    const menuItems = mobileMenu.querySelectorAll('button');
    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            mobileMenu.classList.remove('open');
            menuIcon.style.display = 'block';
            closeIcon.style.display = 'none';
            document.body.style.overflow = '';
        });
    });
}
    
    // Scroll header effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Smooth scrolling for navigation
    function handleNavigation(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        
        // Close mobile menu if open
        if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
            mobileMenu.classList.add('hidden');
            menuIcon.classList.remove('hidden');
            closeIcon.classList.add('hidden');
        }
    }
    
    // Type animation for hero section
    const typeAnimation = document.getElementById('type-animation');
    if (typeAnimation) {
        const sequences = [
            "Hi, I'm Aasis Shrestha",
            2000,
            'Developer & UI UX Designer',
            2000,
            'Welcome to My Portfolio',
            2000
        ];
        
        let sequenceIndex = 0;
        let text = '';
        let isDeleting = false;
        let typingSpeed = 100;
        
        function type() {
            const currentSequence = sequences[sequenceIndex % sequences.length];
            
            if (typeof currentSequence === 'string') {
                if (isDeleting) {
                    text = currentSequence.substring(0, text.length - 1);
                } else {
                    text = currentSequence.substring(0, text.length + 1);
                }
                
                typeAnimation.textContent = text;
                
                if (!isDeleting && text === currentSequence) {
                    typingSpeed = 2000;
                    isDeleting = true;
                } else if (isDeleting && text === '') {
                    isDeleting = false;
                    sequenceIndex++;
                    typingSpeed = 100;
                } else if (isDeleting) {
                    typingSpeed = 50;
                } else {
                    typingSpeed = 100;
                }
            } else {
                typingSpeed = currentSequence;
                sequenceIndex++;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        setTimeout(type, 1000);
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
                bar.style.transition = 'width 1s ease 0.2s';
            }, 100);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px'
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('skills-grid')) {
                    animateSkillBars();
                }
                
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
    
    // Contact form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = document.getElementById('submit-button');
            const formStatus = document.getElementById('form-status');
            
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
            formStatus.textContent = '';
            formStatus.className = '';
            
            // Initialize EmailJS
            emailjs.init('I4rQRyN11ZMjCsPj8');
            
            emailjs.sendForm('service_wxw92vr', 'template_30seazf', contactForm)
                .then(() => {
                    formStatus.textContent = 'Message sent successfully!';
                    formStatus.className = 'success';
                    contactForm.reset();
                }, (error) => {
                    formStatus.textContent = 'Failed to send message. Please try again.';
                    formStatus.className = 'error';
                    console.error('EmailJS Error:', error);
                })
                .finally(() => {
                    submitButton.disabled = false;
                    submitButton.textContent = 'Send Message';
                });
        });
    }
    
    // Initialize EmailJS
    (function() {
        emailjs.init('I4rQRyN11ZMjCsPj8');
    })();

    // CV Download Functionality
    const downloadCvButton = document.getElementById('download-cv');
    if (downloadCvButton) {
        downloadCvButton.addEventListener('click', function() {
            // Replace with the actual path to your CV file
            const cvUrl = 'images/AasisShrestha_CV.pdf';
            
            // Create a temporary anchor element
            const link = document.createElement('a');
            link.href = cvUrl;
            link.download = 'AasisShrestha-CV.pdf'; // Set the filename for download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            
            // Optional: Add download tracking/analytics here
            console.log('CV download initiated');
        });
    }
});