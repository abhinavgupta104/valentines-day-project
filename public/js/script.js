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

let language = "english"; // Default language is English
const no_button = document.getElementById('no-button');
const yes_button = document.getElementById('yes-button');
let i = 1;
let size = 50;
let clicks = 0;

// Get the audio element
const music = document.getElementById('background-music');

no_button.addEventListener('click', () => {
    // Change banner source
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "./public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    // increase button height and width gradually to 250px
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
    // change button text
    if (i < total - 1) {
        no_button.innerHTML = answers_no[language][i];
        i++;
    } else if (i === total - 1) {
        alert(answers_no[language][i]);
        i = 1;
        no_button.innerHTML = answers_no[language][0];
        yes_button.innerHTML = answers_yes[language];
        yes_button.style.height = "50px";
        yes_button.style.width = "50px";
        size = 50;
    }
        // Play the music when they say NO! 🎵
    music.play().catch(error => {
        console.log('Could not play music:', error);
    });
});

yes_button.addEventListener('click', () => {
    // change banner gif path
    let banner = document.getElementById('banner');
    banner.src = "./public/images/mid.gif";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    // hide question heading
    document.getElementById('question-heading').style.display = "none";
    // show message div
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
    
    // Trigger confetti explosion
    if (typeof confetti === "function") {
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.6 }
        });
    }

    // Play the music when they say YES! 🎵
    music.play().catch(error => {
        console.log('Could not play music:', error);
    });
});

const moveButton = (e) => {
    // Play movement sound
    const moveSound = document.getElementById('move-sound');
    if (moveSound) {
        moveSound.currentTime = 0;
        moveSound.play().catch(() => {});
    }

    // Confetti at old position
    const rect = no_button.getBoundingClientRect();
    const x = (rect.left + rect.width / 2) / window.innerWidth;
    const y = (rect.top + rect.height / 2) / window.innerHeight;
    
    // Optimize for mobile
    const isMobile = window.innerWidth < 768;

    if (typeof confetti === "function") {
        confetti({
            particleCount: isMobile ? 10 : 20, // Reduce particles on mobile
            spread: 360,
            startVelocity: 15,
            origin: { x: x, y: y },
            colors: ['#ff4081', '#f44336', '#4caf50', '#2196f3', '#9c27b0'],
            scalar: 0.5,
            disableForReducedMotion: true,
            ticks: 50
        });
    }

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
        // X Axis: If mouse is left, go right. If mouse is right, go left.
        if (mouseX < window.innerWidth / 2) {
            const minX = window.innerWidth / 2;
            targetX = minX + Math.random() * (maxX - minX);
        } else {
            const maxRange = window.innerWidth / 2 - btnWidth;
            targetX = margin + Math.random() * (maxRange - margin);
        }
        
        // Y Axis: If mouse is top, go bottom. If mouse is bottom, go top.
        if (mouseY < window.innerHeight / 2) {
            const minY = window.innerHeight / 2;
            targetY = minY + Math.random() * (maxY - minY);
        } else {
            const maxRange = window.innerHeight / 2 - btnHeight;
            targetY = margin + Math.random() * (maxRange - margin);
        }
    } else {
        // Fallback random if no event or screen too small
        targetX = margin + Math.random() * (maxX - margin);
        targetY = margin + Math.random() * (maxY - margin);
    }

    // Clamp values to be safe
    targetX = Math.min(Math.max(margin, targetX || 0), maxX);
    targetY = Math.min(Math.max(margin, targetY || 0), maxY);

    no_button.style.position = "absolute";
    no_button.style.left = targetX + "px";
    no_button.style.top = targetY + "px";

    const rotation = (Math.random() * 720) - 360;
    const scale = 0.8 + Math.random() * 0.4;
    no_button.style.transform = `rotate(${rotation}deg) scale(${scale})`;

    // Make it look chaotic
    const colors = ['#ff4081', '#f44336', '#4caf50', '#2196f3', '#9c27b0'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    no_button.style.backgroundColor = randomColor;
    no_button.style.color = '#fff';
    no_button.style.borderColor = randomColor;
    no_button.style.boxShadow = `0 0 15px ${randomColor}`;
    
    // Cute taunts
    const taunts = ["Catch me! 🏃‍♂️", "Too slow! 😝", "Nope! 👻", "Try again! 💖", "Missed! 🙈", "Can't touch this! 💃", "Not today! 🤪"];
    no_button.innerText = taunts[Math.floor(Math.random() * taunts.length)];
};

no_button.addEventListener('mouseover', moveButton);

// Mobile support for 'No' button running away
no_button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    moveButton(e);
});

function refreshBanner() {
    // Reload banner gif to force load  
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    // Update question heading
    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Tu veux être mon valentin?";
    } else if (language === "thai") {
        questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    // Reset yes button text
    yes_button.innerHTML = answers_yes[language];

    // Reset button text to first in the new language
    no_button.innerHTML = answers_no[language][i - 1];

    // Update success message
    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Yepppie, à bientôt :3";
    } else if (language === "thai") {
        successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
    } else {
        successMessage.textContent = "Yepppie, see you sooonnn :3";
    }
}

// Sparkle effect following mouse cursor
document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Add some randomness to position
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.left = (e.pageX + offsetX) + 'px';
    sparkle.style.top = (e.pageY + offsetY) + 'px';
    
    // Random size
    const size = Math.random() * 8 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    // Random colors fitting the theme
    const colors = ['#ffeb3b', '#ff4081', '#ffffff', '#8bc34a'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 5px ${color}`;
    
    document.body.appendChild(sparkle);
    
    // Remove element after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Sparkle effect for touch devices
document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    // Add some randomness to position
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.left = (touch.pageX + offsetX) + 'px';
    sparkle.style.top = (touch.pageY + offsetY) + 'px';
    
    // Random size
    const size = Math.random() * 8 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    // Random colors fitting the theme
    const colors = ['#ffeb3b', '#ff4081', '#ffffff', '#8bc34a'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 5px ${color}`;
    
    document.body.appendChild(sparkle);
    
    // Remove element after animation
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

// Ensure music plays on mobile interaction (tap anywhere)
document.body.addEventListener('touchstart', function() {
    if (music.paused) {
        music.play().catch(() => {});
    }
}, { once: true });

// Change page title when user switches tabs
let originalTitle = document.title;
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        document.title = "Miss you! 💔";
    } else {
        document.title = originalTitle;
    }
});

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
    setInterval(updateCountdown, 1000);
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
    });
}
});

// Secret Love Letter Modal Logic
const modal = document.getElementById("love-letter-modal");
const btn = document.getElementById("envelope-trigger");
const span = document.getElementsByClassName("close-modal")[0];
const letterText = "My Dearest Aashish,\n\nIf you are reading this, it means you said Yes! (As if you had a choice 😉).\nI just wanted to take a moment to tell you how incredibly lucky I am to have you in my life.\n\nHappy Valentine's Day! ❤️\n\nLove,\nAbhinav";

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
    if (event.target == modal) {
        modal.style.display = "none";
        if (typingTimeout) clearTimeout(typingTimeout);
    }
}