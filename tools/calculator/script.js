// --- 1. Initialize Math.js Scope with your custom constants ---
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
            kb: 1.380648520e-23
        };

        const inputField = document.getElementById('calc-input');
        const resultDisplay = document.getElementById('calc-result');

        // --- 2. Button Input Function ---
        function insert(value) {
            inputField.value += value;
            inputField.focus(); // Keep focus on input for seamless typing
        }

        // --- 3. Clear Function ---
        function clearInput() {
            inputField.value = '';
            resultDisplay.innerText = '= 0';
            resultDisplay.style.color = "var(--border-color)";
        }

        // --- 4. Core Evaluation Function ---
        function calculate() {
            const expression = inputField.value;
            if (!expression) return;

            try {
                // Math.js evaluates the string against our pre-loaded constants scope
                let result = math.evaluate(expression, scope);
                
                // Format nicely (e.g. scientific notation if very small/large)
                result = math.format(result, { precision: 7 });
                
                resultDisplay.innerText = '= ' + result;
                resultDisplay.style.color = "var(--border-color)"; // Reset color if previously errored
            } catch (error) {
                resultDisplay.innerText = 'Syntax Error';
                resultDisplay.style.color = "#ff7675"; // Red color for error
            }
        }

        // --- 5. Listen for "Enter" key on keyboard ---
        inputField.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                calculate();
            }
        });
