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
    banner.src = "./public/images/yes.gif";
    refreshBanner();
    // hide buttons div
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
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

const moveButton = () => {
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

    // Add safe margin so button doesn't hit edges
    const margin = 20;
    const maxWidth = window.innerWidth - no_button.offsetWidth - margin;
    const maxHeight = window.innerHeight - no_button.offsetHeight - margin;
    const i = Math.floor(Math.random() * maxWidth) + margin / 2;
    const j = Math.floor(Math.random() * maxHeight) + margin / 2;

    no_button.style.position = "absolute";
    no_button.style.left = i + "px";
    no_button.style.top = j + "px";

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
    moveButton();
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