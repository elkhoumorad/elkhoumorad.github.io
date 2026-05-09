// --- 1. Initialize Math.js Scope ---
// We add 'Ans' to the scope, initialized to 0.
const scope = {
    c: 299792458,
    Na: 6.02214076e23,
    me: 9.1093837015e-31,
    e: 1.602176634e-19,
    eps0: 8.8541878128e-12,
    h: 1.054571817e-34, 
    kb: 1.380648520e-23,
    Ans: 0 
};

const inputField = document.getElementById('calc-input');
const resultDisplay = document.getElementById('calc-result');

// --- 2. Smart Insert (Handles cursor position) ---
function insert(value) {
    inputField.focus(); // Force focus before grabbing cursor position
    const start = inputField.selectionStart;
    const end = inputField.selectionEnd;
    const text = inputField.value;
    
    // Splice the new value exactly where the cursor is
    inputField.value = text.substring(0, start) + value + text.substring(end);
    
    // Move the cursor forward past the newly inserted text
    inputField.selectionStart = inputField.selectionEnd = start + value.length;
}

// --- 3. Bulletproof Backspace ---
function backspace() {
    inputField.focus(); 
    const start = inputField.selectionStart;
    const end = inputField.selectionEnd;
    const text = inputField.value;

    if (start === end && start > 0) {
        // No text highlighted: delete the 1 character directly behind the cursor
        inputField.value = text.substring(0, start - 1) + text.substring(end);
        inputField.selectionStart = inputField.selectionEnd = start - 1;
    } else if (start !== end) {
        // Text is highlighted: delete the entire highlighted block
        inputField.value = text.substring(0, start) + text.substring(end);
        inputField.selectionStart = inputField.selectionEnd = start;
    }
}

// --- 4. Clear Function ---
function clearInput() {
    inputField.value = '';
    resultDisplay.innerText = '= 0';
    resultDisplay.style.color = "var(--border-color)";
    inputField.focus();
}

// --- 5. Calculation Engine ---
function calculate() {
    const expression = inputField.value;
    if (!expression) return;

    try {
        // Evaluate against our custom constants + Ans
        let result = math.evaluate(expression, scope);
        
        // Save the raw unformatted result into Ans for the next calculation
        scope.Ans = result;
        
        // Format it nicely for the screen
        let formattedResult = math.format(result, { precision: 7 });
        
        resultDisplay.innerText = '= ' + formattedResult;
        resultDisplay.style.color = "var(--border-color)";
        
    } catch (error) {
        resultDisplay.innerText = 'Syntax Error';
        resultDisplay.style.color = "#ff7675";
    }
}

// --- 6. Physical Keyboard Support ---
inputField.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        calculate();
    }
    // The physical Backspace key works natively, so we don't need to intercept it.
});
