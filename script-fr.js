/* ==========================================================================
   THE TIME REVERSAL - SCRIPT PORTAIL LYCÉE (FRENCH)
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
    document.querySelectorAll('.btn, .level-btn, .chip, .stack-btn').forEach(button => {
        button.addEventListener('click', function (e) {
            if (this.classList.contains('expand-btn')) e.preventDefault();

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

    // --- 3. EXPANDABLE CURRICULUM LOGIC ---
    document.querySelectorAll('.expand-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault(); 
            const ul = this.previousElementSibling; 
            ul.classList.toggle('expanded');
            
            if (ul.classList.contains('expanded')) {
                this.innerHTML = 'Réduire le programme &uarr;';
                this.style.background = 'var(--primary)';
                this.style.color = 'white';
            } else {
                this.innerHTML = 'Voir tout le programme &rarr;';
                this.style.background = 'var(--app-bg)';
                this.style.color = 'var(--primary)';
            }
        });
    });

    // --- 4. STACKED CARDS & ONGLETS DYNAMIQUES LOGIC ---
    document.querySelectorAll('.stack-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            const levelContainer = this.closest('.level-container');
            if (!levelContainer) return;
            const targetClass = this.getAttribute('data-target');
            
            // Gestion des cartes
            const cards = levelContainer.querySelectorAll('.stack-card');
            cards.forEach(card => {
                card.classList.remove('active-card');
                card.style.zIndex = ""; 
            });
            const activeCard = levelContainer.querySelector('.' + targetClass);
            if (activeCard) {
                activeCard.classList.add('active-card');
                activeCard.style.zIndex = "10"; 
            }
            
            // Gestion des panneaux (Tabs)
            levelContainer.querySelectorAll('.tab-panel').forEach(panel => {
                panel.classList.remove('active-panel');
            });
            const targetPanel = levelContainer.querySelector('.' + targetClass);
            if (targetPanel && targetPanel.classList.contains('tab-panel')) {
                targetPanel.classList.add('active-panel');
            }
            
            // Style des boutons
            const allBtns = levelContainer.querySelectorAll('.stack-btn');
            allBtns.forEach(b => {
                b.style.color = 'var(--text-muted)';
                b.style.borderBottom = '2px solid transparent';
                b.classList.remove('active-btn');
            });
            
            this.style.color = 'var(--primary)';
            this.style.borderBottom = '2px solid var(--primary)';
            this.classList.add('active-btn');
        });
    });

    // --- 5. CHARGEMENT DYNAMIQUE POPUP (FICHES / PLAN) VIA FETCH ---
    const popup = document.getElementById('document-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');
    const closeBtn = document.getElementById('close-document-popup');

    document.querySelectorAll('.popup-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const docId = this.getAttribute('data-doc-id');
            const docType = this.getAttribute('data-doc-type');

            // Cible tes fichiers distants
            let filePath = 'cours/fiches/fiches.html'; // Fichier par défaut
            if (docType === 'plan') {
                filePath = 'cours/fiches/plan.html';
            }

            fetch(filePath)
                .then(response => {
                    if (!response.ok) throw new Error("Fichier source introuvable");
                    return response.text();
                })
                .then(htmlString => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlString, 'text/html');
                    const targetSnippet = doc.getElementById(docId);

                    if (targetSnippet) {
                        popupTitle.textContent = targetSnippet.getAttribute('data-title') || "Document";
                        popupContent.innerHTML = targetSnippet.innerHTML;
                        
                        popup.style.display = 'flex';
                        document.body.style.overflow = 'hidden';

                        if (window.MathJax) {
                            MathJax.typesetPromise([popupContent]);
                        }
                    } else {
                        console.error("L'ID " + docId + " est introuvable !");
                    }
                })
                .catch(err => console.error(err));
        });
    });

    // Fermeture de la popup
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = '';
        });
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // --- 6. LE CERVEAU DU CHATBOT ASSISTANT ---
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    if (chatBubble && chatWindow) {
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

        const brain = [
            { keywords: ["mouvement", "vitesse", "trajectoire", "mru"], response: "Le mouvement d'un corps est toujours relatif au référentiel ! 🚗", action: { id: "tc-mouvement-fiche", type: "fiche", btnText: "📖 Le Mouvement (TC)" } },
            { keywords: ["gravitation", "newton", "poids"], response: "Deux corps massiques s'attirent mutuellement selon la loi universelle de Newton.", action: { id: "tc-gravitation-fiche", type: "fiche", btnText: "📖 Gravitation (TC)" } },
            { keywords: ["dosage", "titrage", "équivalence"], response: "À l'équivalence d'un dosage, les réactifs sont totalement consommés 💧.", action: { id: "1bac-les-dosages", type: "fiche", btnText: "📖 Les Dosages (1BAC)" } },
            { keywords: ["nucléaire", "radioactivité", "demi-vie"], response: "L'évolution du nombre de noyaux suit une loi de décroissance exponentielle ☢️.", action: { id: "2bac-transformations-nucleaires", type: "fiche", btnText: "📖 Transfos Nucléaires (2BAC)" } },
            { keywords: ["équilibre", "quotient", "constante"], response: "Quand une réaction est limitée, le système atteint un équilibre dynamique ⚖️.", action: { id: "2bac-equilibre-systeme", type: "fiche", btnText: "📖 État d'équilibre (2BAC)" } },
            { keywords: ["salut", "bonjour", "yo"], response: "Salut ! 👋 Tape un mot-clé comme 'nucléaire', 'dosage', 'mouvement' pour trouver le bon cours !" }
        ];

        function getSmartResponse(userInput) {
            const query = userInput.toLowerCase();
            for (const knowledge of brain) {
                if (knowledge.keywords.some(kw => query.includes(kw))) {
                    let finalHTML = knowledge.response;
                    if (knowledge.action) {
                        finalHTML += `<br><br><button class="bot-action-btn popup-trigger" data-doc-type="${knowledge.action.type}" data-doc-id="${knowledge.action.id}">${knowledge.action.btnText}</button>`;
                    }
                    return finalHTML;
                }
            }
            return "C'est une bonne question 🤔 ! Essaie un mot-clé comme <strong>radioactivité</strong> ou <strong>dosage</strong>.";
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
            typing.innerHTML = '...';
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

        // Permet au bouton du Bot de déclencher la popup des fiches
        chatBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('bot-action-btn')) {
                const docId = e.target.getAttribute('data-doc-id');
                const docType = e.target.getAttribute('data-doc-type');
                
                let filePath = 'cours/fiches/fiches.html';
                if (docType === 'plan') filePath = 'cours/fiches/plan.html';

                fetch(filePath)
                    .then(response => response.text())
                    .then(htmlString => {
                        const doc = new DOMParser().parseFromString(htmlString, 'text/html');
                        const targetSnippet = doc.getElementById(docId);
                        if (targetSnippet) {
                            document.getElementById('popup-title').textContent = targetSnippet.getAttribute('data-title') || "Cours";
                            document.getElementById('popup-content').innerHTML = targetSnippet.innerHTML;
                            document.getElementById('document-popup').style.display = 'flex';
                            document.body.style.overflow = 'hidden';
                            if (window.MathJax) MathJax.typesetPromise([document.getElementById('popup-content')]);
                        }
                    });
            }
        });
    }

}); // <--- C'EST CETTE PARENTHÈSE QUI MANQUAIT À LA FIN DE TON FICHIER !
