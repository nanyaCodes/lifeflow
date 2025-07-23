// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    // Check if all elements exist before adding event listeners
    if (mobileMenuButton && mobileMenu && hamburgerIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            
            // Toggle menu visibility
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icons
            hamburgerIcon.classList.toggle('hidden');
            hamburgerIcon.classList.toggle('block');
            closeIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('block');
            
            // Update aria-expanded attribute
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });

        // Optional: Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
            const isMenuOpen = !mobileMenu.classList.contains('hidden');
            
            if (!isClickInsideNav && isMenuOpen) {
                // Close the menu
                mobileMenu.classList.add('hidden');
                hamburgerIcon.classList.remove('hidden');
                hamburgerIcon.classList.add('block');
                closeIcon.classList.add('hidden');
                closeIcon.classList.remove('block');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });
    }
});

function openForm() {
            const modalOverlay = document.getElementById('modal-overlay');
            modalOverlay.classList.remove('hidden');
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
        }

        // Function to close the form modal
        function closeForm() {
            const modalOverlay = document.getElementById('modal-overlay');
            modalOverlay.classList.add('hidden');
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside the form
        document.getElementById('modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeForm();
            }
        });

        // Close modal when pressing Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeForm();
            }
        });

        // Placeholder function for finding hospitals
        function findHospitals() {
            alert('Finding hospitals near you...');
            // Add your hospital finding logic here
        }

        class TestimonialCarousel {
            constructor() {
                this.track = document.getElementById('carouselTrack');
                this.slides = document.querySelectorAll('.carousel-slide');
                this.nextBtn = document.getElementById('nextBtn');
                this.prevBtn = document.getElementById('prevBtn');
                this.dots = document.querySelectorAll('.dot');
                
                this.currentSlide = 0;
                this.slidesToShow = 4;
                this.slideWidth = 200; // 200px per card
                this.slideGap = 16; // 8px padding on each side
                this.totalSlides = this.slides.length;
                this.maxSlide = this.totalSlides - this.slidesToShow;
                
                this.init();
            }
            
            init() {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                
                // Add click event to dots
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });
                
                this.updateCarousel();
            }
            
            nextSlide() {
                if (this.currentSlide < this.maxSlide) {
                    this.currentSlide++;
                } else {
                    this.currentSlide = 0; // Loop back to start
                }
                this.updateCarousel();
            }
            
            prevSlide() {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                } else {
                    this.currentSlide = this.maxSlide; // Loop to end
                }
                this.updateCarousel();
            }
            
            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateCarousel();
            }
            
            updateCarousel() {
                // Calculate translation based on card width + gap
                const translateX = -this.currentSlide * (this.slideWidth + this.slideGap);
                this.track.style.transform = `translateX(${translateX}px)`;
                
                // Update dots
                this.dots.forEach((dot, index) => {
                    if (index === this.currentSlide) {
                        dot.classList.remove('bg-gray-300');
                        dot.classList.add('bg-red-500');
                    } else {
                        dot.classList.remove('bg-red-500');
                        dot.classList.add('bg-gray-300');
                    }
                });
                
                // Update button states
                this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
                this.nextBtn.style.opacity = this.currentSlide === this.maxSlide ? '0.5' : '1';
            }
        }
        
        // Initialize carousel when DOM is loaded
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialCarousel();
        });
