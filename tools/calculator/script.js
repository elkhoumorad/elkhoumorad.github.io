// --- 1. Load existing custom constants from the browser's memory ---
let savedConstants = JSON.parse(localStorage.getItem('userConstants')) || {};
// --- 1. Initialize Math.js Scope ---
    const scope = {
        c: 299792458,
        Na: 6.02214076e23,
        me: 9.1093837015e-31,
        mp: 1.67262192e-27,
        mn: 1.67492750056e-27,
        e: 1.602176634e-19,
        eps0: 8.8541878128e-12,
        mu0: 1.256637e-6,
        h: 1.054571817e-34, 
        kb: 1.380648520e-23,
        G: 6.6743015e-11,
        a0: 5.29177210544e-11,
        alpha: 7.2973525693e-3,
        Rh: 2.1798723611030e-18,
        ...savedConstants, // This adds the user's constants automatically
        Ans: 0 // Starts at 0
    };

    const inputField = document.getElementById('calc-input');
    const resultDisplay = document.getElementById('calc-result');

    // --- 2. Simple Insert ---
    function insert(value) {
        inputField.value += value;
        inputField.focus();
    }

    // --- 3. Foolproof Backspace ---
    function backspace() {
        let text = inputField.value;
        if (text.length > 0) {
            // Simply chops off the last character of the string
            inputField.value = text.slice(0, -1);
        }
        inputField.focus();
    }

    // --- 4. Clear Function ---
    function clearInput() {
        inputField.value = '';
        resultDisplay.innerText = '= 0';
        resultDisplay.style.color = "var(--border-color)";
        inputField.focus();
    }

// --- 3. Function to save a new one ---
function saveCustomConstant() {
    const name = document.getElementById('custom-name').value.trim();
    const value = parseFloat(document.getElementById('custom-value').value);

    if (name && !isNaN(value)) {
        // Add to our working scope
        scope[name] = value;
        
        // Save to browser memory
        savedConstants[name] = value;
        localStorage.setItem('userConstants', JSON.stringify(savedConstants));
        
        // Refresh the page or update the UI list to show the new constant
        alert(`Constant ${name} saved to your local browser!`);
        location.reload(); 
    } else {
        alert("Please enter a valid name and number.");
    }
}

    // --- 5. Calculation Engine ---
    function calculate() {
        const expression = inputField.value;
        if (!expression) return;

        try {
            // Fix for Ans: This finds the word "Ans" and explicitly replaces it 
            // with the actual saved number before doing the math. 
            // E.g., "Ans * 2" safely becomes "(3) * 2"
            let safeExpression = expression.replace(/Ans/g, `(${scope.Ans})`);
            
            // Evaluate the math
            let result = math.evaluate(safeExpression, scope);
            
            // Update Ans with the new result
            scope.Ans = result;
            
            // Format for display
            let formattedResult = math.format(result, { precision: 7 });
            
            resultDisplay.innerText = '= ' + formattedResult;
            resultDisplay.style.color = "var(--border-color)";
            
        } catch (error) {
            console.error(error); // Logs the exact error to your browser console just in case
            resultDisplay.innerText = 'Syntax Error';
            resultDisplay.style.color = "#ff7675";
        }
    }

    // --- 6. Keyboard Support ---
    inputField.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            calculate();
        }
    });

// 1. Function to create the list items in the sidebar
function updateCustomListUI() {
    const listElement = document.getElementById('user-constant-list');
    if (!listElement) return;

    // Clear existing list to prevent duplicates
    listElement.innerHTML = '';

    // Loop through everything saved in the browser memory
    for (let name in savedConstants) {
        const li = document.createElement('li');
        
        // This matches the style of your "Loaded Constants" [cite: 6, 7]
        li.innerHTML = `<span>${name}</span> <span>${savedConstants[name]}</span>`;
        
        // Make it clickable so it enters the calculator just like 'me' or 'h' [cite: 6, 7]
        li.onclick = function() { insert(name); };
        
        listElement.appendChild(li);
    }
}

// 2. Modify your Save function to update the UI immediately
function saveCustomConstant() {
    const name = document.getElementById('custom-name').value.trim();
    const value = document.getElementById('custom-value').value;

    if (name && value) {
        savedConstants[name] = value;
        localStorage.setItem('userConstants', JSON.stringify(savedConstants));
        
        // Update the math scope so you can use it immediately
        scope[name] = parseFloat(value);
        
        // Refresh the list on the screen
        updateCustomListUI();
        
        // Clear the input boxes
        document.getElementById('custom-name').value = '';
        document.getElementById('custom-value').value = '';
    }
}

// 3. Ensure the list shows up when you first open the page
window.addEventListener('load', updateCustomListUI);
