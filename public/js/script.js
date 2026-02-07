const answers_no = {
    english: [
        "No",
        "Are you sure?",
        "Are you really sure??",
        "Are you really realy sure???",
        "Think again?",
        "Don't believe in second chances?",
        "Why are you being so cold?",
        "Maybe we can talk about it?",
        "I am not going to ask again!",
        "Ok now this is hurting my feelings!",
        "You are now just being mean!",
        "Why are you doing this to me?",
        "Please give me a chance!",
        "I am begging you to stop!",
        "Ok, Let's just start over.."
    ],
    french: [
        "Non",
        "Tu es sûr ?",
        "Tu es vraiment sûr ??",
        "Tu es vraiment vraiment sûr ???",
        "Réfléchis encore?",
        "Tu ne crois pas aux deuxièmes chances ?",
        "Pourquoi tu es si froid?",
        "Peut-être, on peut en parler ?",
        "Je ne vais pas demander encore une fois!",
        "D'accord, maintenant ca me fait mal!",
        "Tu es juste méchant!",
        "Pourquoi tu me fais ça?",
        "Donnez-moi une chance plz!",
        "Je te supplie d'arrêter!",
        "D'accord, recommençons.."
    ],
    thai: [
        "ไม่อ่ะ",
        "แน่ใจจริงๆหรอคะ?",
        "แน่ใจจริงๆ จริงๆนะคะ?",
        "อย่าบอกนะว่านี่แน่ใจสุดๆแล้วจริงๆ ?",
        "ลองคิดดูอีกทีหน่อยสิคะ..",
        "ขอโอกาศที่สองทีค่ะ..",
        "อย่าเย็นชาสิคะ กระซิกๆ",
        "ขอร้องนะคะ",
        "น้าาาๆๆๆๆๆ",
        "เราจะร้องไห้เอานะ กระซิกๆ",
        "จะเอังี้ๆจริงหรอคะ",
        "ฮือออออ",
        "ขอโอกาศครั้งที่สองที่ค่ะ!",
        "ขอร้องละค่าาา",
        "โอเคค่ะ.. งั้นเริ่มใหม่ !"
    ]
};

const answers_yes = {
    "english": "Yes",
    "french": "Oui",
    "thai": "เย่ คืนดีกันแล้วน้า"
}

let language = "english";
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;
let escapeCount = 0;
let isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
let isTouchDevice = () => {
    return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0) ||
            (navigator.msMaxTouchPoints > 0));
};
const HAS_TOUCH = isTouchDevice();

// Get the audio element
let music = document.getElementById('background-music');
const ambientSound = document.getElementById('ambient-sound');

// ===== DARK MODE TOGGLE =====
const themeToggle = document.getElementById('theme-toggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        themeToggle.textContent = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });
}

// Load saved theme preference
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (themeToggle) themeToggle.textContent = '☀️';
}

// ===== MUSIC CONTROLS =====
const musicBtn = document.getElementById('music-play-pause');
const volumeSlider = document.getElementById('volume-slider');
const volumeLabel = document.getElementById('volume-label');

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        if (music.paused) {
            const playPromise = music.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    musicBtn.textContent = '⏸️';
                }).catch(error => {
                    console.log('Music play error:', error);
                    alert('Could not play music. Please check your browser settings.');
                });
            } else {
                musicBtn.textContent = '⏸️';
            }
        } else {
            music.pause();
            musicBtn.textContent = '▶️';
        }
    });
}

if (volumeSlider) {
    volumeSlider.addEventListener('input', (e) => {
        const volume = e.target.value / 100;
        music.volume = volume;
        volumeLabel.textContent = e.target.value + '%';
    });
    music.volume = 0.5;
}

if (ambientSound) {
    ambientSound.volume = 0.15;
}

// Music error handling and initialization
if (music) {
    music.addEventListener('error', (e) => {
        console.error('Audio error:', e);
        musicBtn.textContent = '🔇';
        musicBtn.title = 'Music unavailable';
    });
    
    music.addEventListener('canplay', () => {
        console.log('Music loaded and ready to play');
    });
}

// Optimize audio context to prevent multiple instances
let audioContext;
function getAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.log('AudioContext not supported:', e);
            return null;
        }
    }
    return audioContext;
}

// ===== SOUND EFFECTS =====
let lastSoundTime = 0;
const SOUND_THROTTLE = 100;

function playClickSound() {
    const now = Date.now();
    if (now - lastSoundTime < SOUND_THROTTLE) return;
    lastSoundTime = now;

    const audioCtx = getAudioContext();
    if (!audioCtx) return;

    try {
        const nowTime = audioCtx.currentTime;
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.frequency.setValueAtTime(600, nowTime);
        osc.frequency.exponentialRampToValueAtTime(200, nowTime + 0.1);
        
        gain.gain.setValueAtTime(0.15, nowTime);
        gain.gain.exponentialRampToValueAtTime(0.01, nowTime + 0.1);
        
        osc.start(nowTime);
        osc.stop(nowTime + 0.1);
    } catch (e) {
        console.log('Sound play error:', e);
    }
}

// ===== SCORE COUNTER =====
const scoreCounter = document.getElementById('score-counter');
const noCount = document.getElementById('no-count');
const finalNoCount = document.getElementById('final-no-count');

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "images/no.gif";
        refreshBanner();
    }
    clicks++;
    
    // Play click sound
    try {
        playClickSound();
    } catch (e) {
        console.log('Could not play sound:', e);
    }
    
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = `<p>${answers_no[language][i]}</p>`;
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = `<p>${answers_no[language][0]}</p>`;
        yes_button.innerHTML = `<p>${answers_yes[language]}</p>`;
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "images/mid.gif";
    refreshBanner();
    
    // Smooth fade out buttons and question
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.classList.add('hide');
    document.getElementById('question-heading').style.opacity = "0";
    document.getElementById('question-heading').style.transition = "opacity 0.6s ease";
    
    // Smooth fade in message after delay
    setTimeout(() => {
        let message = document.getElementsByClassName('message')[0];
        message.classList.add('show');
    }, 300);
    
    // show love letter envelope
    document.getElementById('envelope-trigger').style.display = "block";
    document.getElementById('envelope-trigger').classList.add('active');
    
    // Auto-open love letter modal
    const modal = document.getElementById("love-letter-modal");
    if (modal) {
        modal.style.display = "block";
        const letterText = "My Dearest Aashu,\n\nIf you are reading this, it means you said Yes! (As if you had a choice 😉).\nI just wanted to take a moment to tell you how incredibly lucky I am to have you in your life.\n\nHappy Valentine's Day! ❤️\n\nLove from wife,\nShristi";
        typeWriter(letterText, 'love-letter-text', 50);
    }
    
    // Hide score counter and show final score
    if (scoreCounter) scoreCounter.style.display = "none";
    if (finalNoCount) finalNoCount.textContent = escapeCount;
    
    // Play sound effect
    try {
        playClickSound();
    } catch (e) {
        console.log('Could not play sound:', e);
    }
    
    // Trigger confetti explosion
    if (typeof confetti === "function") {
        confetti({
            particleCount: 90,
            spread: 80,
            startVelocity: 18,
            gravity: 0.6,
            scalar: 0.7,
            ticks: 120,
            colors: ['#ff6b9d', '#ff9eb5', '#ffd1dc', '#ffffff'],
            origin: { y: 0.6 }
        });
    }

    // Play the music when they say YES! 🎵
    if (ambientSound) {
        const ambientPromise = ambientSound.play();
        if (ambientPromise !== undefined) {
            ambientPromise.catch(error => {
                console.log('Ambient play error:', error);
            });
        }
    }
    if (music) {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Music play error:', error);
            });
        }
    }
});

// Reset button to start over
const resetButton = document.getElementById('reset-button');
if (resetButton) {
    resetButton.addEventListener('click', () => {
        // Reset all state
        clicks = 0;
        escapeCount = 0;
        i = 1;
        size = 50;
        confettiTriggered = false;
        
        // Reset button styles
        yes_button.style.height = "40px";
        yes_button.style.width = "auto";
        yes_button.style.position = "relative";
        yes_button.style.left = "0";
        yes_button.style.top = "0";
        yes_button.style.transform = "none";
        yes_button.style.backgroundColor = "#ff4081";
        yes_button.style.borderColor = "none";
        yes_button.innerHTML = `<p>${answers_yes[language]}</p>`;
        
        // Reset no button
        no_button.style.height = "40px";
        no_button.style.width = "auto";
        no_button.style.position = "static";
        no_button.style.left = "0";
        no_button.style.top = "0";
        no_button.style.transform = "none";
        no_button.style.backgroundColor = "#ffebee";
        no_button.style.color = "#ff4081";
        no_button.style.borderColor = "#ff4081";
        no_button.innerHTML = `<p>${answers_no[language][0]}</p>`;
        
        // Reset banner
        let banner = document.getElementById('banner');
        banner.src = "images/mid.gif";
        
        // Smooth fade out message
        let message = document.getElementsByClassName('message')[0];
        message.classList.remove('show');
        
        // Smooth fade in question and buttons
        setTimeout(() => {
            document.getElementById('question-heading').style.opacity = "1";
            document.getElementById('question-heading').style.display = "block";
            document.getElementsByClassName('buttons')[0].classList.remove('hide');
        }, 300);
        // Hide love letter envelope
        document.getElementById('envelope-trigger').style.display = "none";
        document.getElementById('envelope-trigger').classList.remove('active');
        // Hide score counter
        if (scoreCounter) scoreCounter.style.display = "none";
        if (noCount) noCount.textContent = "0";
        if (finalNoCount) finalNoCount.textContent = "0";
    });
}

const moveButton = (e) => {
    // Create elegant particle trail
    const rect = no_button.getBoundingClientRect();
    const currentX = rect.left + rect.width / 2;
    const currentY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const particle = document.createElement('div');
            particle.style.position = 'fixed';
            particle.style.left = currentX + 'px';
            particle.style.top = currentY + 'px';
            particle.style.width = '8px';
            particle.style.height = '8px';
            particle.style.borderRadius = '50%';
            particle.style.background = `rgba(255, 64, 129, ${0.6 - i * 0.15})`;
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '999';
            particle.style.boxShadow = '0 0 10px rgba(255, 64, 129, 0.8)';
            document.body.appendChild(particle);
            
            let px = currentX;
            let py = currentY;
            let vx = (Math.random() - 0.5) * 4;
            let vy = (Math.random() - 0.5) * 4;
            
            const animate = () => {
                px += vx;
                py += vy;
                particle.style.left = px + 'px';
                particle.style.top = py + 'px';
                particle.style.opacity = parseFloat(particle.style.opacity || 1) - 0.02;
                
                if (parseFloat(particle.style.opacity) > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            animate();
        }, i * 30);
    }

    escapeCount += 1;
    if (scoreCounter) scoreCounter.style.display = "block";
    if (noCount) noCount.textContent = escapeCount;

    // Get mouse/touch position to run away from
    let mouseX = 0, mouseY = 0;
    if (e) {
        if (e.type === 'touchstart') {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        } else {
            mouseX = e.clientX;
            mouseY = e.clientY;
        }
    }

    // Add safe margin so button doesn't hit edges
    const margin = 50;
    const btnWidth = no_button.offsetWidth;
    const btnHeight = no_button.offsetHeight;
    const maxX = window.innerWidth - btnWidth - margin;
    const maxY = window.innerHeight - btnHeight - margin;

    let targetX, targetY;

    // Smart dodge logic: Move to the opposite quadrant of the mouse
    if (e && maxX > 0 && maxY > 0) {
        if (mouseX < window.innerWidth / 2) {
            const minX = window.innerWidth / 2;
            targetX = minX + Math.random() * (maxX - minX);
        } else {
            const maxRange = window.innerWidth / 2 - btnWidth;
            targetX = margin + Math.random() * (maxRange - margin);
        }
        
        if (mouseY < window.innerHeight / 2) {
            const minY = window.innerHeight / 2;
            targetY = minY + Math.random() * (maxY - minY);
        } else {
            const maxRange = window.innerHeight / 2 - btnHeight;
            targetY = margin + Math.random() * (maxRange - margin);
        }
    } else {
        targetX = margin + Math.random() * (maxX - margin);
        targetY = margin + Math.random() * (maxY - margin);
    }

    // Clamp values to be safe
    targetX = Math.min(Math.max(margin, targetX || 0), maxX);
    targetY = Math.min(Math.max(margin, targetY || 0), maxY);

    // Smooth elegant glide animation
    no_button.style.position = "fixed";
    no_button.style.transition = "all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
    no_button.style.left = targetX + "px";
    no_button.style.top = targetY + "px";

    // Subtle elegant transform - gentle tilt instead of wild rotation
    const tilt = (Math.random() - 0.5) * 10;
    no_button.style.transform = `rotate(${tilt}deg)`;

    // Keep elegant pink theme
    no_button.style.backgroundColor = "#ffebee";
    no_button.style.color = "#ff4081";
    no_button.style.borderColor = "#ff4081";
    no_button.style.boxShadow = "0 4px 15px rgba(255, 64, 129, 0.2)";
    
    // Elegant messages
    const elegantMessages = [
        "Not now...",
        "I'll wait...",
        "Take your time...",
        "I believe in you 💘",
        "Just say yes 💝",
        "Come here... 💕",
        "Convince me... 💖"
    ];
    no_button.innerHTML = `<p>${elegantMessages[Math.floor(Math.random() * elegantMessages.length)]}</p>`;
};

no_button.addEventListener('mouseover', moveButton, { passive: true });

// Mobile support for 'No' button running away
no_button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton(e);
}, { passive: false });

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

// Optimize sparkle effect for mobile performance
let sparkleQueue = [];
let maxSparkles = HAS_TOUCH ? 10 : 30;
let lastSparkleTime = 0;
const SPARKLE_THROTTLE = 16;

function createSparkle(x, y) {
    const now = Date.now();
    if (now - lastSparkleTime < SPARKLE_THROTTLE) return;
    lastSparkleTime = now;

    if (sparkleQueue.length >= maxSparkles) {
        const old = sparkleQueue.shift();
        old.remove();
    }

    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.left = (x + offsetX) + 'px';
    sparkle.style.top = (y + offsetY) + 'px';
    
    const size = Math.random() * 6 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    const colors = ['#ffeb3b', '#ff4081', '#ffffff'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 5px ${color}`;
    
    document.body.appendChild(sparkle);
    sparkleQueue.push(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
        sparkleQueue = sparkleQueue.filter(s => s !== sparkle);
    }, 800);
}

if (!isMobileDevice || window.innerWidth > 768) {
    document.addEventListener('mousemove', (e) => {
        createSparkle(e.pageX, e.pageY);
    }, { passive: true });
}

if (HAS_TOUCH) {
    document.addEventListener('touchmove', (e) => {
        if (e.touches && e.touches[0]) {
            createSparkle(e.touches[0].pageX, e.touches[0].pageY);
        }
    }, { passive: true });
}

// Change page title when user switches tabs
let originalTitle = document.title;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = "Miss you! 💔";
    } else {
        document.title = originalTitle;
    }
}, { passive: true });

// Countdown Timer Logic
let confettiTriggered = false;
function updateCountdown() {
    const timerElement = document.getElementById('timer');
    if (!timerElement) return;

    const now = new Date();
    
    // Check if it is currently Valentine's Day (Month is 0-indexed, so 1 is Feb)
    if (now.getMonth() === 1 && now.getDate() === 14) {
        timerElement.innerHTML = "Happy Valentine's Day! 💖";
        if (!confettiTriggered && typeof confetti === "function") {
            const rect = timerElement.getBoundingClientRect();
            const x = (rect.left + rect.width / 2) / window.innerWidth;
            const y = (rect.top + rect.height / 2) / window.innerHeight;
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { x: x, y: y },
                colors: ['#ff4081', '#d81b60', '#ffffff']
            });
            confettiTriggered = true;
        }
        return;
    }
    
    confettiTriggered = false;

    let year = now.getFullYear();
    let valentinesDay = new Date(year, 1, 14); 

    // If it's already past Valentine's Day this year, count down to next year
    if (now > valentinesDay) {
        valentinesDay = new Date(year + 1, 1, 14);
    }

    const diff = valentinesDay - now;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

// Ensure DOM is ready before starting countdown
document.addEventListener('DOMContentLoaded', () => {
    music = document.getElementById('background-music');
    
    // Debugging: Check if audio file loads
    if (music) {
        music.addEventListener('error', (e) => {
            console.error("Error loading audio:", music.error);
            console.log("Trying fallback music source...");
        }, { passive: true });
        
        music.addEventListener('canplay', () => {
            console.log("Music ready to play!");
        }, { passive: true });
        
        music.addEventListener('loadstart', () => {
            console.log("Loading music...");
        }, { passive: true });
    }

    // Reduce countdown update frequency on mobile to save battery
    const updateInterval = isMobileDevice ? 2000 : 1000;
    setInterval(updateCountdown, updateInterval);
    updateCountdown();

// Love Quotes Feature
const loveQuotes = [
    "You are my sun, my moon, and all my stars. 🌟",
    "If I know what love is, it is because of you. 💖",
    "I love you more than words can say. 🌹",
    "To the world you may be one person, but to me you are the world. 🌍",
    "Every love story is beautiful, but ours is my favorite. 📖",
    "You make my heart smile. 😊",
    "I'm much more me when I'm with you. 🦋",
    "You are the best thing that's ever been mine. 💌"
];

const countdownContainer = document.getElementById('countdown-container');
if (countdownContainer) {
    countdownContainer.addEventListener('click', () => {
        const quoteElement = countdownContainer.querySelector('p');
        if (quoteElement) {
            quoteElement.style.opacity = 0;
            setTimeout(() => {
                quoteElement.innerText = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
                quoteElement.style.opacity = 1;
            }, 300);
        }
    }, { passive: true });
}
});

// Secret Love Letter Modal Logic
const modal = document.getElementById("love-letter-modal");
const btn = document.getElementById("envelope-trigger");
const span = document.getElementsByClassName("close-modal")[0];
const letterText = "My Dearest Aashu,\n\nIf you are reading this, it means you said Yes! (As if you had a choice 😉).\nI just wanted to take a moment to tell you how incredibly lucky I am to have you in my life.\n\nHappy Valentine's Day! ❤️\n\nLove from wife ,\nShristi";

let typingTimeout;

function typeWriter(text, elementId, speed = 50) {
    const element = document.getElementById(elementId);
    if (!element) return;
    element.innerHTML = '';
    
    // Use spread operator to handle emojis correctly
    const chars = [...text];
    let i = 0;
    
    // Clear any existing timeout to prevent overlaps
    if (typingTimeout) clearTimeout(typingTimeout);

    function type() {
        if (i < chars.length) {
            if (chars[i] === '\n') {
                element.innerHTML += '<br>';
            } else {
                element.innerHTML += chars[i];
            }
            i++;
            typingTimeout = setTimeout(type, speed);
        }
    }
    type();
}

if (btn) {
    btn.onclick = function() {
        modal.style.display = "block";
        typeWriter(letterText, 'love-letter-text', 50);
    }
}

if (span) {
    span.onclick = function() {
        modal.style.display = "none";
        if (typingTimeout) clearTimeout(typingTimeout);
    }
}

window.onclick = function(event) {
    if (modal && event.target == modal) {
        modal.style.display = "none";
        if (typingTimeout) clearTimeout(typingTimeout);
    }
}