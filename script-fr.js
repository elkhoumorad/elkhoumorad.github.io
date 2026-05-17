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
            // Empêche le ripple de s'activer de manière erratique si c'est un lien
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

    // --- 3. EXPANDABLE CURRICULUM LOGIC ("Voir tout le programme") ---
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

    // --- 4. STACKED CARDS LOGIC (Cours / Fiches / Planif) ---
    document.querySelectorAll('.stack-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // 1. Trouver le conteneur principal du niveau cliqué
            const levelContainer = this.closest('.level-container');
            
            // 2. Trouver toutes les cartes dans ce niveau
            const cards = levelContainer.querySelectorAll('.stack-card');
            
            // 3. Trouver la classe de la carte cible (ex: "card-2")
            const targetClass = this.getAttribute('data-target');
            
            // 4. Réinitialiser TOUTES les cartes (enlever la classe active et nettoyer le z-index)
            cards.forEach(card => {
                card.classList.remove('active-card');
                card.style.zIndex = ""; // Crucial : laisse le CSS gérer l'ordre par défaut !
            });
            
            // 5. Mettre la carte ciblée au premier plan
            const activeCard = levelContainer.querySelector('.' + targetClass);
            if (activeCard) {
                activeCard.classList.add('active-card');
                activeCard.style.zIndex = "10"; // La force à passer par-dessus tout
            }
            
            // 6. Mettre à jour le style visuel des boutons (barre bleue en bas)
            const allBtns = levelContainer.querySelectorAll('.stack-btn');
            allBtns.forEach(b => {
                b.style.color = 'var(--text-muted)';
                b.style.borderBottom = '2px solid transparent';
            });
            
            this.style.color = 'var(--primary)';
            this.style.borderBottom = '2px solid var(--primary)';
        });
    });

    // --- 5. THE CHATBOT BRAIN ---
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

        // Les connaissances du Bot
        const brain = [
            { keywords: ["rlc", "circuit"], response: "Ah, les circuits RLC ! ⚡ L'équation différentielle s'écrit avec la loi d'additivité. Tu bloques sur l'amortissement ?" },
            { keywords: ["ondes", "lumière"], response: "Les ondes 🌊 ! Rappelle-toi : la fréquence ne change JAMAIS quand on change de milieu. C'est la longueur d'onde qui varie." },
            { keywords: ["chimie", "tableau"], response: "La chimie ! N'oublie jamais que le réactif limitant dicte la fin de la réaction. Besoin d'aide sur le calcul de x_max ?" },
            { keywords: ["salut", "bonjour", "yo"], response: "Salut ! 👋 Je suis l'assistant de Morad. Sur quel chapitre tu travailles aujourd'hui ?" }
        ];

        function getSmartResponse(userInput) {
            const query = userInput.toLowerCase();
            for (const knowledge of brain) {
                if (knowledge.keywords.some(kw => query.includes(kw))) {
                    return knowledge.response;
                }
            }
            return "C'est une bonne question 🤔 ! Essaie de me demander des choses sur les Ondes, les circuits RLC, ou la chimie.";
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
            typing.className = 'bot-msg';
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

        // Pour les suggestions rapides (les boutons "chip")
        window.handleChip = function(text) {
            chatInput.value = text;
            sendMessage();
        };
    }
});

// --- LOGIQUE DES ONGLETS DYNAMIQUES PORTAIL ---
document.querySelectorAll('.stack-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        
        const levelContainer = this.closest('.level-container');
        if (!levelContainer) return;
        
        const targetPanelClass = this.getAttribute('data-target');
        
        // 1. Désactiver tous les panneaux de ce niveau
        levelContainer.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active-panel');
        });
        
        // 2. Activer le panneau ciblé
        const targetPanel = levelContainer.querySelector('.' + targetPanelClass);
        if (targetPanel) {
            targetPanel.classList.add('active-panel');
        }
        
        // 3. Mettre à jour le style visuel des boutons de navigation
        levelContainer.querySelectorAll('.stack-btn').forEach(b => {
            b.classList.remove('active-btn');
        });
        this.classList.add('active-btn');
    });
});



// --- CENTRALISATION DES FICHES ET PLANIFICATIONS ---
const documentDatabase = {
    // Fiches Tronc Commun
    "tc-mecanique-fiche": {
        title: "Fiche Pédagogique : Mécanique (TC)",
        content: `<h4>Objectifs cardinaux de la leçon :</h4>
                  <p>Introduire les concepts de forces, d'actions mécaniques et de modélisation par un vecteur force.</p>
                  <table border="1" style="width:100%; border-collapse:collapse; margin-top:15px;">
                    <tr style="background:#f2f2f2;"><th>Étapes</th><th>Durée</th><th>Activités du professeur</th></tr>
                    <tr><td>Situation problème</td><td>15 min</td><td>Présenter le cas du solide sur un plan incliné.</td></tr>
                    <tr><td>Dédiement théorique</td><td>30 min</td><td>Définir les caractéristiques d'une force constante.</td></tr>
                  </table>`
    },
    "tc-chimie-fiche": {
        title: "Fiche Pédagogique : Extraction & Séparation (TC)",
        content: `<h4>Compétences visées :</h4>
                  <p>Savoir choisir le bon solvant extracteur en fonction de la solubilité et de la densité.</p>
                  <ul>
                    <li>Mise en œuvre d'une hydrodistillation.</li>
                    <li>Utilisation d'une ampoule à décanter.</li>
                  </ul>`
    },
    // Planifications
    "tc-progression-annuelle": {
        title: "Progression Annuelle Globale - Physique-Chimie TC",
        content: `<h4>Répartition semestrielle du programme :</h4>
                  <p><strong>Semestre 1 :</strong> Gravitation universelle, Éléments chimiques, Modèle de l'atome.</p>
                  <p><strong>Semestre 2 :</strong> Équilibre d'un solide, Solutions aqueuses, Analyse chimique.</p>`
    }
};

// --- LOGIQUE D'AFFICHAGE POPUP ---
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('document-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');
    const closeBtn = document.getElementById('close-document-popup');

    // Écouteur générique sur tous les liens de fiches et planifications ayant un attribut 'data-doc-id'
    document.body.addEventListener('click', function(e) {
        const targetLink = e.target.closest('[data-doc-id]');
        if (targetLink) {
            e.preventDefault();
            const docId = targetLink.getAttribute('data-doc-id');
            const documentData = documentDatabase[docId];

            if (documentData) {
                // Injection dynamique du contenu et du titre
                popupTitle.textContent = documentData.title;
                popupContent.innerHTML = documentData.content;
                
                // Affichage fluide de la popup
                popup.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Bloque le scroll de la page principale arrière
                
                // Si le document contient des formules physiques complexes, on force MathJax à les re-rendre
                if (window.MathJax) {
                    MathJax.typesetPromise([popupContent]);
                }
            }
        }
    });

    // Fermeture de la popup
    if (closeBtn && popup) {
        closeBtn.addEventListener('click', () => {
            popup.style.display = 'none';
            document.body.style.overflow = ''; // Libère le scroll arrière
        });

        // Fermer si l'utilisateur clique en dehors de la carte centrale blanche
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                popup.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
});









// --- CHARGEMENT DYNAMIQUE INTELLIGENT (FICHE OU PLAN) VIA FETCH ---
document.addEventListener("DOMContentLoaded", () => {
    const popup = document.getElementById('document-popup');
    const popupTitle = document.getElementById('popup-title');
    const popupContent = document.getElementById('popup-content');
    const closeBtn = document.getElementById('close-document-popup');

    document.querySelectorAll('.popup-trigger').forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            const docId = this.getAttribute('data-doc-id');
            const docType = this.getAttribute('data-doc-type'); // Récupère 'fiche' ou 'plan'

            // Détermine le bon chemin de fichier selon le type
            let filePath = 'cours/fiches/fiches.html'; // Par défaut
            if (docType === 'plan') {
                filePath = 'cours/fiches/plan.html';
            }

            // Exécution du fetch dynamique
            fetch(filePath)
                .then(response => {
                    if (!response.ok) throw new Error("Fichier source introuvable : " + filePath);
                    return response.text();
                })
                .then(htmlString => {
                    const parser = new DOMParser();
                    const doc = parser.parseFromString(htmlString, 'text/html');
                    const targetSnippet = doc.getElementById(docId);

                    if (targetSnippet) {
                        const title = targetSnippet.getAttribute('data-title') || "Document";
                        
                        popupTitle.textContent = title;
                        popupContent.innerHTML = targetSnippet.innerHTML;

                        popup.style.display = 'flex';
                        document.body.style.overflow = 'hidden';

                        if (window.MathJax && typeof MathJax.typesetPromise === 'function') {
                            MathJax.typesetPromise([popupContent]);
                        }
                    } else {
                        console.error("L'ID '" + docId + "' n'existe pas dans " + filePath);
                    }
                })
                .catch(err => console.error("Erreur lors du chargement du document :", err));
        });
    });

    // Fermetures standards de la popup
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
});
