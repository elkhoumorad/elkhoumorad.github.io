// The Time Reversal - Main Script
// --- The Research Knowledge Base ---
// You can expand this as much as you want!
const knowledgeBase = {
    "skyrmion": "Magnetic skyrmions are topologically protected quasiparticles. My research investigates energy barriers and topological stability in thin films.",
    "quantum dot": "Quantum dots are nanometer-scale semiconductors. I focus on their potential in quantum computing and optoelectronics.",
    "symmetry": "SymmCalc handles irreducible representations for molecular point groups. It’s a tool I built to bridge group theory and chemistry.",
    "calculator": "The Physics Calculator includes essential constants and unit converters. You can launch it from the 'Interactive Tools' sidebar.",
    "who are you": "I am the Research Assistant for 'The Time Reversal.' I can explain Morad's projects and the physics behind them.",
    "contact": "You can reach Morad via the email icon in the header or the 'About' section.",
    "hello": "Halleluja! I'm here to help. Ask me about Skyrmions, SymmCalc, or the Physics Calculator.",
    "thank": "You're welcome! Let me know if you have more physics questions."
};
document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to The Time Reversal Lab!");
    
    // Future scripts (like dark mode toggles or dynamic article loading) 
    // can be added here.
});





// Chatbot Toggle Logic
const chatBubble = document.getElementById('chat-bubble');
const chatWindow = document.getElementById('chat-window');
const closeChat = document.getElementById('close-chat');

chatBubble.addEventListener('click', () => {
    // Toggle the display of the chat window
    if (chatWindow.style.display === 'none') {
        chatWindow.style.display = 'flex';
        chatBubble.style.display = 'none'; // Hide bubble when open
    }
});

closeChat.addEventListener('click', () => {
    chatWindow.style.display = 'none';
    chatBubble.style.display = 'block'; // Show bubble again
});


// --- Chatbot Messaging Logic ---
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatBody = document.getElementById('chat-body');



function getBotResponse(input) {
    const query = input.toLowerCase();
    
    // Check for keywords
    for (const key in knowledgeBase) {
        if (query.includes(key)) {
            return knowledgeBase[key];
        }
    }
    
    // Default response if no keyword is found
    return "That's an interesting point. While I don't have a specific note on that yet, you might find related information in the 'Recent Notes' section!";
}


// Function to handle sending a message
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return;

    // Display User Message
    const userMsg = document.createElement('p');
    userMsg.className = 'user-msg';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);

    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Instant Bot Response
    setTimeout(() => {
        const botMsg = document.createElement('p');
        botMsg.className = 'bot-msg';
        botMsg.textContent = getBotResponse(text);
        
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 400); // 400ms delay just to make it feel 'natural'
}

// Trigger send when clicking the button
chatSend.addEventListener('click', sendMessage);

// Trigger send when pressing the "Enter" key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
