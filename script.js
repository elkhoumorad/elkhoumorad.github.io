// The Time Reversal - Main Script

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

// Function to handle sending a message
function sendMessage() {
    const text = chatInput.value.trim();
    if (text === '') return; // Don't send empty messages

    // 1. Create and display the User's message
    const userMsg = document.createElement('p');
    userMsg.className = 'user-msg';
    userMsg.textContent = text;
    chatBody.appendChild(userMsg);

    // Clear the input box and scroll to the bottom
    chatInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // 2. Simulate the Bot's response (Wait 1 second)
    setTimeout(() => {
        const botMsg = document.createElement('p');
        botMsg.className = 'bot-msg';
        
        // This is where you would normally connect to a real AI/Backend
        botMsg.textContent = "I'm just a frontend demo right now! To answer real physics questions, I need to be connected to a backend server.";
        
        chatBody.appendChild(botMsg);
        
        // Scroll to the bottom again to show the new message
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000); 
}

// Trigger send when clicking the button
chatSend.addEventListener('click', sendMessage);

// Trigger send when pressing the "Enter" key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
