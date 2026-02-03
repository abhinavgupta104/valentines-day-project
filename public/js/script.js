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
        "ขอร้องละค่ааа",
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

const music = document.getElementById('background-music');

no_button.addEventListener('click', () => {
    let banner = document.getElementById('banner');
    if (clicks === 0) {
        banner.src = "./public/images/no.gif";
        refreshBanner();
    }
    clicks++;
    const sizes = [40, 50, 30, 35, 45]
    const random = Math.floor(Math.random() * sizes.length);
    size += sizes[random]
    yes_button.style.height = `${size}px`;
    yes_button.style.width = `${size}px`;
    let total = answers_no[language].length;
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
    music.play().catch(error => {
        console.log('Could not play music:', error);
    });
});

yes_button.addEventListener('click', () => {
    let banner = document.getElementById('banner');
    banner.src = "./public/images/yes.gif";
    refreshBanner();
    let buttons = document.getElementsByClassName('buttons')[0];
    buttons.style.display = "none";
    let message = document.getElementsByClassName('message')[0];
    message.style.display = "block";
    
    if (typeof confetti === "function") {
        confetti({
            particleCount: 150,
            spread: 60,
            origin: { y: 0.6 }
        });
    }

    music.play().catch(error => {
        console.log('Could not play music:', error);
    });
});

no_button.addEventListener('mouseover', () => {
    const i = Math.floor(Math.random() * (window.innerWidth - no_button.offsetWidth));
    const j = Math.floor(Math.random() * (window.innerHeight - no_button.offsetHeight));
    no_button.style.position = "absolute";
    no_button.style.left = i + "px";
    no_button.style.top = j + "px";
});

no_button.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const i = Math.floor(Math.random() * (window.innerWidth - no_button.offsetWidth));
    const j = Math.floor(Math.random() * (window.innerHeight - no_button.offsetHeight));
    no_button.style.position = "absolute";
    no_button.style.left = i + "px";
    no_button.style.top = j + "px";
});

function refreshBanner() {
    let banner = document.getElementById('banner');
    let src = banner.src;
    banner.src = '';
    banner.src = src;
}

function changeLanguage() {
    const selectElement = document.getElementById("language-select");
    const selectedLanguage = selectElement.value;
    language = selectedLanguage;

    const questionHeading = document.getElementById("question-heading");
    if (language === "french") {
        questionHeading.textContent = "Tu veux être mon valentin?";
    } else if (language === "thai") {
        questionHeading.textContent = "คืนดีกับเราได้อ่ะป่าว?";
    } else {
        questionHeading.textContent = "Will you be my valentine?";
    }

    yes_button.innerHTML = answers_yes[language];
    no_button.innerHTML = answers_no[language][i - 1];

    const successMessage = document.getElementById("success-message");
    if (language === "french") {
        successMessage.textContent = "Yepppie, à bientôt :3";
    } else if (language === "thai") {
        successMessage.textContent = "ฮูเร่ คืนดีกันแล้วน้า :3";
    } else {
        successMessage.textContent = "Yepppie, see you sooonnn :3";
    }
}

document.addEventListener('mousemove', (e) => {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.left = (e.pageX + offsetX) + 'px';
    sparkle.style.top = (e.pageY + offsetY) + 'px';
    
    const size = Math.random() * 8 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    const colors = ['#ffeb3b', '#ff4081', '#ffffff', '#8bc34a'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 5px ${color}`;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

document.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');
    
    const offsetX = (Math.random() - 0.5) * 20;
    const offsetY = (Math.random() - 0.5) * 20;
    
    sparkle.style.left = (touch.pageX + offsetX) + 'px';
    sparkle.style.top = (touch.pageY + offsetY) + 'px';
    
    const size = Math.random() * 8 + 2;
    sparkle.style.width = size + 'px';
    sparkle.style.height = size + 'px';
    
    const colors = ['#ffeb3b', '#ff4081', '#ffffff', '#8bc34a'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    sparkle.style.backgroundColor = color;
    sparkle.style.boxShadow = `0 0 5px ${color}`;
    
    document.body.appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 1000);
});

document.body.addEventListener('touchstart', function() {
    if (music.paused) {
        music.play().catch(() => {});
    }
}, { once: true });