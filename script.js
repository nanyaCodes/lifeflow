
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    const closeIcon = document.getElementById('close-icon');

    
    if (mobileMenuButton && mobileMenu && hamburgerIcon && closeIcon) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            
            
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                
                mobileMenu.offsetHeight;
                mobileMenu.classList.add('show');
            } else {
                mobileMenu.classList.remove('show');
                
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 300);
            }
            
            hamburgerIcon.classList.toggle('hidden');
            hamburgerIcon.classList.toggle('block');
            closeIcon.classList.toggle('hidden');
            closeIcon.classList.toggle('block');
            
        
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
        });

        
        document.addEventListener('click', function(event) {
            const isClickInsideNav = mobileMenuButton.contains(event.target) || mobileMenu.contains(event.target);
            const isMenuOpen = !mobileMenu.classList.contains('hidden');
            
            if (!isClickInsideNav && isMenuOpen) {
                mobileMenu.classList.remove('show');
                setTimeout(() => {
                    if (!mobileMenu.classList.contains('show')) {
                        mobileMenu.classList.add('hidden');
                    }
                }, 300);
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
            
            document.body.style.overflow = 'hidden';
        }

        function closeForm() {
            const modalOverlay = document.getElementById('modal-overlay');
            modalOverlay.classList.add('hidden');
            // Restore body scrolling
            document.body.style.overflow = 'auto';
        }

        document.getElementById('modal-overlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeForm();
            }
        });

    
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeForm();
            }
        })

        function findHospitals() {
            alert('Finding hospitals near you...');
            
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
                this.slideWidth = 200; 
                this.slideGap = 16; 
                this.totalSlides = this.slides.length;
                this.maxSlide = this.totalSlides - this.slidesToShow;
                
                this.init();
            }
            
            init() {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
                this.prevBtn.addEventListener('click', () => this.prevSlide());
                
            
                this.dots.forEach((dot, index) => {
                    dot.addEventListener('click', () => this.goToSlide(index));
                });
                
                this.updateCarousel();
            }
            
            nextSlide() {
                if (this.currentSlide < this.maxSlide) {
                    this.currentSlide++;
                } else {
                    this.currentSlide = 0; 
                }
                this.updateCarousel();
            }
            
            prevSlide() {
                if (this.currentSlide > 0) {
                    this.currentSlide--;
                } else {
                    this.currentSlide = this.maxSlide; 
                }
                this.updateCarousel();
            }
            
            goToSlide(slideIndex) {
                this.currentSlide = slideIndex;
                this.updateCarousel();
            }
            
            updateCarousel() {
                const translateX = -this.currentSlide * (this.slideWidth + this.slideGap);
                this.track.style.transform = `translateX(${translateX}px)`;
                
                this.dots.forEach((dot, index) => {
                    if (index === this.currentSlide) {
                        dot.classList.remove('bg-gray-300');
                        dot.classList.add('bg-red-500');
                    } else {
                        dot.classList.remove('bg-red-500');
                        dot.classList.add('bg-gray-300');
                    }
                });
        
                this.prevBtn.style.opacity = this.currentSlide === 0 ? '0.5' : '1';
                this.nextBtn.style.opacity = this.currentSlide === this.maxSlide ? '0.5' : '1';
            }
        }
        
        document.addEventListener('DOMContentLoaded', () => {
            new TestimonialCarousel();
        });

        AOS.init({
            duration: 900,
            easing: 'ease-in-out',
            once: true,
        });

        function findHospitals() {
            const modal = document.getElementById('hospitalModal');
            const loadingScreen = document.getElementById('loadingScreen');
            const resultsScreen = document.getElementById('resultsScreen');
            
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            
            loadingScreen.classList.remove('hidden');
            resultsScreen.classList.add('hidden');
            
            const dot1 = document.getElementById('dot1');
            const dot2 = document.getElementById('dot2');
            const dot3 = document.getElementById('dot3');
            const statusText = document.getElementById('statusText');
            
            dot1.style.opacity = '0.3';
            dot2.style.opacity = '0.3';
            dot3.style.opacity = '0.3';
            dot1.style.transform = 'scale(1)';
            dot2.style.transform = 'scale(1)';
            dot3.style.transform = 'scale(1)';
            
            statusText.textContent = 'Please wait...';
            setTimeout(() => {
                dot1.style.opacity = '1';
                dot1.style.transform = 'scale(1.3)';
                dot1.style.transition = 'all 0.4s ease';
            }, 500);
            
            setTimeout(() => {
                statusText.textContent = 'Fetching Nearby Hospitals...';
                dot1.style.opacity = '0.3';
                dot1.style.transform = 'scale(1)';
                dot2.style.opacity = '1';
                dot2.style.transform = 'scale(1.3)';
                dot2.style.transition = 'all 0.4s ease';
            }, 2000);
            
            setTimeout(() => {
                statusText.textContent = 'Finding Perfect Match...';
                dot2.style.opacity = '0.3';
                dot2.style.transform = 'scale(1)';
                dot3.style.opacity = '1';
                dot3.style.transform = 'scale(1.3)';
                dot3.style.transition = 'all 0.4s ease';
            }, 4000);
            
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                resultsScreen.classList.remove('hidden');
            }, 6000);
        }

        function closeModal() {
            const modal = document.getElementById('hospitalModal');
            const loadingScreen = document.getElementById('loadingScreen');
            const resultsScreen = document.getElementById('resultsScreen');
            
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            loadingScreen.classList.remove('hidden');
            resultsScreen.classList.add('hidden');
        }

        document.getElementById('hospitalModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        const hospitalData = {
            'abuja': {
                hospital: {
                    name: 'National Hospital Abuja',
                    code: 'PMB 425',
                    address1: 'PMB 425 Ali Muhammad Zarah Street, Central Business Dis, Abuja 900103,',
                    address2: 'Federal Capital Territory',
                    distance: '9 Km away'
                },
                landmarks: {
                    roads: [
                        'M0 150 Q100 100 200 150 T400 150',
                        'M200 0 Q250 100 200 150 Q150 200 200 300',
                        'M50 50 Q150 120 250 80 Q350 40 400 100',
                        'M0 200 L150 180 L300 220 L400 200'
                    ],
                    parks: [
                        { cx: 320, cy: 80, r: 40 },
                        { cx: 350, cy: 220, r: 30 },
                        { cx: 80, cy: 250, rx: 50, ry: 30, type: 'ellipse' }
                    ],
                    water: [
                        { cx: 300, cy: 50, rx: 60, ry: 25 }
                    ],
                    hospitals: [
                        { cx: 120, cy: 180, type: 'public' },
                        { cx: 280, cy: 120, type: 'public' },
                        { cx: 50, cy: 100, type: 'private' },
                        { cx: 320, cy: 200, type: 'private' }
                    ]
                }
            },
            'lagos': {
                hospital: {
                    name: 'Lagos University Teaching Hospital',
                    code: 'LUTH',
                    address1: 'Idi-Araba, Surulere, Lagos 100254,',
                    address2: 'Lagos State',
                    distance: '12 Km away'
                },
                landmarks: {
                    roads: [
                        'M0 100 Q150 80 300 120 L400 100',
                        'M100 0 L120 150 Q150 200 180 300',
                        'M0 180 Q200 160 400 180',
                        'M250 50 Q300 150 350 250'
                    ],
                    parks: [
                        { cx: 150, cy: 200, r: 35 },
                        { cx: 300, cy: 100, r: 25 }
                    ],
                    water: [
                        { cx: 100, cy: 50, rx: 80, ry: 30 },
                        { cx: 350, cy: 250, rx: 40, ry: 20 }
                    ],
                    hospitals: [
                        { cx: 180, cy: 150, type: 'public' },
                        { cx: 320, cy: 180, type: 'public' },
                        { cx: 80, cy: 200, type: 'private' },
                        { cx: 250, cy: 80, type: 'private' }
                    ]
                }
            },
            'kano': {
                hospital: {
                    name: 'Aminu Kano Teaching Hospital',
                    code: 'AKTH',
                    address1: 'Zaria Road, Kano 700001,',
                    address2: 'Kano State',
                    distance: '8 Km away'
                },
                landmarks: {
                    roads: [
                        'M0 150 L400 150',
                        'M200 0 L200 300',
                        'M50 100 Q200 80 350 100',
                        'M100 200 Q250 220 350 200'
                    ],
                    parks: [
                        { cx: 100, cy: 100, r: 30 },
                        { cx: 300, cy: 200, r: 40 }
                    ],
                    water: [
                        { cx: 200, cy: 250, rx: 70, ry: 25 }
                    ],
                    hospitals: [
                        { cx: 150, cy: 120, type: 'public' },
                        { cx: 250, cy: 180, type: 'public' },
                        { cx: 100, cy: 200, type: 'private' },
                        { cx: 300, cy: 100, type: 'private' }
                    ]
                }
            },
            'port harcourt': {
                hospital: {
                    name: 'University of Port Harcourt Teaching Hospital',
                    code: 'UPTH',
                    address1: 'Alakahia, Port Harcourt 500001,',
                    address2: 'Rivers State',
                    distance: '15 Km away'
                },
                landmarks: {
                    roads: [
                        'M0 120 Q100 140 200 120 Q300 100 400 120',
                        'M150 0 Q170 150 150 300',
                        'M50 200 L350 180',
                        'M250 50 Q280 150 250 250'
                    ],
                    parks: [
                        { cx: 200, cy: 80, r: 45 },
                        { cx: 80, cy: 220, r: 30 },
                        { cx: 320, cy: 180, r: 25 }
                    ],
                    water: [
                        { cx: 150, cy: 200, rx: 60, ry: 40 },
                        { cx: 350, cy: 100, rx: 30, ry: 20 }
                    ],
                    hospitals: [
                        { cx: 100, cy: 150, type: 'public' },
                        { cx: 300, cy: 140, type: 'public' },
                        { cx: 180, cy: 120, type: 'private' },
                        { cx: 250, cy: 220, type: 'private' }
                    ]
                }
            }
        };

        function generateMap(locationKey) {
            const data = hospitalData[locationKey];
            if (!data) return '';

            let svgContent = '';

            data.landmarks.roads.forEach((road, index) => {
                const width = [8, 6, 4, 4][index] || 4;
                const opacity = [0.7, 0.6, 0.5, 0.5][index] || 0.5;
                svgContent += `<path d="${road}" stroke="#ddd" stroke-width="${width}" fill="none" opacity="${opacity}"/>`;
            });
            
            data.landmarks.parks.forEach(park => {
                if (park.type === 'ellipse') {
                    svgContent += `<ellipse cx="${park.cx}" cy="${park.cy}" rx="${park.rx}" ry="${park.ry}" fill="#86efac" opacity="0.6"/>`;
                } else {
                    svgContent += `<circle cx="${park.cx}" cy="${park.cy}" r="${park.r}" fill="#86efac" opacity="0.6"/>`;
                }
            });
            
            
            data.landmarks.water.forEach(water => {
                svgContent += `<ellipse cx="${water.cx}" cy="${water.cy}" rx="${water.rx}" ry="${water.ry}" fill="#7dd3fc" opacity="0.6"/>`;
            });
            
        
            data.landmarks.hospitals.forEach(hospital => {
                const color = hospital.type === 'public' ? '#3b82f6' : '#ec4899';
                svgContent += `<circle cx="${hospital.cx}" cy="${hospital.cy}" r="4" fill="${color}"/>`;
            });
            
            return svgContent;
        }

        function updateHospitalInfo(locationKey) {
            const data = hospitalData[locationKey];
            if (!data) return;

            document.getElementById('hospitalName').textContent = data.hospital.name;
            document.getElementById('hospitalCode').textContent = data.hospital.code;
            document.getElementById('hospitalTitle').textContent = data.hospital.name;
            document.getElementById('hospitalAddress1').textContent = data.hospital.address1;
            document.getElementById('hospitalAddress2').textContent = data.hospital.address2;
            document.getElementById('hospitalDistance').textContent = data.hospital.distance;
        }

    
        let appointmentTime = "--:-- --";
        let appointmentDate = "-- --, ----";


        function showResults() {
            const loadingScreen = document.getElementById('loadingScreen');
            const resultsScreen = document.getElementById('resultsScreen');
            
            loadingScreen.classList.add('hidden');
            resultsScreen.classList.remove('hidden');
        }
        
        function closeModal() {
            const modal = document.getElementById('hospitalModal');
            modal.classList.remove('flex');
            modal.classList.add('hidden');
        }
        
        function confirmAppointment() {
            document.getElementById('confirmationTime').textContent = appointmentTime;
            document.getElementById('confirmationDate').textContent = appointmentDate;
            
            closeModal();
            
            
            const confirmationModal = document.getElementById('confirmationModal');
            confirmationModal.classList.remove('hidden');
            confirmationModal.classList.add('flex');
        }
        
        function closeConfirmationModal() {
            const confirmationModal = document.getElementById('confirmationModal');
            confirmationModal.classList.remove('flex');
            confirmationModal.classList.add('hidden');
        }
        
        function setAppointmentData(time, date) {
            appointmentTime = time;
            appointmentDate = date;
        }
         
        document.getElementById('hospitalModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });
        
        
        document.getElementById('confirmationModal').addEventListener('click', function(e) {
            if (e.target === this) {
                closeConfirmationModal();
            }
        });

        document.querySelector('form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                alert('Passwords do not match!');
                return;
            }
            
            const requiredFields = document.querySelectorAll('input[required], textarea[required]');
            let allValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    field.classList.add('border-red-500');
                    allValid = false;
                } else {
                    field.classList.remove('border-red-500');
                }
            });
            
            if (allValid) {
                alert('Hospital account created successfully!');
                // Here you would typically submit the form data
            } else {
                alert('Please fill in all required fields.');
            }
        });

        document.getElementById('confirmPassword').addEventListener('input', function() {
            const password = document.getElementById('password').value;
            const confirmPassword = this.value;
            
            if (confirmPassword && password !== confirmPassword) {
                this.classList.add('border-red-500');
            } else {
                this.classList.remove('border-red-500');
            }
        });

        document.addEventListener('DOMContentLoaded', function() {
            const labels = document.querySelectorAll('label');
            labels.forEach(label => {
                if (label.innerHTML.includes('*')) {
                    const input = document.getElementById(label.getAttribute('for'));
                    if (input) {
                        input.setAttribute('required', '');
                    }
                }
            });
        });

        function openModal() {
            document.getElementById('modalOverlay').classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }

        function closeModal() {
            document.getElementById('modalOverlay').classList.add('hidden');
            document.body.style.overflow = 'auto';
        }

        // Close modal when clicking outside of it
        document.getElementById('modalOverlay').addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal();
            }
        });

        // Close modal on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });z

       