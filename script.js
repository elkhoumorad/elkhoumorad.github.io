/* ==========================================================================
   THE TIME REVERSAL - ENGLISH RESEARCH SCRIPT
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {

    // --- 1. DYNAMIC BACKGROUND BUBBLES ---
    function createBubbles() {
        const bubbleContainer = document.createElement('div');
        bubbleContainer.id = 'bubble-wrap';
        document.body.appendChild(bubbleContainer);

        const bubbleCount = 15; 
        
        for (let i = 0; i < bubbleCount; i++) {
            const bubble = document.createElement('div');
            bubble.classList.add('floating-bubble');
            
            const size = Math.random() * 60 + 20; 
            bubble.style.width = `${size}px`;
            bubble.style.height = `${size}px`;
            bubble.style.left = `${Math.random() * 100}vw`;
            bubble.style.animationDuration = `${Math.random() * 10 + 10}s`;
            bubble.style.animationDelay = `${Math.random() * 5}s`;
            
            bubbleContainer.appendChild(bubble);
        }
    }
    createBubbles();

    // --- 2. ANDROID RIPPLE EFFECT ---
    document.querySelectorAll('.btn, .chip, .lang-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            let x = e.clientX - e.target.getBoundingClientRect().left;
            let y = e.clientY - e.target.getBoundingClientRect().top;
            
            let ripples = document.createElement('span');
            ripples.style.left = x + 'px';
            ripples.style.top = y + 'px';
            ripples.classList.add('ripple-effect');
            this.appendChild(ripples);
            
            setTimeout(() => { ripples.remove() }, 600); 
        });
    });

    // --- 3. THE RESEARCH CHATBOT BRAIN ---
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    if (chatBubble && chatWindow) {
        
        // Open / Close
        chatBubble.addEventListener('click', () => {
            chatWindow.style.display = 'flex';
            chatBubble.style.display = 'none';
            chatBubble.style.transform = 'scale(0)';
        });

        closeChat.addEventListener('click', () => {
            chatWindow.style.display = 'none';
            chatBubble.style.display = 'block';
            setTimeout(() => chatBubble.style.transform = 'scale(1)', 50);
        });

        // The English Knowledge Base (with URL Actions!)
        const brain = [
            {
                keywords: ["skyrmion", "skyrmions", "soliton", "magnetic", "thin film"],
                response: "Magnetic skyrmions are topologically protected quasiparticles. My research investigates energy barriers and topological stability in thin films.",
                action: { url: "#", btnText: "🔬 Read Research Notes" }
            },
            {
                keywords: ["quantum dot", "quantum dots", "semiconductor", "hydrogen"],
                response: "Quantum dots are nanometer-scale semiconductors. I focus on their potential in quantum computing. You can check out my article on the Hydrogen Atom Wave Function!",
                action: { url: "articles/article_1/", btnText: "📖 Read: Hydrogen Atom" }
            },
            {
                keywords: ["symmetry", "symmcalc", "irreducible", "point group"],
                response: "SymmCalc handles irreducible representations for molecular point groups. It’s a tool I built to bridge group theory and chemistry.",
                action: { url: "tools/symmetry-project/", btnText: "⚙️ Launch SymmCalc" }
            },
            {
                keywords: ["plotter", "math", "graph", "function"],
                response: "I built an interactive 2D/3D mathematical function visualization tool utilizing JavaScript.",
                action: { url: "tools/plotter-project/", btnText: "📈 Launch Plotter Pro" }
            },
            {
                keywords: ["calculator", "constant", "physics calc"],
                response: "The Physics Calculator handles essential constants and unit conversions.",
                action: { url: "tools/calculator/", btnText: "🧮 Launch Calculator" }
            },
            {
                keywords: ["contact", "email", "github", "who are you"],
                response: "I'm Morad's virtual research assistant. You can check his GitHub or read the 'About the Editor' section to learn more about his background in solid state physics!"
            },
            {
                keywords: ["hi", "hello", "hey", "sup", "morning"],
                response: "Hello! I'm here to help. Ask me about Morad's research, SymmCalc, Quantum Dots, or the Physics Calculator."
            }
        ];

        let lastTopic = null;

        function getSmartResponse(userInput) {
            const query = userInput.toLowerCase().replace(/[^\w\s\d]/gi, '');
            const followUpWords = ["more", "why", "how", "it", "explain", "detail"];
            const isFollowUp = followUpWords.some(word => query.includes(word));

            // Contextual Follow-up
            if (isFollowUp && lastTopic) {
                if (lastTopic.includes("skyrmion")) return "The topological stability of skyrmions makes them incredibly fascinating for next-gen high-density memory storage.";
                if (lastTopic.includes("symmetry")) return "Symmetry groups dictate molecular vibrations. SymmCalc automates that heavy mathematical lifting.";
                if (lastTopic.includes("quantum")) return "Because of quantum confinement, we can actually 'tune' the bandgap of these dots by changing their size.";
            }

            for (const knowledge of brain) {
                if (knowledge.keywords.some(kw => query.includes(kw))) {
                    lastTopic = knowledge.keywords[0]; // Remember context
                    
                    let finalHTML = knowledge.response;
                    if (knowledge.action) {
                        // In English, we generate direct links to your tools/articles instead of popups
                        finalHTML += `<br><br><a href="${knowledge.action.url}" class="bot-action-btn">${knowledge.action.btnText}</a>`;
                    }
                    return finalHTML;
                }
            }
            return "I'm fine-tuned on Morad's research—try asking me about semiconductors, skyrmions, or the SymmCalc tool!";
        }

        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === '') return;

            const userMsg = document.createElement('p');
            userMsg.className = 'user-msg';
            userMsg.textContent = text;
            chatBody.appendChild(userMsg);
            
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            const typing = document.createElement('p');
            typing.className = 'bot-msg typing-dots';
            typing.innerHTML = '<span>.</span><span>.</span><span>.</span>';
            chatBody.appendChild(typing);

            setTimeout(() => {
                chatBody.removeChild(typing);
                const botMsg = document.createElement('p');
                botMsg.className = 'bot-msg';
                botMsg.innerHTML = getSmartResponse(text); 
                chatBody.appendChild(botMsg);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 600);
        }

        chatSend.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendMessage();
        });

        window.handleChip = function(text) {
            chatInput.value = text;
            sendMessage();
        };
    }
});
