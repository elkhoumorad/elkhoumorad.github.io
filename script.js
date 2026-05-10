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
