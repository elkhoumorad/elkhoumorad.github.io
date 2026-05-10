// The Time Reversal - Main Script
// --- The Research Knowledge Base ---
// You can expand this as much as you want!

document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to The Time Reversal Lab!");
    
    // Future scripts (like dark mode toggles or dynamic article loading) 
    // can be added here.
});





// --- 1. THE NEW BRAIN (Replaces knowledgeBase) ---
const brain = [
    {
        topic: "skyrmions",
        keywords: ["skyrmion", "skyrmions", "soliton", "magnetic", "thin film", "barrier", "topology"],
        response: "Magnetic skyrmions are topologically protected quasiparticles. My research investigates energy barriers and topological stability in thin films."
    },
    {
        topic: "quantum_dots",
        keywords: ["quantum dot", "quantum dots", "semiconductor", "nano", "nanotechnology"],
        response: "Quantum dots are nanometer-scale semiconductors. I focus on their potential in quantum computing and optoelectronics."
    },
    {
        topic: "symmetry",
        keywords: ["symmetry", "symmcalc", "irreducible", "representation", "point group", "chemistry"],
        response: "SymmCalc handles irreducible representations for molecular point groups. It’s a tool I built to bridge group theory and chemistry."
    },
    {
        topic: "calculator",
        keywords: ["calculator", "constant", "convert", "physics calc"],
        response: "The Physics Calculator handles essential constants and unit conversions. You can launch it from the 'Interactive Tools' sidebar."
    },
    {
        topic: "contact",
        keywords: ["contact", "email", "github", "reach", "who are you", "author"],
        response: "I'm the Research Assistant for Morad. You can reach him via the email icon at the top of the page or check out his GitHub."
    },
    {
        topic: "greeting",
        keywords: ["hi", "hello", "hey", "sup", "morning"],
        response: "Hello! I'm here to help. Ask me about Morad's research, SymmCalc, or the Physics Calculator."
    }
];

// --- 2. THE MEMORY VARIABLE ---
let lastTopic = null; 

// --- 3. THE TOGGLE LOGIC (Keep this as is) ---
const chatBubble = document.getElementById('chat-bubble');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');

chatBubble.addEventListener('click', () => {
    chatWindow.style.display = 'flex';
    chatBubble.style.display = 'none';
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    chatBubble.style.display = 'block';
});

// --- 4. THE INTELLIGENCE ENGINE ---
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = document.getElementById('chat-body');

function getSmartResponse(userInput) {
    const query = userInput.toLowerCase().replace(/[^\w\s\d]/gi, '');
    const followUpWords = ["more", "why", "how", "it", "explain", "detail"];
    const isFollowUp = followUpWords.some(word => query.includes(word));

    if (isFollowUp && lastTopic) {
        if (lastTopic === "skyrmions") return "The topological stability of skyrmions makes them incredibly fascinating for next-gen high-density memory storage.";
        if (lastTopic === "symmetry") return "Symmetry groups dictate molecular vibrations. SymmCalc automates that heavy mathematical lifting.";
        if (lastTopic === "quantum_dots") return "Because of quantum confinement, we can actually 'tune' the bandgap of these dots by changing their size.";
    }

    for (const knowledge of brain) {
        for (const keyword of knowledge.keywords) {
            if (query.includes(keyword)) {
                lastTopic = knowledge.topic; 
                return knowledge.response;
            }
        }
    }

    return "I'm fine-tuned on Morad's research—try asking me about semiconductors, skyrmions, or the SymmCalc tool!";
}

// --- 5. THE MESSAGE HANDLER ---
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    const userMsg = document.createElement('p');
    userMsg.className = 'user-msg';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);
    
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    const typingIndicator = document.createElement('p');
    typingIndicator.className = 'bot-msg typing-dots';
    typingIndicator.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatBody.appendChild(typingIndicator);

    setTimeout(() => {
        chatBody.removeChild(typingIndicator);
        const botMsg = document.createElement('p');
        botMsg.className = 'bot-msg';
        botMsg.innerHTML = getSmartResponse(text); 
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 600);
}

function handleChip(text) {
    chatInput.value = text;
    sendMessage();
}

chatSend.addEventListener('click', sendMessage);
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessage();
});
