// Main application logic

const cipherInfo = {
    'atbash': {
        name: 'AtBash Cipher',
        description: 'A simple substitution cipher where each letter is replaced with its mirror in the alphabet (A↔Z, B↔Y, etc.). No key needed.',
        keyHint: 'No key required'
    },
    'caesar': {
        name: 'Caesar Cipher',
        description: 'A shift cipher where each letter is shifted by a fixed number of positions. Key is the shift amount (0-25).',
        keyHint: 'Enter shift amount (e.g., 3)'
    },
    'aristocrat': {
        name: 'Aristocrat Cipher',
        description: 'A monoalphabetic substitution cipher. Key is a 26-letter alphabet permutation.',
        keyHint: 'Enter 26 unique letters (e.g., ZYXWVUTSRQPONMLKJIHGFEDCBA)'
    },
    'aristocrat-misspelled': {
        name: 'Aristocrat Misspelled',
        description: 'Same as Aristocrat but may contain common typos. Key is a 26-letter alphabet permutation.',
        keyHint: 'Enter 26 unique letters'
    },
    'patristocrat': {
        name: 'Patristocrat Cipher',
        description: 'Similar to Aristocrat, often with word breaks preserved. Key is a 26-letter alphabet permutation.',
        keyHint: 'Enter 26 unique letters'
    },
    'xenocrypt': {
        name: 'Xenocrypt Cipher',
        description: 'A Spanish substitution cipher. Key is a 27-letter alphabet permutation (includes Ñ).',
        keyHint: 'Enter 27 unique letters including Ñ'
    },
    'hill-2x2': {
        name: 'Hill 2x2 Cipher',
        description: 'A matrix-based cipher using a 2x2 matrix. Key format: "a b c d" (4 numbers).',
        keyHint: 'Enter 4 numbers: a b c d (e.g., 2 1 3 4)'
    },
    'hill-3x3': {
        name: 'Hill 3x3 Cipher',
        description: 'A matrix-based cipher using a 3x3 matrix. Key format: "a b c d e f g h i" (9 numbers).',
        keyHint: 'Enter 9 numbers: a b c d e f g h i'
    },
    'affine': {
        name: 'Affine Cipher',
        description: 'A linear cipher: E(x) = (ax + b) mod 26. Key format: "a, b" where gcd(a,26)=1.',
        keyHint: 'Enter two numbers: a, b (e.g., 5, 8)'
    },
    'baconian': {
        name: 'Baconian Cipher',
        description: 'Each letter is encoded as a 5-letter sequence of A and B. No key needed.',
        keyHint: 'No key required'
    },
    'fractionated-morse': {
        name: 'Fractionated Morse Cipher',
        description: 'Text is converted to Morse code, then fractionated and substituted. Key is at least 9 letters.',
        keyHint: 'Enter at least 9 letters'
    },
    'porta': {
        name: 'Porta Cipher',
        description: 'A digraphic cipher using a key and a table. Key is a word or phrase.',
        keyHint: 'Enter a word or phrase'
    },
    'dancing-men': {
        name: 'Dancing Men Cipher',
        description: 'A visual cipher where letters are represented by stick figures. Shown as symbols here.',
        keyHint: 'No key required'
    },
    'rsa': {
        name: 'RSA Cipher',
        description: 'A public-key cipher. Key format: "n, e" for encryption or "n, d" for decryption.',
        keyHint: 'Enter: n, e (for encrypt) or n, d (for decrypt)'
    },
    'running-key': {
        name: 'Running Key Cipher',
        description: 'Similar to Vigenère but uses a long key text. Key is a word or phrase.',
        keyHint: 'Enter a word or phrase'
    },
    'railfence': {
        name: 'Railfence Cipher',
        description: 'A transposition cipher that writes text in a zigzag pattern. Key is the number of rails.',
        keyHint: 'Enter number of rails (e.g., 3)'
    },
    'cryptarithm': {
        name: 'Cryptarithm',
        description: 'An alphametic puzzle where letters represent digits. Key is a letter-to-letter mapping.',
        keyHint: 'Enter letter substitution key'
    },
    'complete-columnar': {
        name: 'Complete Columnar Transposition',
        description: 'A transposition cipher using columns. Key is a word that determines column order.',
        keyHint: 'Enter a word or phrase'
    },
    'pollux': {
        name: 'Pollux Cipher',
        description: 'Morse code converted to numbers: . = 1, - = 2, separator = 0. No key needed.',
        keyHint: 'No key required'
    },
    'morbit': {
        name: 'Morbit Cipher',
        description: 'Morse code pairs mapped to digits. Key is 9 digits representing the 9 possible pairs.',
        keyHint: 'Enter 9 digits (e.g., 123456789)'
    }
};

let currentCipher = 'atbash';
let lastResult = '';

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    const cipherSelect = document.getElementById('cipher-select');
    const keyInput = document.getElementById('key-input');
    const keyHint = document.getElementById('key-hint');
    const modeSelect = document.getElementById('mode-select');
    const textInput = document.getElementById('text-input');
    const processBtn = document.getElementById('process-btn');
    const checkBtn = document.getElementById('check-btn');
    const clearBtn = document.getElementById('clear-btn');
    const resultOutput = document.getElementById('result-output');
    const checkResult = document.getElementById('check-result');
    const answerInput = document.getElementById('answer-input');
    const answerGroup = document.getElementById('answer-group');
    const cipherInfoDiv = document.getElementById('cipher-info');

    // Update cipher info and hints
    function updateCipherInfo() {
        const info = cipherInfo[currentCipher];
        if (info) {
            cipherInfoDiv.innerHTML = `
                <strong>${info.name}</strong><br>
                ${info.description}
            `;
            keyHint.textContent = info.keyHint;
            
            // Show/hide key input based on cipher
            const keyGroup = document.getElementById('key-group');
            if (info.keyHint === 'No key required') {
                keyGroup.style.display = 'none';
            } else {
                keyGroup.style.display = 'block';
            }
        }
    }

    // Cipher selection change
    cipherSelect.addEventListener('change', (e) => {
        currentCipher = e.target.value;
        updateCipherInfo();
        resultOutput.textContent = '';
        checkResult.className = 'check-result';
        checkResult.style.display = 'none';
    });

    // Process button
    processBtn.addEventListener('click', () => {
        const text = textInput.value;
        const key = keyInput.value;
        const mode = modeSelect.value;

        if (!text.trim()) {
            resultOutput.textContent = 'Please enter text to process.';
            return;
        }

        try {
            let result;
            
            // Map cipher names to method names
            const cipherMethodMap = {
                'atbash': 'atbash',
                'caesar': 'caesar',
                'aristocrat': 'aristocrat',
                'aristocrat-misspelled': 'aristocratMisspelled',
                'patristocrat': 'patristocrat',
                'xenocrypt': 'xenocrypt',
                'hill-2x2': 'hill2x2',
                'hill-3x3': 'hill3x3',
                'affine': 'affine',
                'baconian': 'baconian',
                'fractionated-morse': 'fractionatedMorse',
                'porta': 'porta',
                'dancing-men': 'dancingMen',
                'rsa': 'rsa',
                'running-key': 'runningKey',
                'railfence': 'railfence',
                'cryptarithm': 'cryptarithm',
                'complete-columnar': 'completeColumnar',
                'pollux': 'pollux',
                'morbit': 'morbit'
            };
            
            const methodName = cipherMethodMap[currentCipher];
            if (methodName && CipherEngine[methodName]) {
                result = CipherEngine[methodName](text, key, mode);
            } else {
                result = 'Cipher method not found';
            }

            if (result && result.startsWith('Key') && result.includes('must')) {
                resultOutput.textContent = result;
                resultOutput.style.color = '#d32f2f';
            } else {
                lastResult = result;
                resultOutput.textContent = result;
                resultOutput.style.color = '#333';
            }
        } catch (error) {
            resultOutput.textContent = `Error: ${error.message}`;
            resultOutput.style.color = '#d32f2f';
        }
    });

    // Check answer button
    checkBtn.addEventListener('click', () => {
        const expected = answerInput.value.trim().toUpperCase();
        const actual = lastResult.trim().toUpperCase();

        if (!expected) {
            checkResult.textContent = 'Please enter an expected answer.';
            checkResult.className = 'check-result incorrect';
            checkResult.style.display = 'block';
            return;
        }

        if (!actual) {
            checkResult.textContent = 'Please process text first.';
            checkResult.className = 'check-result incorrect';
            checkResult.style.display = 'block';
            return;
        }

        // Compare (case-insensitive, ignoring spaces for some ciphers)
        const expectedClean = expected.replace(/\s+/g, '');
        const actualClean = actual.replace(/\s+/g, '');

        if (expectedClean === actualClean) {
            checkResult.textContent = '✓ Correct!';
            checkResult.className = 'check-result correct';
        } else {
            checkResult.textContent = '✗ Incorrect. Expected: ' + expected + ' | Got: ' + actual;
            checkResult.className = 'check-result incorrect';
        }
        checkResult.style.display = 'block';
    });

    // Clear button
    clearBtn.addEventListener('click', () => {
        textInput.value = '';
        keyInput.value = '';
        answerInput.value = '';
        resultOutput.textContent = '';
        checkResult.className = 'check-result';
        checkResult.style.display = 'none';
        lastResult = '';
    });

    // Show answer input when check button is focused or clicked
    checkBtn.addEventListener('mouseenter', () => {
        answerGroup.style.display = 'block';
    });

    // Initialize
    updateCipherInfo();
});

