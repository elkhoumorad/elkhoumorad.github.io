/* ==========================================================================
   THE TIME REVERSAL - STUDENT PORTAL SCRIPT (FRENCH)
   ========================================================================== */

// --- 1. DYNAMIC BACKGROUND BUBBLES ---
function createBubbles() {
    const bubbleContainer = document.createElement('div');
    bubbleContainer.id = 'bubble-wrap';
    document.body.appendChild(bubbleContainer);

    const bubbleCount = 15; // Number of floating bubbles
    
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement('div');
        bubble.classList.add('floating-bubble');
        
        // Randomize size, position, and animation duration
        const size = Math.random() * 60 + 20; 
        bubble.style.width = `${size}px`;
        bubble.style.height = `${size}px`;
        bubble.style.left = `${Math.random() * 100}vw`;
        bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
        bubble.style.animationDelay = `${Math.random() * 5}s`;
        
        bubbleContainer.appendChild(bubble);
    }
}

// Initialize bubbles on load
window.addEventListener('DOMContentLoaded', createBubbles);

// --- 2. THE CHATBOT BRAIN (High School Edition) ---
const brain = [
    {
        topic: "rlc",
        keywords: ["rlc", "circuit", "condensateur", "bobine", "electricité", "électricité"],
        response: "Ah, les circuits RLC ! ⚡ Super important pour le Bac. C'est là qu'on voit l'échange d'énergie entre le condensateur et la bobine. Tu bloques sur l'équation différentielle ?"
    },
    {
        topic: "ondes",
        keywords: ["onde", "ondes", "mécanique", "lumineuse", "lumière", "diffraction"],
        response: "Les ondes 🌊 ! Rappelle-toi : une onde transporte de l'énergie, pas de la matière. Tu veux revoir la relation entre la longueur d'onde et la fréquence (v = λ/T) ?"
    },
    {
        topic: "chimie",
        keywords: ["chimie", "acide", "base", "ph", "titrage", "dosage", "tableau d'avancement"],
        response: "La chimie, c'est comme de la cuisine mais on ne lèche pas la cuillère 🧪 ! Pour les titrages, n'oublie jamais que le réactif limitant dicte la fin de la réaction. Besoin d'aide sur le tableau d'avancement ?"
    },
    {
        topic: "mecanique",
        keywords: ["mécanique", "newton", "projectile", "chute libre", "vitesse", "accélération"],
        response: "La mécanique de Newton 🍎 ! La 2ème loi (ΣF = m.a) est ton meilleur ami ici. N'oublie pas de bien définir ton système et ton repère avant de commencer un exercice."
    },
    {
        topic: "greeting",
        keywords: ["salut", "bonjour", "yo", "coucou", "hey"],
        response: "Salut ! 👋 Je suis l'assistant du prof Morad. Je suis là pour t'aider à réviser la Physique-Chimie. Sur quel chapitre tu travailles aujourd'hui ?"
    }
];

let lastTopic = null;

// --- 3. CHATBOT LOGIC ---
const chatBubble = document.getElementById('chat-bubble');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = document.getElementById('chat-body');

chatBubble.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
    chatBubble.style.display = 'none';
    chatBubble.style.transform = 'scale(0)'; // Animation
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    chatBubble.style.display = 'block';
    setTimeout(() => chatBubble.style.transform = 'scale(1)', 50);
});

function getSmartResponse(userInput) {
    const query = userInput.toLowerCase().replace(/[^\w\s\dàâçéèêëîïôûùü]/gi, ''); // Includes French accents
    
    // Follow-up logic
    const followUpWords = ["oui", "comment", "pourquoi", "plus", "explique"];
    const isFollowUp = followUpWords.some(word => query.includes(word));

    if (isFollowUp && lastTopic) {
        if (lastTopic === "rlc") return "Pour l'équation diff, commence toujours par la loi d'additivité des tensions : Ur + Ul + Uc = 0 (en régime libre). Puis remplace par les expressions avec 'i' et 'q' ! 🧠";
        if (lastTopic === "chimie") return "Le secret du tableau d'avancement, c'est de bien équilibrer l'équation de base. Si tes coefficients stœchiométriques sont faux, tout le reste le sera ! ⚠️";
    }

    for (const knowledge of brain) {
        for (const keyword of knowledge.keywords) {
            if (query.includes(keyword)) {
                lastTopic = knowledge.topic; 
                return knowledge.response;
            }
        }
    }

    return "C'est une bonne question 🤔 ! Essaie de me demander des choses sur les Ondes, les circuits RLC, ou la mécanique de Newton.";
}

function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // Add user message
    const userMsg = document.createElement('p');
    userMsg.className = 'user-msg';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Show Typing Indicator
    const typingIndicator = document.createElement('p');
    typingIndicator.className = 'bot-msg typing-dots';
    typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatBody.appendChild(typingIndicator);

    // Get response with a slight delay
    setTimeout(() => {
        chatBody.removeChild(typingIndicator);
        const botMsg = document.createElement('p');
        botMsg.className = 'bot-msg';
        botMsg.innerHTML = getSmartResponse(text); 
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 700);
}

function handleChip(text) {
    chatInput.value = text;
    sendMessage();
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});

// --- 4. ANDROID RIPPLE EFFECT FOR BUTTONS ---
document.querySelectorAll('.btn, .level-btn, .chip').forEach(button => {
    button.addEventListener('click', function (e) {
        let x = e.clientX - e.target.getBoundingClientRect().left;
        let y = e.clientY - e.target.getBoundingClientRect().top;
        
        let ripples = document.createElement('span');
        ripples.style.left = x + 'px';
        ripples.style.top = y + 'px';
        ripples.classList.add('ripple-effect');
        this.appendChild(ripples);
        
        setTimeout(() => { ripples.remove() }, 600); // Remove after animation
    });
});



// --- 5. EXPANDABLE CURRICULUM LOGIC ---
document.querySelectorAll('.expand-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault(); // Empêche le lien de recharger la page
        
        // Trouve la liste <ul> juste au-dessus de ce bouton précis
        const ul = this.previousElementSibling; 
        
        // Alterne l'état "déplié" / "plié"
        ul.classList.toggle('expanded');
        
        // Change le texte du bouton en fonction de l'état
        if (ul.classList.contains('expanded')) {
            this.innerHTML = 'Réduire le programme &uarr;';
            this.style.background = 'var(--primary)'; // Devient plein
            this.style.color = 'white';
        } else {
            this.innerHTML = 'Voir tout le programme &rarr;';
            this.style.background = 'var(--app-bg)'; // Reprend sa couleur douce
            this.style.color = 'var(--primary)';
        }
    });
});
