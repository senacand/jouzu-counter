// Main application logic
class NihongoJouzuCounter {
    constructor() {
        this.encounters = [];
        this.init();
    }

    async init() {
        try {
            await this.loadEncounters();
            this.updateCounter();
            this.displayEncounters();
            this.startAutoUpdate();
        } catch (error) {
            console.error('Failed to initialize:', error);
            this.showError();
        }
    }

    async loadEncounters() {
        try {
            const response = await fetch('config.json');
            if (!response.ok) throw new Error('Failed to load config');
            const data = await response.json();
            this.encounters = data.encounters || [];
        } catch (error) {
            console.error('Error loading encounters:', error);
            // Fallback to empty array
            this.encounters = [];
        }
    }

    updateCounter() {
        const dayCounterElement = document.getElementById('dayCounter');
        const lastDescriptionElement = document.getElementById('lastDescription');
        const lastDateElement = document.getElementById('lastDate');

        if (this.encounters.length === 0) {
            this.showNoData();
            return;
        }

        // Sort encounters by date (most recent first)
        const sortedEncounters = [...this.encounters].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        const lastEncounter = sortedEncounters[0];
        const lastDate = new Date(lastEncounter.timestamp);
        const today = new Date();
        
        // Calculate days difference
        const timeDiff = today.getTime() - lastDate.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        // Animate counter
        this.animateCounter(daysDiff);

        // Update last encounter info
        lastDescriptionElement.textContent = lastEncounter.description;
        lastDateElement.textContent = this.formatDate(lastDate);
    }

    animateCounter(targetDays) {
        const numberElement = document.querySelector('.number');
        let currentNumber = 0;
        const increment = Math.ceil(targetDays / 50); // Animation duration control
        
        const timer = setInterval(() => {
            currentNumber += increment;
            if (currentNumber >= targetDays) {
                currentNumber = targetDays;
                clearInterval(timer);
            }
            numberElement.textContent = currentNumber;
        }, 30);
    }

    displayEncounters() {
        const encountersListElement = document.getElementById('encountersList');
        
        if (this.encounters.length === 0) {
            encountersListElement.innerHTML = `
                <div class="encounter-item">
                    <div class="encounter-description">
                        No encounters recorded yet! 🎉<br>
                        <small>Either you're avoiding social situations or people have finally stopped saying it!</small>
                    </div>
                </div>
            `;
            return;
        }

        // Sort encounters by date (most recent first)
        const sortedEncounters = [...this.encounters].sort((a, b) => 
            new Date(b.timestamp) - new Date(a.timestamp)
        );

        encountersListElement.innerHTML = sortedEncounters.map((encounter, index) => {
            const date = new Date(encounter.timestamp);
            const today = new Date();
            const timeDiff = today.getTime() - date.getTime();
            const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));
            
            return `
                <div class="encounter-item" style="animation-delay: ${index * 0.1}s">
                    <div class="encounter-date">${this.formatDate(date)}</div>
                    <div class="encounter-description">${encounter.description}</div>
                    <div class="encounter-days-ago">
                        ${daysDiff === 0 ? 'Today' : 
                          daysDiff === 1 ? '1 day ago' : 
                          `${daysDiff} days ago`}
                    </div>
                </div>
            `;
        }).join('');
    }

    formatDate(date) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            weekday: 'long'
        };
        return date.toLocaleDateString('en-US', options);
    }

    showNoData() {
        document.querySelector('.number').textContent = '∞';
        document.getElementById('lastDescription').textContent = 'No encounters recorded!';
        document.getElementById('lastDate').textContent = 'Living the dream! 🎉';
    }

    showError() {
        document.querySelector('.number').textContent = '?';
        document.getElementById('lastDescription').textContent = 'Error loading data';
        document.getElementById('lastDate').textContent = 'Please check the config file';
    }

    startAutoUpdate() {
        // Update counter every hour to keep it accurate
        setInterval(() => {
            this.updateCounter();
        }, 3600000); // 1 hour in milliseconds

        // Update daily at midnight
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0);
        
        const msUntilMidnight = tomorrow.getTime() - now.getTime();
        
        setTimeout(() => {
            this.updateCounter();
            // Then update every 24 hours
            setInterval(() => {
                this.updateCounter();
            }, 86400000); // 24 hours in milliseconds
        }, msUntilMidnight);
    }
}

// Fun easter eggs and interactions
class EasterEggs {
    constructor() {
        this.initEasterEggs();
    }

    initEasterEggs() {
        // Konami code easter egg
        this.konamiCode();
        
        // Click counter for extra animation
        this.clickCounterAnimation();
        
        // Random encouragement messages
        this.encouragementMessages();
    }

    konamiCode() {
        const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.keyCode === konamiSequence[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiSequence.length) {
                    this.activateKonamiCode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    activateKonamiCode() {
        // Add rainbow animation to the title
        const title = document.querySelector('.title');
        title.style.animation = 'rainbow 2s linear infinite';
        
        // Add rainbow keyframes if not already added
        if (!document.getElementById('rainbow-style')) {
            const style = document.createElement('style');
            style.id = 'rainbow-style';
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
        }

        // Show special message
        const specialMessage = document.createElement('div');
        specialMessage.innerHTML = `
            <div style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); 
                        background: rgba(0,0,0,0.9); color: white; padding: 20px; border-radius: 10px; 
                        text-align: center; z-index: 1000; animation: fadeIn 0.5s ease-out;">
                <h3>🎌 Secret Unlocked! 🎌</h3>
                <p>You found the hidden Konami code!</p>
                <p>Your dedication to Japanese culture is... jouzu desu ne! 😄</p>
                <button onclick="this.parentElement.parentElement.remove()" 
                        style="margin-top: 10px; padding: 5px 15px; border: none; 
                               border-radius: 5px; background: #4c63d2; color: white; cursor: pointer;">
                    Close
                </button>
            </div>
        `;
        document.body.appendChild(specialMessage);

        setTimeout(() => {
            title.style.animation = '';
        }, 10000);
    }

    clickCounterAnimation() {
        const counterNumber = document.querySelector('.counter-number');
        let clickCount = 0;

        counterNumber.addEventListener('click', () => {
            clickCount++;
            counterNumber.style.transform = 'scale(1.1)';
            setTimeout(() => {
                counterNumber.style.transform = 'scale(1)';
            }, 150);

            if (clickCount === 10) {
                this.showClickEasterEgg();
                clickCount = 0;
            }
        });
    }

    showClickEasterEgg() {
        const messages = [
            "Stop clicking me! I'm already counting! 😅",
            "That's not how time works... 🕐",
            "Clicking won't make the days go faster! ⏰",
            "あなたの日本語はとても上手ですね！ (Just kidding!) 😜",
            "Achievement unlocked: Persistent Clicker! 🏆"
        ];

        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        const toast = document.createElement('div');
        toast.innerHTML = `
            <div style="position: fixed; top: 20px; right: 20px; background: #ff6b6b; color: white; 
                        padding: 15px; border-radius: 10px; z-index: 1000; 
                        animation: slideIn 0.5s ease-out, fadeOut 0.5s ease-out 3s forwards;">
                ${randomMessage}
            </div>
        `;
        
        // Add slide-in animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); }
                to { transform: translateX(0); }
            }
            @keyframes fadeOut {
                to { opacity: 0; transform: translateX(100%); }
            }
        `;
        document.head.appendChild(style);
        
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    encouragementMessages() {
        const messages = [
            "Hang in there! Every day without 'nihongo jouzu' is a victory! 💪",
            "You're doing great! Maybe people are finally recognizing your actual skill level! 🎉",
            "The longer the counter goes, the more legit your Japanese becomes! 📈",
            "Plot twist: Maybe your Japanese actually IS jouzu now! 🤔",
            "Keep going! You're building immunity to awkward compliments! 🛡️"
        ];

        // Show random encouragement every 30 seconds (only if page is active)
        setInterval(() => {
            if (!document.hidden && Math.random() < 0.1) { // 10% chance every 30 seconds
                const randomMessage = messages[Math.floor(Math.random() * messages.length)];
                console.log(`🎌 ${randomMessage}`);
            }
        }, 30000);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new NihongoJouzuCounter();
    new EasterEggs();
});

// Add some smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 