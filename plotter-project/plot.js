document.addEventListener("DOMContentLoaded", () => {
    // UI Elements
    const dimSelect = document.getElementById("dimSelect");
    const funcInput = document.getElementById("funcInput");
    const yBounds = document.getElementById("yBounds");
    const zBounds = document.getElementById("zBounds");
    const plotBtn = document.getElementById("plotBtn");
    const errorMsg = document.getElementById("errorMsg");
    const plotContainer = document.getElementById("plotContainer");

    // Dynamic UI Updates based on Dimension
    dimSelect.addEventListener("change", (e) => {
        const dim = e.target.value;
        if (dim === "1") {
            yBounds.style.display = "none";
            zBounds.style.display = "none";
            funcInput.value = "sin(x) * exp(-0.1 * x^2)"; // Wavepacket
        } else if (dim === "2") {
            yBounds.style.display = "block";
            zBounds.style.display = "none";
            funcInput.value = "sin(sqrt(x^2 + y^2))"; // Radial/Skyrmion-like
        } else if (dim === "3") {
            yBounds.style.display = "block";
            zBounds.style.display = "block";
            funcInput.value = "x^2 + y^2 - z^2"; // Hyperboloid
        }
    });

    // Main Plotting Function
    plotBtn.addEventListener("click", () => {
        errorMsg.textContent = ""; // Clear errors
        
        try {
            const dim = dimSelect.value;
            const funcStr = funcInput.value;
            const steps = parseInt(document.getElementById("stepsInput").value);
            
            // Compile mathematical expression using Math.js
            const compiledExpr = math.compile(funcStr);

            // Fetch bounds
            const xMin = parseFloat(document.getElementById("xMin").value);
            const xMax = parseFloat(document.getElementById("xMax").value);
            const yMin = parseFloat(document.getElementById("yMin").value);
            const yMax = parseFloat(document.getElementById("yMax").value);
            const zMin = parseFloat(document.getElementById("zMin").value);
            const zMax = parseFloat(document.getElementById("zMax").value);

            if (dim === "1") {
                plot1D(compiledExpr, xMin, xMax, steps);
            } else if (dim === "2") {
                plot2D(compiledExpr, xMin, xMax, yMin, yMax, steps);
            } else if (dim === "3") {
                plot3D(compiledExpr, xMin, xMax, yMin, yMax, zMin, zMax, steps);
            }
        } catch (err) {
            errorMsg.textContent = "Error in function formulation. Check syntax.";
            console.error(err);
        }
    });

    // Plotting Logic: 1D Line
    function plot1D(expr, xMin, xMax, steps) {
        let xVals = [], yVals = [];
        for (let i = 0; i <= steps; i++) {
            let x = xMin + (xMax - xMin) * (i / steps);
            xVals.push(x);
            yVals.push(expr.evaluate({ x: x }));
        }

        const data = [{
            x: xVals, y: yVals, type: 'scatter', mode: 'lines',
            line: { color: '#0056b3', width: 3 }
        }];

        const layout = { title: '1D Function: f(x)', margin: { t: 40 } };
        Plotly.newPlot(plotContainer, data, layout, { responsive: true });
    }

    // Plotting Logic: 2D Surface
    function plot2D(expr, xMin, xMax, yMin, yMax, steps) {
        let xVals = [], yVals = [], zMatrix = [];
        
        for (let j = 0; j <= steps; j++) {
            let y = yMin + (yMax - yMin) * (j / steps);
            yVals.push(y);
            let row = [];
            for (let i = 0; i <= steps; i++) {
                let x = xMin + (xMax - xMin) * (i / steps);
                if (j === 0) xVals.push(x); // Only populate xVals once
                row.push(expr.evaluate({ x: x, y: y }));
            }
            zMatrix.push(row);
        }

        const data = [{
            x: xVals, y: yVals, z: zMatrix, type: 'surface',
            colorscale: 'Viridis'
        }];

        const layout = { 
            title: '2D Surface: f(x,y)', 
            margin: { l: 0, r: 0, b: 0, t: 40 } 
        };
        Plotly.newPlot(plotContainer, data, layout, { responsive: true });
    }

    // Plotting Logic: 3D Isosurface
    function plot3D(expr, xMin, xMax, yMin, yMax, zMin, zMax, steps) {
        // Warning: steps^3 iterations. Keep steps reasonable (e.g., 30^3 = 27,000 pts)
        let safeSteps = Math.min(steps, 40); // Cap to prevent browser freeze
        let xVals = [], yVals = [], zVals = [], values = [];

        for (let k = 0; k <= safeSteps; k++) {
            let z = zMin + (zMax - zMin) * (k / safeSteps);
            for (let j = 0; j <= safeSteps; j++) {
                let y = yMin + (yMax - yMin) * (j / safeSteps);
                for (let i = 0; i <= safeSteps; i++) {
                    let x = xMin + (xMax - xMin) * (i / safeSteps);
                    xVals.push(x);
                    yVals.push(y);
                    zVals.push(z);
                    values.push(expr.evaluate({ x: x, y: y, z: z }));
                }
            }
        }

        const data = [{
            type: 'isosurface',
            x: xVals, y: yVals, z: zVals, value: values,
            isomin: math.min(values) * 0.5,
            isomax: math.max(values) * 0.5,
            surface: { show: true, count: 4 },
            caps: { x: {show: false}, y: {show: false}, z: {show: false} },
            colorscale: 'Plasma'
        }];

        const layout = { 
            title: '3D Isosurface: f(x,y,z)',
            margin: { l: 0, r: 0, b: 0, t: 40 }
        };
        Plotly.newPlot(plotContainer, data, layout, { responsive: true });
    }

    // Trigger initial plot
    plotBtn.click();
});
