const pointGroups = {
    "C2v": {
        h: 4,
        classes: ["E", "C_2", "\\sigma_v(xz)", "\\sigma_v(yz)"],
        g: [1, 1, 1, 1],
        irreps: {
            "A_1": { chars: [1, 1, 1, 1], funcs: ["z", "x^2, y^2, z^2"] },
            "A_2": { chars: [1, 1, -1, -1], funcs: ["R_z", "xy"] },
            "B_1": { chars: [1, -1, 1, -1], funcs: ["x, R_y", "xz"] },
            "B_2": { chars: [1, -1, -1, 1], funcs: ["y, R_x", "yz"] }
        }
    },
    "C3v": {
        h: 6,
        classes: ["E", "2C_3", "3\\sigma_v"],
        g: [1, 2, 3],
        irreps: {
            "A_1": { chars: [1, 1, 1], funcs: ["z", "x^2+y^2, z^2"] },
            "A_2": { chars: [1, 1, -1], funcs: ["R_z", ""] },
            "E":   { chars: [2, -1, 0], funcs: ["(x, y), (R_x, R_y)", "(x^2-y^2, xy), (xz, yz)"] }
        }
    },
    "D3h": {
        h: 12,
        classes: ["E", "2C_3", "3C_2", "\\sigma_h", "2S_3", "3\\sigma_v"],
        g: [1, 2, 3, 1, 2, 3],
        irreps: {
            "A'_1":  { chars: [1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
            "A'_2":  { chars: [1, 1, -1, 1, 1, -1], funcs: ["R_z", ""] },
            "E'":    { chars: [2, -1, 0, 2, -1, 0], funcs: ["(x, y)", "(x^2-y^2, xy)"] },
            "A''_1": { chars: [1, 1, 1, -1, -1, -1], funcs: ["", ""] },
            "A''_2": { chars: [1, 1, -1, -1, -1, 1], funcs: ["z", ""] },
            "E''":   { chars: [2, -1, 0, -2, 1, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] }
        }
    },
    "Td": {
        h: 24,
        classes: ["E", "8C_3", "3C_2", "6S_4", "6\\sigma_d"],
        g: [1, 8, 3, 6, 6],
        irreps: {
            "A_1": { chars: [1, 1, 1, 1, 1], funcs: ["", "x^2+y^2+z^2"] },
            "A_2": { chars: [1, 1, 1, -1, -1], funcs: ["", ""] },
            "E":   { chars: [2, -1, 2, 0, 0], funcs: ["", "(2z^2-x^2-y^2, x^2-y^2)"] },
            "T_1": { chars: [3, 0, -1, 1, -1], funcs: ["(R_x, R_y, R_z)", ""] },
            "T_2": { chars: [3, 0, -1, -1, 1], funcs: ["(x, y, z)", "(xy, xz, yz)"] }
        }
    },
    // Add these into your pointGroups object in script.js
"C1": {
    h: 1,
    classes: ["E"],
    g: [1],
    irreps: {
        "A": { chars: [1], funcs: ["x, y, z, R_x, R_y, R_z", "x^2, y^2, z^2, xy, xz, yz"] }
    }
},
"Cs": {
    h: 2,
    classes: ["E", "\\sigma_h"],
    g: [1, 1],
    irreps: {
        "A'":  { chars: [1, 1], funcs: ["x, y, R_z", "x^2, y^2, z^2, xy"] },
        "A''": { chars: [1, -1], funcs: ["z, R_x, R_y", "yz, xz"] }
    }
},
"Ci": {
    h: 2,
    classes: ["E", "i"],
    g: [1, 1],
    irreps: {
        "A_g": { chars: [1, 1], funcs: ["R_x, R_y, R_z", "x^2, y^2, z^2, xy, xz, yz"] },
        "A_u": { chars: [1, -1], funcs: ["x, y, z", ""] }
    }
},
"C2h": {
    h: 4,
    classes: ["E", "C_2", "i", "\\sigma_h"],
    g: [1, 1, 1, 1],
    irreps: {
        "A_g": { chars: [1, 1, 1, 1], funcs: ["R_z", "x^2, y^2, z^2, xy"] },
        "B_g": { chars: [1, -1, 1, -1], funcs: ["R_x, R_y", "xz, yz"] },
        "A_u": { chars: [1, 1, -1, -1], funcs: ["z", ""] },
        "B_u": { chars: [1, -1, -1, 1], funcs: ["x, y", ""] }
    }
},
"Oh": {
    h: 48,
    classes: ["E", "8C_3", "6C_2", "6C_4", "3C_2(=C_4^2)", "i", "6S_4", "8S_6", "3\\sigma_h", "6\\sigma_d"],
    g: [1, 8, 6, 6, 3, 1, 6, 8, 3, 6],
    irreps: {
        "A_{1g}": { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2+z^2"] },
        "A_{2g}": { chars: [1, 1, -1, -1, 1, 1, -1, 1, 1, -1], funcs: ["", ""] },
        "E_g":    { chars: [2, -1, 0, 0, 2, 2, 0, -1, 2, 0], funcs: ["", "(2z^2-x^2-y^2, x^2-y^2)"] },
        "T_{1g}": { chars: [3, 0, -1, 1, -1, 3, 1, 0, -1, -1], funcs: ["(R_x, R_y, R_z)", ""] },
        "T_{2g}": { chars: [3, 0, 1, -1, -1, 3, -1, 0, -1, 1], funcs: ["", "(xy, xz, yz)"] },
        "A_{1u}": { chars: [1, 1, 1, 1, 1, -1, -1, -1, -1, -1], funcs: ["", ""] },
        "A_{2u}": { chars: [1, 1, -1, -1, 1, -1, 1, -1, -1, 1], funcs: ["", ""] },
        "E_u":    { chars: [2, -1, 0, 0, 2, -2, 0, 1, -2, 0], funcs: ["", ""] },
        "T_{1u}": { chars: [3, 0, -1, 1, -1, -3, -1, 0, 1, 1], funcs: ["(x, y, z)", ""] },
        "T_{2u}": { chars: [3, 0, 1, -1, -1, -3, 1, 0, 1, -1], funcs: ["", ""] }
    }
},
"T": {
    h: 12,
    classes: ["E", "4C_3", "4C_3^2", "3C_2"],
    g: [1, 4, 4, 3],
    irreps: {
        "A": { chars: [1, 1, 1, 1], funcs: ["", "x^2+y^2+z^2"] },
        "E": { chars: [2, -1, -1, 2], funcs: ["", "(2z^2-x^2-y^2, x^2-y^2)"] },
        "T": { chars: [3, 0, 0, -1], funcs: ["(x, y, z), (R_x, R_y, R_z)", "(xy, xz, yz)"] }
    }
},
"Th": {
    h: 24,
    classes: ["E", "4C_3", "4C_3^2", "3C_2", "i", "4S_6", "4S_6^5", "3\\sigma_h"],
    g: [1, 4, 4, 3, 1, 4, 4, 3],
    irreps: {
        "A_g": { chars: [1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2+z^2"] },
        "E_g": { chars: [2, -1, -1, 2, 2, -1, -1, 2], funcs: ["", "(2z^2-x^2-y^2, x^2-y^2)"] },
        "T_g": { chars: [3, 0, 0, -1, 3, 0, 0, -1], funcs: ["(R_x, R_y, R_z)", "(xy, xz, yz)"] },
        "A_u": { chars: [1, 1, 1, 1, -1, -1, -1, -1], funcs: ["", ""] },
        "E_u": { chars: [2, -1, -1, 2, -2, 1, 1, -2], funcs: ["", ""] },
        "T_u": { chars: [3, 0, 0, -1, -3, 0, 0, 1], funcs: ["(x, y, z)", ""] }
    }
},
"O": {
    h: 24,
    classes: ["E", "8C_3", "3C_2", "6C_4", "6C_2'"],
    g: [1, 8, 3, 6, 6],
    irreps: {
        "A_1": { chars: [1, 1, 1, 1, 1], funcs: ["", "x^2+y^2+z^2"] },
        "A_2": { chars: [1, 1, 1, -1, -1], funcs: ["", ""] },
        "E":   { chars: [2, -1, 2, 0, 0], funcs: ["", "(2z^2-x^2-y^2, x^2-y^2)"] },
        "T_1": { chars: [3, 0, -1, 1, -1], funcs: ["(x, y, z), (R_x, R_y, R_z)", ""] },
        "T_2": { chars: [3, 0, -1, -1, 1], funcs: ["", "(xy, xz, yz)"] }
    }
},
"I": {
    h: 60,
    classes: ["E", "12C_5", "12C_5^2", "20C_3", "15C_2"],
    g: [1, 12, 12, 20, 15],
    irreps: {
        "A":   { chars: [1, 1, 1, 1, 1], funcs: ["", "x^2+y^2+z^2"] },
        "T_1": { chars: [3, 1.618, -0.618, 0, -1], funcs: ["(x, y, z), (R_x, R_y, R_z)", ""] },
        "T_2": { chars: [3, -0.618, 1.618, 0, -1], funcs: ["", ""] },
        "G":   { chars: [4, -1, -1, 1, 0], funcs: ["", ""] },
        "H":   { chars: [5, 0, 0, -1, 1], funcs: ["", "(2z^2-x^2-y^2, x^2-y^2, xy, xz, yz)"] }
    }
},
"Ih": {
    h: 120,
    classes: ["E", "12C_5", "12C_5^2", "20C_3", "15C_2", "i", "12S_{10}", "12S_{10}^3", "20S_6", "15\\sigma_d"],
    g: [1, 12, 12, 20, 15, 1, 12, 12, 20, 15],
    irreps: {
        "A_g":   { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2+z^2"] },
        "T_{1g}": { chars: [3, 1.618, -0.618, 0, -1, 3, 1.618, -0.618, 0, -1], funcs: ["(R_x, R_y, R_z)", ""] },
        "T_{2g}": { chars: [3, -0.618, 1.618, 0, -1, 3, -0.618, 1.618, 0, -1], funcs: ["", ""] },
        "G_g":   { chars: [4, -1, -1, 1, 0, 4, -1, -1, 1, 0], funcs: ["", ""] },
        "H_g":   { chars: [5, 0, 0, -1, 1, 5, 0, 0, -1, 1], funcs: ["", "(2z^2-x^2-y^2, x^2-y^2, xy, xz, yz)"] },
        "A_u":   { chars: [1, 1, 1, 1, 1, -1, -1, -1, -1, -1], funcs: ["", ""] },
        "T_{1u}": { chars: [3, 1.618, -0.618, 0, -1, -3, -1.618, 0.618, 0, 1], funcs: ["(x, y, z)", ""] },
        "T_{2u}": { chars: [3, -0.618, 1.618, 0, -1, -3, 0.618, -1.618, 0, 1], funcs: ["", ""] },
        "G_u":   { chars: [4, -1, -1, 1, 0, -4, 1, 1, -1, 0], funcs: ["", ""] },
        "H_u":   { chars: [5, 0, 0, -1, 1, -5, 0, 0, 1, -1], funcs: ["", ""] }
    }
},
"D2h": {
    h: 8,
    classes: ["E", "C_2(z)", "C_2(y)", "C_2(x)", "i", "\\sigma(xy)", "\\sigma(xz)", "\\sigma(yz)"],
    g: [1, 1, 1, 1, 1, 1, 1, 1],
    irreps: {
        "A_g": { chars: [1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2, y^2, z^2"] },
        "B_{1g}": { chars: [1, 1, -1, -1, 1, 1, -1, -1], funcs: ["R_z", "xy"] },
        "B_{2g}": { chars: [1, -1, 1, -1, 1, -1, 1, -1], funcs: ["R_y", "xz"] },
        "B_{3g}": { chars: [1, -1, -1, 1, 1, -1, -1, 1], funcs: ["R_x", "yz"] },
        "A_u": { chars: [1, 1, 1, 1, -1, -1, -1, -1], funcs: ["", ""] },
        "B_{1u}": { chars: [1, 1, -1, -1, -1, -1, 1, 1], funcs: ["z", ""] },
        "B_{2u}": { chars: [1, -1, 1, -1, -1, 1, -1, 1], funcs: ["y", ""] },
        "B_{3u}": { chars: [1, -1, -1, 1, -1, 1, 1, -1], funcs: ["x", ""] }
    }
},
"D4h": {
    h: 16,
    classes: ["E", "2C_4", "C_2", "2C_2'", "2C_2''", "i", "2S_4", "\\sigma_h", "2\\sigma_v", "2\\sigma_d"],
    g: [1, 2, 1, 2, 2, 1, 2, 1, 2, 2],
    irreps: {
        "A_{1g}": { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_{2g}": { chars: [1, 1, 1, -1, -1, 1, 1, 1, -1, -1], funcs: ["R_z", ""] },
        "B_{1g}": { chars: [1, -1, 1, 1, -1, 1, -1, 1, 1, -1], funcs: ["", "x^2-y^2"] },
        "B_{2g}": { chars: [1, -1, 1, -1, 1, 1, -1, 1, -1, 1], funcs: ["", "xy"] },
        "E_g": { chars: [2, 0, -2, 0, 0, 2, 0, -2, 0, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] },
        "A_{1u}": { chars: [1, 1, 1, 1, 1, -1, -1, -1, -1, -1], funcs: ["", ""] },
        "A_{2u}": { chars: [1, 1, 1, -1, -1, -1, -1, -1, 1, 1], funcs: ["z", ""] },
        "B_{1u}": { chars: [1, -1, 1, 1, -1, -1, 1, -1, -1, 1], funcs: ["", ""] },
        "B_{2u}": { chars: [1, -1, 1, -1, 1, -1, 1, -1, 1, -1], funcs: ["", ""] },
        "E_u": { chars: [2, 0, -2, 0, 0, -2, 0, 2, 0, 0], funcs: ["(x, y)", ""] }
    }
},
"D5h": {
    h: 20,
    classes: ["E", "2C_5", "2C_5^2", "5C_2", "i", "2S_{10}", "2S_{10}^3", "\\sigma_h", "5\\sigma_v"],
    g: [1, 2, 2, 5, 1, 2, 2, 1, 5],
    irreps: {
        "A_{1}'": { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_{2}'": { chars: [1, 1, 1, -1, 1, 1, 1, 1, -1], funcs: ["R_z", ""] },
        "E_{1}'": { chars: [2, 0.618, -1.618, 0, 2, 0.618, -1.618, 2, 0], funcs: ["(x, y)", ""] },
        "E_{2}'": { chars: [2, -1.618, 0.618, 0, 2, -1.618, 0.618, 2, 0], funcs: ["", "(x^2-y^2, xy)"] },
        "A_{1}''": { chars: [1, 1, 1, 1, -1, -1, -1, -1, -1], funcs: ["", ""] },
        "A_{2}''": { chars: [1, 1, 1, -1, -1, -1, -1, -1, 1], funcs: ["z", ""] },
        "E_{1}''": { chars: [2, 0.618, -1.618, 0, -2, -0.618, 1.618, -2, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] },
        "E_{2}''": { chars: [2, -1.618, 0.618, 0, -2, 1.618, -0.618, -2, 0], funcs: ["", ""] }
    }
},
"D6h": {
    h: 24,
    classes: ["E", "2C_6", "2C_3", "C_2", "3C_2'", "3C_2''", "i", "2S_3", "2S_6", "\\sigma_h", "3\\sigma_v", "3\\sigma_d"],
    g: [1, 2, 2, 1, 3, 3, 1, 2, 2, 1, 3, 3],
    irreps: {
        "A_{1g}": { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_{2g}": { chars: [1, 1, 1, 1, -1, -1, 1, 1, 1, 1, -1, -1], funcs: ["R_z", ""] },
        "B_{1g}": { chars: [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1], funcs: ["", ""] },
        "B_{2g}": { chars: [1, -1, 1, -1, -1, 1, 1, -1, 1, -1, -1, 1], funcs: ["", ""] },
        "E_{1g}": { chars: [2, 1, -1, -2, 0, 0, 2, 1, -1, -2, 0, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] },
        "E_{2g}": { chars: [2, -1, -1, 2, 0, 0, 2, -1, -1, 2, 0, 0], funcs: ["", "(x^2-y^2, xy)"] },
        "A_{1u}": { chars: [1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1], funcs: ["", ""] },
        "A_{2u}": { chars: [1, 1, 1, 1, -1, -1, -1, -1, -1, -1, 1, 1], funcs: ["z", ""] },
        "B_{1u}": { chars: [1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1, 1], funcs: ["", ""] },
        "B_{2u}": { chars: [1, -1, 1, -1, -1, 1, -1, 1, -1, 1, 1, -1], funcs: ["", ""] },
        "E_{1u}": { chars: [2, 1, -1, -2, 0, 0, -2, -1, 1, 2, 0, 0], funcs: ["(x, y)", ""] },
        "E_{2u}": { chars: [2, -1, -1, 2, 0, 0, -2, 1, 1, -2, 0, 0], funcs: ["", ""] }
    }
},
"C4v": {
    h: 8,
    classes: ["E", "2C_4", "C_2", "2\\sigma_v", "2\\sigma_d"],
    g: [1, 2, 1, 2, 2],
    irreps: {
        "A_1": { chars: [1, 1, 1, 1, 1], funcs: ["z", "x^2+y^2, z^2"] },
        "A_2": { chars: [1, 1, 1, -1, -1], funcs: ["R_z", ""] },
        "B_1": { chars: [1, -1, 1, 1, -1], funcs: ["", "x^2-y^2"] },
        "B_2": { chars: [1, -1, 1, -1, 1], funcs: ["", "xy"] },
        "E":   { chars: [2, 0, -2, 0, 0], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] }
    }
},
"C5v": {
    h: 10,
    classes: ["E", "2C_5", "2C_5^2", "5\\sigma_v"],
    g: [1, 2, 2, 5],
    irreps: {
        "A_1": { chars: [1, 1, 1, 1], funcs: ["z", "x^2+y^2, z^2"] },
        "A_2": { chars: [1, 1, 1, -1], funcs: ["R_z", ""] },
        "E_1": { chars: [2, 0.618, -1.618, 0], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] },
        "E_2": { chars: [2, -1.618, 0.618, 0], funcs: ["", "(x^2-y^2, xy)"] }
    }
},
"C6v": {
    h: 12,
    classes: ["E", "2C_6", "2C_3", "C_2", "3\\sigma_v", "3\\sigma_d"],
    g: [1, 2, 2, 1, 3, 3],
    irreps: {
        "A_1": { chars: [1, 1, 1, 1, 1, 1], funcs: ["z", "x^2+y^2, z^2"] },
        "A_2": { chars: [1, 1, 1, 1, -1, -1], funcs: ["R_z", ""] },
        "B_1": { chars: [1, -1, 1, -1, 1, -1], funcs: ["", ""] },
        "B_2": { chars: [1, -1, 1, -1, -1, 1], funcs: ["", ""] },
        "E_1": { chars: [2, 1, -1, -2, 0, 0], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] },
        "E_2": { chars: [2, -1, -1, 2, 0, 0], funcs: ["", "(x^2-y^2, xy)"] }
    }
},
"C2": {
    h: 2,
    classes: ["E", "C_2"],
    g: [1, 1],
    irreps: {
        "A": { chars: [1, 1], funcs: ["z, R_z", "x^2, y^2, z^2, xy"] },
        "B": { chars: [1, -1], funcs: ["x, y, R_x, R_y", "xz, yz"] }
    }
},
"C3": {
    h: 3,
    classes: ["E", "C_3", "C_3^2"],
    g: [1, 1, 1],
    irreps: {
        "A": { chars: [1, 1, 1], funcs: ["z, R_z", "x^2+y^2, z^2"] },
        "E": { chars: [2, -1, -1], funcs: ["(x, y), (R_x, R_y)", "(x^2-y^2, xy), (xz, yz)"] }
    }
},
"C4": {
    h: 4,
    classes: ["E", "C_4", "C_2", "C_4^3"],
    g: [1, 1, 1, 1],
    irreps: {
        "A": { chars: [1, 1, 1, 1], funcs: ["z, R_z", "x^2+y^2, z^2"] },
        "B": { chars: [1, -1, 1, -1], funcs: ["", "x^2-y^2, xy"] },
        "E": { chars: [2, 0, -2, 0], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] }
    }
},
"C5": {
    h: 5,
    classes: ["E", "C_5", "C_5^2", "C_5^3", "C_5^4"],
    g: [1, 1, 1, 1, 1],
    irreps: {
        "A":   { chars: [1, 1, 1, 1, 1], funcs: ["z, R_z", "x^2+y^2, z^2"] },
        "E_1": { chars: [2, 0.618, -1.618, -1.618, 0.618], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] },
        "E_2": { chars: [2, -1.618, 0.618, 0.618, -1.618], funcs: ["", "(x^2-y^2, xy)"] }
    }
},
"C6": {
    h: 6,
    classes: ["E", "C_6", "C_3", "C_2", "C_3^2", "C_6^5"],
    g: [1, 1, 1, 1, 1, 1],
    irreps: {
        "A": { chars: [1, 1, 1, 1, 1, 1], funcs: ["z, R_z", "x^2+y^2, z^2"] },
        "B": { chars: [1, -1, 1, -1, 1, -1], funcs: ["", ""] },
        "E_1": { chars: [2, 1, -1, -2, -1, 1], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] },
        "E_2": { chars: [2, -1, -1, 2, -1, -1], funcs: ["", "(x^2-y^2, xy)"] }
    }
},
"C2h": {
    h: 4,
    classes: ["E", "C_2", "i", "\\sigma_h"],
    g: [1, 1, 1, 1],
    irreps: {
        "A_g": { chars: [1, 1, 1, 1], funcs: ["R_z", "x^2, y^2, z^2, xy"] },
        "B_g": { chars: [1, -1, 1, -1], funcs: ["R_x, R_y", "xz, yz"] },
        "A_u": { chars: [1, 1, -1, -1], funcs: ["z", ""] },
        "B_u": { chars: [1, -1, -1, 1], funcs: ["x, y", ""] }
    }
},
"C3h": {
    h: 6,
    classes: ["E", "C_3", "C_3^2", "\\sigma_h", "S_3", "S_3^5"],
    g: [1, 1, 1, 1, 1, 1],
    irreps: {
        "A'": { chars: [1, 1, 1, 1, 1, 1], funcs: ["R_z", "x^2+y^2, z^2"] },
        "E'": { chars: [2, -1, -1, 2, -1, -1], funcs: ["(x, y)", "(x^2-y^2, xy)"] },
        "A''": { chars: [1, 1, 1, -1, -1, -1], funcs: ["z", ""] },
        "E''": { chars: [2, -1, -1, -2, 1, 1], funcs: ["(R_x, R_y)", "(xz, yz)"] }
    }
},
"C4h": {
    h: 8,
    classes: ["E", "C_4", "C_2", "C_4^3", "i", "S_4^3", "\\sigma_h", "S_4"],
    g: [1, 1, 1, 1, 1, 1, 1, 1],
    irreps: {
        "A_g": { chars: [1, 1, 1, 1, 1, 1, 1, 1], funcs: ["R_z", "x^2+y^2, z^2"] },
        "B_g": { chars: [1, -1, 1, -1, 1, -1, 1, -1], funcs: ["", "x^2-y^2, xy"] },
        "E_g": { chars: [2, 0, -2, 0, 2, 0, -2, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] },
        "A_u": { chars: [1, 1, 1, 1, -1, -1, -1, -1], funcs: ["z", ""] },
        "B_u": { chars: [1, -1, 1, -1, -1, 1, -1, 1], funcs: ["", ""] },
        "E_u": { chars: [2, 0, -2, 0, -2, 0, 2, 0], funcs: ["(x, y)", ""] }
    }
},
"C5h": {
    h: 10,
    classes: ["E", "C_5", "C_5^2", "C_5^3", "C_5^4", "\\sigma_h", "S_5", "S_5^7", "S_5^3", "S_5^9"],
    g: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    irreps: {
        "A'":   { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["R_z", "x^2+y^2, z^2"] },
        "E_1'": { chars: [2, 0.618, -1.618, -1.618, 0.618, 2, 0.618, -1.618, -1.618, 0.618], funcs: ["(x, y)", ""] },
        "E_2'": { chars: [2, -1.618, 0.618, 0.618, -1.618, 2, -1.618, 0.618, 0.618, -1.618], funcs: ["", "(x^2-y^2, xy)"] },
        "A''":  { chars: [1, 1, 1, 1, 1, -1, -1, -1, -1, -1], funcs: ["z", ""] },
        "E_1''": { chars: [2, 0.618, -1.618, -1.618, 0.618, -2, -0.618, 1.618, 1.618, -0.618], funcs: ["(R_x, R_y)", "(xz, yz)"] },
        "E_2''": { chars: [2, -1.618, 0.618, 0.618, -1.618, -2, 1.618, -0.618, -0.618, 1.618], funcs: ["", ""] }
    }
},
"C6h": {
    h: 12,
    classes: ["E", "C_6", "C_3", "C_2", "C_3^2", "C_6^5", "i", "S_3^5", "S_6^5", "\\sigma_h", "S_6", "S_3"],
    g: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    irreps: {
        "A_g": { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["R_z", "x^2+y^2, z^2"] },
        "B_g": { chars: [1, -1, 1, -1, 1, -1, 1, -1, 1, -1, 1, -1], funcs: ["", ""] },
        "E_{1g}": { chars: [2, 1, -1, -2, -1, 1, 2, 1, -1, -2, -1, 1], funcs: ["(R_x, R_y)", "(xz, yz)"] },
        "E_{2g}": { chars: [2, -1, -1, 2, -1, -1, 2, -1, -1, 2, -1, -1], funcs: ["", "(x^2-y^2, xy)"] },
        "A_u": { chars: [1, 1, 1, 1, 1, 1, -1, -1, -1, -1, -1, -1], funcs: ["z", ""] },
        "B_u": { chars: [1, -1, 1, -1, 1, -1, -1, 1, -1, 1, -1, 1], funcs: ["", ""] },
        "E_{1u}": { chars: [2, 1, -1, -2, -1, 1, -2, -1, 1, 2, 1, -1], funcs: ["(x, y)", ""] },
        "E_{2u}": { chars: [2, -1, -1, 2, -1, -1, -2, 1, 1, -2, 1, 1], funcs: ["", ""] }
    }
},
"D2d": {
    h: 8,
    classes: ["E", "2S_4", "C_2", "2C_2'", "2\\sigma_d"],
    g: [1, 2, 1, 2, 2],
    irreps: {
        "A_1": { chars: [1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_2": { chars: [1, 1, 1, -1, -1], funcs: ["R_z", ""] },
        "B_1": { chars: [1, -1, 1, 1, -1], funcs: ["", "x^2-y^2"] },
        "B_2": { chars: [1, -1, 1, -1, 1], funcs: ["z", "xy"] },
        "E":   { chars: [2, 0, -2, 0, 0], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] }
    }
},
"D3d": {
    h: 12,
    classes: ["E", "2C_3", "3C_2", "i", "2S_6", "3\\sigma_d"],
    g: [1, 2, 3, 1, 2, 3],
    irreps: {
        "A_{1g}": { chars: [1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_{2g}": { chars: [1, 1, -1, 1, 1, -1], funcs: ["R_z", ""] },
        "E_g":    { chars: [2, -1, 0, 2, -1, 0], funcs: ["(R_x, R_y)", "(x^2-y^2, xy), (xz, yz)"] },
        "A_{1u}": { chars: [1, 1, 1, -1, -1, -1], funcs: ["", ""] },
        "A_{2u}": { chars: [1, 1, -1, -1, -1, 1], funcs: ["z", ""] },
        "E_u":    { chars: [2, -1, 0, -2, 1, 0], funcs: ["(x, y)", ""] }
    }
},
"D4d": {
    h: 16,
    classes: ["E", "2S_8", "2C_4", "2S_8^3", "C_2", "4C_2'", "4\\sigma_d"],
    g: [1, 2, 2, 2, 1, 4, 4],
    irreps: {
        "A_1": { chars: [1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_2": { chars: [1, 1, 1, 1, 1, -1, -1], funcs: ["R_z", ""] },
        "B_1": { chars: [1, -1, 1, -1, 1, 1, -1], funcs: ["", ""] },
        "B_2": { chars: [1, -1, 1, -1, 1, -1, 1], funcs: ["z", ""] },
        "E_1": { chars: [2, 1.414, 0, -1.414, -2, 0, 0], funcs: ["(x, y)", ""] },
        "E_2": { chars: [2, 0, -2, 0, 2, 0, 0], funcs: ["", "(x^2-y^2, xy)"] },
        "E_3": { chars: [2, -1.414, 0, 1.414, -2, 0, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] }
    }
},
"D5d": {
    h: 20,
    classes: ["E", "2C_5", "2C_5^2", "5C_2", "i", "2S_{10}^3", "2S_{10}", "5\\sigma_d"],
    g: [1, 2, 2, 5, 1, 2, 2, 5],
    irreps: {
        "A_{1g}": { chars: [1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_{2g}": { chars: [1, 1, 1, -1, 1, 1, 1, -1], funcs: ["R_z", ""] },
        "E_{1g}": { chars: [2, 0.618, -1.618, 0, 2, 0.618, -1.618, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] },
        "E_{2g}": { chars: [2, -1.618, 0.618, 0, 2, -1.618, 0.618, 0], funcs: ["", "(x^2-y^2, xy)"] },
        "A_{1u}": { chars: [1, 1, 1, 1, -1, -1, -1, -1], funcs: ["", ""] },
        "A_{2u}": { chars: [1, 1, 1, -1, -1, -1, -1, 1], funcs: ["z", ""] },
        "E_{1u}": { chars: [2, 0.618, -1.618, 0, -2, -0.618, 1.618, 0], funcs: ["(x, y)", ""] },
        "E_{2u}": { chars: [2, -1.618, 0.618, 0, -2, 1.618, -0.618, 0], funcs: ["", ""] }
    }
},
"D6d": {
    h: 24,
    classes: ["E", "2S_{12}", "2C_6", "2S_4", "2C_3", "2S_{12}^5", "C_2", "6C_2'", "6\\sigma_d"],
    g: [1, 2, 2, 2, 2, 2, 1, 6, 6],
    irreps: {
        "A_1": { chars: [1, 1, 1, 1, 1, 1, 1, 1, 1], funcs: ["", "x^2+y^2, z^2"] },
        "A_2": { chars: [1, 1, 1, 1, 1, 1, 1, -1, -1], funcs: ["R_z", ""] },
        "B_1": { chars: [1, -1, 1, -1, 1, -1, 1, 1, -1], funcs: ["", ""] },
        "B_2": { chars: [1, -1, 1, -1, 1, -1, 1, -1, 1], funcs: ["z", ""] },
        "E_1": { chars: [2, 1.732, 1, 0, -1, -1.732, -2, 0, 0], funcs: ["(x, y)", ""] },
        "E_2": { chars: [2, 1, -1, -2, -1, 1, 2, 0, 0], funcs: ["", "(x^2-y^2, xy)"] },
        "E_3": { chars: [2, 0, -2, 0, 2, 0, -2, 0, 0], funcs: ["", ""] },
        "E_4": { chars: [2, -1, -1, 2, -1, -1, 2, 0, 0], funcs: ["", ""] },
        "E_5": { chars: [2, -1.732, 1, 0, -1, 1.732, -2, 0, 0], funcs: ["(R_x, R_y)", "(xz, yz)"] }
    }
},
"S4": {
    h: 4,
    classes: ["E", "S_4", "C_2", "S_4^3"],
    g: [1, 1, 1, 1],
    irreps: {
        "A": { chars: [1, 1, 1, 1], funcs: ["R_z", "x^2+y^2, z^2"] },
        "B": { chars: [1, -1, 1, -1], funcs: ["z", "x^2-y^2, xy"] },
        "E": { chars: [2, 0, -2, 0], funcs: ["(x, y), (R_x, R_y)", "(xz, yz)"] }
    }
},
"S6": {
    h: 6,
    classes: ["E", "C_3", "C_3^2", "i", "S_6^5", "S_6"],
    g: [1, 1, 1, 1, 1, 1],
    irreps: {
        "A_g": { chars: [1, 1, 1, 1, 1, 1], funcs: ["R_z", "x^2+y^2, z^2"] },
        "E_g": { chars: [2, -1, -1, 2, -1, -1], funcs: ["(R_x, R_y)", "(x^2-y^2, xy), (xz, yz)"] },
        "A_u": { chars: [1, 1, 1, -1, -1, -1], funcs: ["z", ""] },
        "E_u": { chars: [2, -1, -1, -2, 1, 1], funcs: ["(x, y)", ""] }
    }
},
"S8": {
    h: 8,
    classes: ["E", "S_8", "C_4", "S_8^3", "C_2", "S_8^5", "C_4^3", "S_8^7"],
    g: [1, 1, 1, 1, 1, 1, 1, 1],
    irreps: {
        "A":   { chars: [1, 1, 1, 1, 1, 1, 1, 1], funcs: ["R_z", "x^2+y^2, z^2"] },
        "B":   { chars: [1, -1, 1, -1, 1, -1, 1, -1], funcs: ["z", ""] },
        "E_1": { chars: [2, 1.414, 0, -1.414, -2, -1.414, 0, 1.414], funcs: ["(x, y), (R_x, R_y)", ""] },
        "E_2": { chars: [2, 0, -2, 0, 2, 0, -2, 0], funcs: ["", "(x^2-y^2, xy)"] },
        "E_3": { chars: [2, -1.414, 0, 1.414, -2, 1.414, 0, -1.414], funcs: ["", "(xz, yz)"] }
    }
}
};

function updateUI() {
    displayTable();
    createInputCases();
}

function displayTable() {
    const groupName = document.getElementById('group-select').value;
    const group = pointGroups[groupName];
    const container = document.getElementById('table-container');

    const groupMath = katex.renderToString(groupName, {throwOnError: false});
    let html = `<table><thead><tr><th>${groupMath}</th>`;
    
    // Header row
    group.classes.forEach(cls => {
        const clsMath = katex.renderToString(cls, {throwOnError: false});
        html += `<th>${clsMath}</th>`;
    });
    
    // Add headers for the basis functions
    html += `<th>Linear, Rotations</th><th>Quadratic</th></tr></thead><tbody>`;

    // Irrep rows
    for (let irrep in group.irreps) {
        const irrepMath = katex.renderToString(irrep, {throwOnError: false});
        html += `<tr><td><strong>${irrepMath}</strong></td>`;
        
        // 1. Draw the characters
        group.irreps[irrep].chars.forEach(char => {
            html += `<td>${char}</td>`;
        });
        
        // 2. Draw the basis functions (using KaTeX if they exist)
        group.irreps[irrep].funcs.forEach(func => {
            if (func === "") {
                html += `<td></td>`;
            } else {
                const funcMath = katex.renderToString(func, {throwOnError: false});
                html += `<td>${funcMath}</td>`;
            }
        });
        
        html += `</tr>`;
    }
    
    html += `</tbody></table>`;
    container.innerHTML = html;
}

function createInputCases() {
    const groupName = document.getElementById('group-select').value;
    const group = pointGroups[groupName];
    const container = document.getElementById('dynamic-inputs');
    
    container.innerHTML = ""; 
    
    group.classes.forEach((cls, index) => {
        const div = document.createElement('div');
        div.className = 'char-case';
        const clsMath = katex.renderToString(cls, {throwOnError: false});
        
        div.innerHTML = `
            <label>${clsMath}</label>
            <input type="number" class="gamma-input" data-index="${index}" value="0">
        `;
        container.appendChild(div);
    });
}

function runCalculation() {
    const groupName = document.getElementById('group-select').value;
    const group = pointGroups[groupName];
    const inputs = document.querySelectorAll('.gamma-input');
    const chi_gamma = Array.from(inputs).map(input => parseFloat(input.value) || 0);

    let finalResult = [];

    for (let irrepName in group.irreps) {
        // IMPORTANT: Point to the .chars array now!
        let chi_irrep = group.irreps[irrepName].chars;
        let a_i = 0;

        for (let i = 0; i < group.g.length; i++) {
            a_i += group.g[i] * chi_gamma[i] * chi_irrep[i];
        }
        
        a_i = a_i / group.h;

        if (a_i > 0) {
            if (!Number.isInteger(a_i)) {
                document.getElementById('output').innerText = "Error: Non-integer result.";
                return;
            }
            let label = a_i === 1 ? irrepName : a_i + irrepName;
            finalResult.push(label);
        }
    }

    const outputElement = document.getElementById('output');
    if (finalResult.length > 0) {
        const resultString = finalResult.join(" + ");
        outputElement.innerHTML = katex.renderToString(resultString, {throwOnError: false});
    } else {
        outputElement.innerText = "0";
    }
}

function resetCalculator() {
    // 1. Find all input boxes in the dynamic-inputs container and set them to 0
    const inputs = document.querySelectorAll('#dynamic-inputs input');
    inputs.forEach(input => input.value = 0);

    // 2. Clear the result display area
    const resultDiv = document.getElementById('output');
    if (resultDiv) {
        resultDiv.innerHTML = '';
        resultDiv.style.display = 'none'; // Optional: hide the blue box until next calculation
    }
}
