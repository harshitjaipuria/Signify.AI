// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Handle preloader
    const preloader = document.querySelector('.preloader');
    
    // Hide preloader after page is fully loaded
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        
        // Remove preloader from DOM after animation completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate elements on scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .use-case-card, .about-image, .chat-interface, .contact-form');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            // Check if element is in viewport
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('animate-in');
            }
        });
    };

    // Add animation class to CSS
    const style = document.createElement('style');
    style.textContent = `
        .feature-card, .use-case-card, .about-image, .chat-interface, .contact-form {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();

    // Interactive feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(108, 99, 255, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(108, 99, 255, 0.2)';
        });
    });

    // Parallax effect for hero image
    const heroImage = document.querySelector('.hero-image');
    
    window.addEventListener('scroll', function() {
        const scrollPosition = window.pageYOffset;
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrollPosition * 0.1}px)`;
        }
    });

    // Typing effect for hero heading
    const heroHeading = document.querySelector('.hero-content h1');
    if (heroHeading) {
        const text = heroHeading.innerHTML;
        heroHeading.innerHTML = '';
        
        let i = 0;
        const typeWriter = function() {
            if (i < text.length) {
                heroHeading.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Interactive CTA buttons
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
            this.style.boxShadow = '0 15px 25px rgba(108, 99, 255, 0.5)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(108, 99, 255, 0.4)';
        });
    });

    // Add a simple chat placeholder animation
    const chatPlaceholder = document.querySelector('.chat-placeholder');
    if (chatPlaceholder) {
        const dots = ['.', '..', '...'];
        let dotIndex = 0;
        
        setInterval(() => {
            chatPlaceholder.innerHTML = `Chat interface coming soon${dots[dotIndex]}`;
            dotIndex = (dotIndex + 1) % dots.length;
        }, 500);
    }

    // Add a simple contact form placeholder
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.innerHTML = `
            <form id="contact-form">
                <div class="form-group">
                    <label for="name">Name</label>
                    <input type="text" id="name" placeholder="Your name" required>
                </div>
                <div class="form-group">
                    <label for="email">Email</label>
                    <input type="email" id="email" placeholder="Your email" required>
                </div>
                <div class="form-group">
                    <label for="message">Message</label>
                    <textarea id="message" placeholder="Your message" required></textarea>
                </div>
                <button type="submit" class="cta-button">Send Message</button>
            </form>
        `;
        
        // Add form submission handling
        const form = document.getElementById('contact-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Simple form validation
                const name = document.getElementById('name').value;
                const email = document.getElementById('email').value;
                const message = document.getElementById('message').value;
                
                if (name && email && message) {
                    // Show success message
                    form.innerHTML = `
                        <div class="success-message">
                            <i class="fas fa-check-circle"></i>
                            <h3>Message Sent!</h3>
                            <p>Thank you for contacting us. We'll get back to you soon.</p>
                        </div>
                    `;
                }
            });
        }
    }

    // Add CSS for form elements
    const formStyle = document.createElement('style');
    formStyle.textContent = `
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-light);
            font-weight: 500;
        }
        
        .form-group input,
        .form-group textarea {
            width: 100%;
            padding: 0.8rem;
            background-color: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(108, 99, 255, 0.3);
            border-radius: var(--border-radius-sm);
            color: var(--text-light);
            font-family: 'Poppins', sans-serif;
            transition: all 0.3s ease;
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
            outline: none;
            border-color: var(--primary-color);
            box-shadow: 0 0 0 2px rgba(108, 99, 255, 0.2);
        }
        
        .form-group textarea {
            min-height: 120px;
            resize: vertical;
        }
        
        .success-message {
            text-align: center;
            padding: 2rem;
        }
        
        .success-message i {
            font-size: 3rem;
            color: #4CAF50;
            margin-bottom: 1rem;
        }
        
        .success-message h3 {
            font-size: 1.5rem;
            margin-bottom: 0.5rem;
            color: var(--text-light);
        }
        
        .success-message p {
            color: var(--text-gray);
        }
    `;
    document.head.appendChild(formStyle);

    // Tab switching functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Video to Text Interface
    const gesturePoints = document.querySelectorAll('.gesture-point');
    gesturePoints.forEach(point => {
        point.addEventListener('click', () => {
            point.style.animation = 'none';
            setTimeout(() => {
                point.style.animation = 'movePoint 3s infinite';
            }, 10);
        });
    });

    // Text to Text Interface
    const chatInput = document.querySelector('.chat-input input');
    const sendButton = document.querySelector('.send-btn');
    const chatMessages = document.querySelector('.chat-messages');

    if (chatInput && sendButton) {
        sendButton.addEventListener('click', () => {
            if (chatInput.value.trim()) {
                addMessage(chatInput.value, 'user');
                chatInput.value = '';
                // Simulate response
                setTimeout(() => {
                    addMessage('Thank you for your message. This is a demo response.', 'bot');
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendButton.click();
            }
        });
    }

    function addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text}
            </div>
        `;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Audio to Text Interface
    const micButton = document.querySelector('.mic-button');
    if (micButton) {
        micButton.addEventListener('click', () => {
            micButton.classList.toggle('recording');
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => {
                bar.style.animation = micButton.classList.contains('recording') ? 
                    'soundBars 1s infinite' : 'none';
            });
        });
    }

    // Text to Audio Interface
    const voiceButton = document.querySelector('.voice-btn');
    const waveform = document.querySelector('.audio-waveform');
    if (voiceButton && waveform) {
        voiceButton.addEventListener('click', () => {
            voiceButton.classList.toggle('playing');
            const waves = waveform.querySelectorAll('.wave');
            waves.forEach(wave => {
                wave.style.animation = voiceButton.classList.contains('playing') ? 
                    'wave 1s infinite' : 'none';
            });
        });
    }

    // Audio to Audio Interface
    const controlButtons = document.querySelectorAll('.control-btn');
    controlButtons.forEach(button => {
        button.addEventListener('click', () => {
            button.classList.toggle('active');
            const waves = button.closest('.participant')?.querySelectorAll('.wave');
            if (waves) {
                waves.forEach(wave => {
                    wave.style.animation = button.classList.contains('active') ? 
                        'audioWave 1s infinite' : 'none';
                });
            }
        });
    });

    // NEW CHAT button functionality
    const newChatButtons = document.querySelectorAll('.new-chat-btn');
    newChatButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabContent = button.closest('.tab-content');
            const interface = tabContent.querySelector('.interactive-interface');
            
            // Reset interface
            interface.style.opacity = '0';
            setTimeout(() => {
                interface.style.opacity = '1';
            }, 300);
        });
    });
}); 