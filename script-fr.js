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

    // --- 5. THE CHATBOT BRAIN (Mise à jour Intelligente) ---
document.addEventListener("DOMContentLoaded", () => {
    const chatBubble = document.getElementById('chat-bubble');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatBody = document.getElementById('chat-body');

    if (chatBubble && chatWindow) {
        // --- Animations d'ouverture/fermeture ---
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

        // --- Le Cerveau du Bot (Base de Connaissances) ---
        const brain = [
            // TRONC COMMUN
            {
                keywords: ["mouvement", "vitesse", "trajectoire", "mru", "référentiel"],
                response: "Le mouvement d'un corps est toujours relatif au référentiel choisi ! 🚗 La vitesse instantanée se calcule souvent avec la méthode des milieux.",
                action: { id: "tc-mouvement-fiche", type: "fiche", btnText: "📖 Ouvrir le cours : Le Mouvement (TC)" }
            },
            {
                keywords: ["gravitation", "newton", "poids", "attraction"],
                response: "Deux corps massiques s'attirent mutuellement selon la loi universelle de Newton. Savais-tu que le poids (P = mg) n'est qu'un cas particulier de cette force à la surface de la Terre ?",
                action: { id: "tc-gravitation-fiche", type: "fiche", btnText: "📖 Ouvrir le cours : Gravitation (TC)" }
            },
            {
                keywords: ["classification", "périodique", "mendeleïev", "famille", "tableau"],
                response: "Dans la classification périodique moderne, les éléments sont rangés par numéro atomique Z croissant. Une même colonne regroupe une même famille chimique ! 🧪",
                action: { id: "tc-classification-fiche", type: "fiche", btnText: "📖 Ouvrir le cours : Classification Périodique" }
            },
            // 1ÈRE ANNÉE BAC
            {
                keywords: ["dosage", "titrage", "équivalence", "colorimétrique"],
                response: "À l'équivalence d'un dosage, les réactifs ont été introduits dans les proportions stœchiométriques (ils sont totalement consommés). C'est souvent repéré par un changement brusque de couleur 💧.",
                action: { id: "1bac-les-dosages", type: "fiche", btnText: "📖 Ouvrir le cours : Les Dosages (1BAC)" }
            },
            {
                keywords: ["travail", "poids", "potentielle", "energie", "pesanteur"],
                response: "Le travail du poids est indépendant du chemin suivi, on dit que c'est une force conservative. Ce travail est directement lié à la variation de l'énergie potentielle de pesanteur (Epp) 📉.",
                action: { id: "1bac-travail-potentiel", type: "fiche", btnText: "📖 Ouvrir le cours : Travail et Epp (1BAC)" }
            },
            // 2ÈME ANNÉE BAC
            {
                keywords: ["nucléaire", "radioactivité", "demi-vie", "isotope", "fission", "fusion"],
                response: "La radioactivité est une transformation nucléaire spontanée et inéluctable. L'évolution du nombre de noyaux suit une loi de décroissance exponentielle stricte ☢️.",
                action: { id: "2bac-transformations-nucleaires", type: "fiche", btnText: "📖 Ouvrir le cours : Transfos Nucléaires (2BAC)" }
            },
            {
                keywords: ["équilibre", "quotient", "constante", "avancement final"],
                response: "Quand une réaction chimique est limitée (τ < 1), le système atteint un état d'équilibre dynamique. Le quotient de réaction Qr devient alors égal à la constante d'équilibre K ⚖️.",
                action: { id: "2bac-equilibre-systeme", type: "fiche", btnText: "📖 Ouvrir le cours : État d'équilibre (2BAC)" }
            },
            {
                keywords: ["salut", "bonjour", "yo", "hello"],
                response: "Salut ! 👋 Je suis l'assistant virtuel. Je connais l'ensemble du programme de Physique-Chimie. Tape un mot-clé comme 'nucléaire', 'dosage', 'mouvement' ou 'équilibre' pour que je te trouve le bon cours !"
            }
        ];

        // --- Logique d'analyse ---
        function getSmartResponse(userInput) {
            const query = userInput.toLowerCase();
            for (const knowledge of brain) {
                // Vérifie si un des mots-clés est dans la phrase de l'utilisateur
                if (knowledge.keywords.some(kw => query.includes(kw))) {
                    let finalHTML = knowledge.response;
                    // Si la connaissance possède un cours lié, on génère un bouton
                    if (knowledge.action) {
                        finalHTML += `<br><br><button class="bot-action-btn" data-doc-type="${knowledge.action.type}" data-doc-id="${knowledge.action.id}">${knowledge.action.btnText}</button>`;
                    }
                    return finalHTML;
                }
            }
            return "C'est une excellente question 🤔 ! Je suis encore en apprentissage. Essaie de me demander des choses sur la <strong>radioactivité</strong>, les <strong>dosages</strong>, ou la <strong>gravitation</strong>.";
        }

        // --- Gestion de l'envoi de message ---
        function sendMessage() {
            const text = chatInput.value.trim();
            if (text === '') return;

            // Message Utilisateur
            const userMsg = document.createElement('p');
            userMsg.className = 'user-msg';
            userMsg.textContent = text;
            chatBody.appendChild(userMsg);
            
            chatInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Animation "Le bot écrit..."
            const typing = document.createElement('p');
            typing.className = 'bot-msg';
            typing.innerHTML = '<span class="typing-dots">...</span>';
            chatBody.appendChild(typing);

            // Réponse du Bot
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

        // --- ÉCOUTEUR DYNAMIQUE POUR LES BOUTONS DU BOT ---
        // Permet au bot d'ouvrir la popup de cours sans recharger la page
        chatBody.addEventListener('click', (e) => {
            if (e.target.classList.contains('bot-action-btn')) {
                const docId = e.target.getAttribute('data-doc-id');
                const docType = e.target.getAttribute('data-doc-type');
                
                let filePath = 'cours/fiches/TC.html'; // Remplace par ton chemin par défaut
                if (docType === 'plan') { filePath = 'cours/fiches/plan.html'; }

                // Réutilisation de la logique fetch pour le bot
                fetch(filePath)
                    .then(response => response.text())
                    .then(htmlString => {
                        const parser = new DOMParser();
                        const doc = parser.parseFromString(htmlString, 'text/html');
                        const targetSnippet = doc.getElementById(docId);

                        if (targetSnippet) {
                            document.getElementById('popup-title').textContent = targetSnippet.getAttribute('data-title') || "Cours";
                            document.getElementById('popup-content').innerHTML = targetSnippet.innerHTML;
                            document.getElementById('document-popup').style.display = 'flex';
                            document.body.style.overflow = 'hidden';

                            if (window.MathJax) { MathJax.typesetPromise([document.getElementById('popup-content')]); }
                        }
                    })
                    .catch(err => console.error("Erreur Bot Fetch :", err));
            }
        });
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
