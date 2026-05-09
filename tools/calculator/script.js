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
