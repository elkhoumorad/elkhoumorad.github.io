// --- 1. Initialize memory from the browser FIRST ---
// This prevents errors when updateCustomListUI() runs
let savedConstants = JSON.parse(localStorage.getItem('userConstants')) || {};

// --- 2. Initialize Math.js Scope ---
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
    Ans: 0 
};

// Merge saved user constants into the math scope immediately
Object.assign(scope, savedConstants);

const inputField = document.getElementById('calc-input');
const resultDisplay = document.getElementById('calc-result');

// --- 3. Core Calculator Functions ---
function insert(value) {
    inputField.value += value;
    inputField.focus();
}

function backspace() {
    let text = inputField.value;
    if (text.length > 0) {
        inputField.value = text.slice(0, -1);
    }
    inputField.focus();
}

function clearInput() {
    inputField.value = '';
    resultDisplay.innerText = '= 0';
    resultDisplay.style.color = "var(--border-color)";
    inputField.focus();
}

// --- 4. Custom Constants Logic ---

// Function to create the list items in the sidebar
function updateCustomListUI() {
    const listElement = document.getElementById('user-constant-list');
    if (!listElement) return;

    listElement.innerHTML = '';

    for (let name in savedConstants) {
        const li = document.createElement('li');
        
        // We create a container for the text and a separate one for the button
        li.innerHTML = `
            <div class="constant-item-content" onclick="insert('${name}')">
                <span class="const-name">${name}</span>
                <span class="const-val">${savedConstants[name]}</span>
            </div>
            <button onclick="deleteConstant('${name}')" class="delete-btn" title="Delete">×</button>
        `;
        
        listElement.appendChild(li);
    }
}
// Delete function


function deleteConstant(name) {
    if (confirm(`Remove "${name}" from your lab constants?`)) {
        // 1. Remove from the memory object
        delete savedConstants[name];
        delete scope[name];
        
        // 2. Update browser storage
        localStorage.setItem('userConstants', JSON.stringify(savedConstants));
        
        // 3. Refresh the UI
        updateCustomListUI();
    }
}


// Function to save a new constant
function saveCustomConstant() {
    const nameField = document.getElementById('custom-name');
    const valueField = document.getElementById('custom-value');
    
    const name = nameField.value.trim();
    const value = valueField.value.trim();

    if (name && value && !isNaN(parseFloat(value))) {
        // Save to browser memory
        savedConstants[name] = value;
        localStorage.setItem('userConstants', JSON.stringify(savedConstants));
        
        // Update the live math scope
        scope[name] = parseFloat(value);
        
        // Refresh UI and clear fields
        updateCustomListUI();
        nameField.value = '';
        valueField.value = '';
    } else {
        alert("Please enter a valid symbol and number.");
    }
}

// --- 5. Calculation Engine ---
function calculate() {
    const expression = inputField.value;
    if (!expression) return;

    try {
        // Explicitly replace Ans with its value before evaluating
        let safeExpression = expression.replace(/Ans/g, `(${scope.Ans})`);
        
        let result = math.evaluate(safeExpression, scope);
        scope.Ans = result;
        
        let formattedResult = math.format(result, { precision: 7 });
        resultDisplay.innerText = '= ' + formattedResult;
        resultDisplay.style.color = "var(--border-color)";
        
    } catch (error) {
        console.error(error);
        resultDisplay.innerText = 'Syntax Error';
        resultDisplay.style.color = "#ff7675";
    }
}

// --- 6. Event Listeners ---
inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculate();
    }
});

// Load the custom list when the window opens
window.addEventListener('load', updateCustomListUI);
