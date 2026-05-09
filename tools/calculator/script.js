// --- 1. Initialize memory from the browser FIRST ---
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
// We check if the saved item is an object (new format with desc) or a number (old format)
for (let key in savedConstants) {
    let item = savedConstants[key];
    scope[key] = typeof item === 'object' ? item.value : parseFloat(item);
}

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

function updateCustomListUI() {
    const listElement = document.getElementById('user-constant-list');
    if (!listElement) return;

    listElement.innerHTML = '';

    for (let name in savedConstants) {
        const item = savedConstants[name];
        
        // Handle backwards compatibility 
        const val = typeof item === 'object' ? item.value : item;
        const descText = (typeof item === 'object' && item.desc) ? `(${item.desc})` : '';

        const li = document.createElement('li');
        
        // Ensure the list item itself acts as a proper flex container
        li.style.display = "flex";
        li.style.justifyContent = "space-between";
        li.style.alignItems = "center";
        li.style.padding = "8px 0";
        li.style.borderBottom = "1px solid #f0f0f0";
        
        // Inject inline styles to completely bypass any browser CSS caching issues
        li.innerHTML = `
            <div onclick="insert('${name}')" style="display: flex; justify-content: space-between; flex-grow: 1; align-items: center; cursor: pointer; padding-right: 15px; font-family: 'Courier New', Courier, monospace;">
                <span style="display: flex; align-items: baseline; gap: 8px;">
                    <span style="font-weight: bold; color: var(--border-color, #2c3e50);">${name}</span>
                    <span style="color: #7f8c8d; font-size: 0.85em; font-family: 'Segoe UI', Tahoma, sans-serif;">${descText}</span>
                </span>
                <span style="color: #7f8c8d;">${val}</span>
            </div>
            <button onclick="deleteConstant('${name}')" title="Delete" style="background: none; border: none; color: #ff7675; font-size: 1.2rem; font-weight: bold; cursor: pointer; padding: 0 5px; line-height: 1;">×</button>
        `;
        
        listElement.appendChild(li);
    }
}


function saveCustomConstant() {
    const nameField = document.getElementById('custom-name');
    const descField = document.getElementById('custom-desc');
    const valueField = document.getElementById('custom-value');
    
    const name = nameField.value.trim();
    const desc = descField.value.trim();
    const value = valueField.value.trim();

    if (name && value && !isNaN(parseFloat(value))) {
        const numericValue = parseFloat(value);
        
        // Save to browser memory as an object containing both value and description
        savedConstants[name] = { value: numericValue, desc: desc };
        localStorage.setItem('userConstants', JSON.stringify(savedConstants));
        
        // Update the live math scope
        scope[name] = numericValue;
        
        // Refresh UI and clear fields
        updateCustomListUI();
        nameField.value = '';
        descField.value = '';
        valueField.value = '';
    } else {
        alert("Please enter a valid symbol and number.");
    }
}

function deleteConstant(name) {
    if (confirm(`Remove "${name}" from your lab constants?`)) {
        delete savedConstants[name];
        delete scope[name];
        localStorage.setItem('userConstants', JSON.stringify(savedConstants));
        updateCustomListUI();
    }
}

// --- 5. Calculation Engine ---
function calculate() {
    const expression = inputField.value;
    if (!expression) return;

    try {
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

window.addEventListener('load', updateCustomListUI);
