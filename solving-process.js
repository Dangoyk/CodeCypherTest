// Solving Process Explanations

class SolvingProcess {
    static generateProcess(cipherType, question, key, plaintext, ciphertext, mode) {
        switch (cipherType) {
            case 'atbash':
                return this.atbashProcess(plaintext, ciphertext, mode);
            case 'caesar':
                return this.caesarProcess(key, plaintext, ciphertext, mode);
            case 'aristocrat':
            case 'aristocrat-misspelled':
            case 'patristocrat':
                return this.substitutionProcess(key, plaintext, ciphertext, mode);
            case 'xenocrypt':
                return this.xenocryptProcess(key, plaintext, ciphertext, mode);
            case 'hill-2x2':
                return this.hill2x2Process(key, plaintext, ciphertext, mode);
            case 'hill-3x3':
                return this.hill3x3Process(key, plaintext, ciphertext, mode);
            case 'affine':
                return this.affineProcess(key, plaintext, ciphertext, mode);
            case 'baconian':
                return this.baconianProcess(plaintext, ciphertext, mode);
            case 'fractionated-morse':
                return this.fractionatedMorseProcess(key, plaintext, ciphertext, mode);
            case 'porta':
                return this.portaProcess(key, plaintext, ciphertext, mode);
            case 'dancing-men':
                return this.dancingMenProcess(plaintext, ciphertext, mode);
            case 'rsa':
                return this.rsaProcess(key, plaintext, ciphertext, mode);
            case 'running-key':
                return this.runningKeyProcess(key, plaintext, ciphertext, mode);
            case 'railfence':
                return this.railfenceProcess(key, plaintext, ciphertext, mode);
            case 'cryptarithm':
                return this.cryptarithmProcess(key, plaintext, ciphertext, mode);
            case 'complete-columnar':
                return this.columnarProcess(key, plaintext, ciphertext, mode);
            case 'pollux':
                return this.polluxProcess(plaintext, ciphertext, mode);
            case 'morbit':
                return this.morbitProcess(key, plaintext, ciphertext, mode);
            default:
                return '<p>Solving process not available for this cipher.</p>';
        }
    }

    static atbashProcess(plaintext, ciphertext, mode) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const reversed = 'ZYXWVUTSRQPONMLKJIHGFEDCBA';
        let process = '<div class="process-step"><strong>AtBash Cipher Process:</strong></div>';
        process += '<div class="process-step">AtBash replaces each letter with its mirror in the alphabet:</div>';
        process += '<div class="process-mapping">';
        for (let i = 0; i < 13; i++) {
            process += `${alphabet[i]} ↔ ${reversed[i]}<br>`;
        }
        process += '</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const pos = char.charCodeAt(0) - 65;
                    const mapped = reversed[pos];
                    process += `${char} → ${mapped} `;
                } else {
                    process += `${char} → ${char} `;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < ciphertext.length; i++) {
                const char = ciphertext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const pos = char.charCodeAt(0) - 65;
                    const mapped = alphabet[pos];
                    process += `${char} → ${mapped} `;
                } else {
                    process += `${char} → ${char} `;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static caesarProcess(key, plaintext, ciphertext, mode) {
        const shift = parseInt(key) || 3;
        let process = '<div class="process-step"><strong>Caesar Cipher Process:</strong></div>';
        process += `<div class="process-step">Shift amount: <strong>${shift}</strong></div>`;
        process += '<div class="process-step">Formula: E(x) = (x + shift) mod 26</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const pos = char.charCodeAt(0) - 65;
                    const newPos = (pos + shift) % 26;
                    const mapped = String.fromCharCode(65 + newPos);
                    process += `${char} (${pos}) + ${shift} = ${newPos} → ${mapped}<br>`;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Formula: D(x) = (x - shift + 26) mod 26</div>';
            process += '<div class="process-chars">';
            for (let i = 0; i < ciphertext.length; i++) {
                const char = ciphertext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const pos = char.charCodeAt(0) - 65;
                    const newPos = (pos - shift + 26) % 26;
                    const mapped = String.fromCharCode(65 + newPos);
                    process += `${char} (${pos}) - ${shift} = ${newPos} → ${mapped}<br>`;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static substitutionProcess(key, plaintext, ciphertext, mode) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let process = '<div class="process-step"><strong>Substitution Cipher Process:</strong></div>';
        process += '<div class="process-step">Substitution Table:</div>';
        process += '<div class="process-mapping">';
        for (let i = 0; i < 26; i++) {
            process += `${alphabet[i]} → ${key[i]}<br>`;
        }
        process += '</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const pos = char.charCodeAt(0) - 65;
                    const mapped = key[pos];
                    process += `${char} → ${mapped} `;
                } else {
                    process += `${char} `;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Reverse Substitution Table:</div>';
            process += '<div class="process-mapping">';
            for (let i = 0; i < 26; i++) {
                process += `${key[i]} → ${alphabet[i]}<br>`;
            }
            process += '</div>';
            process += '<div class="process-chars">';
            for (let i = 0; i < ciphertext.length; i++) {
                const char = ciphertext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const pos = key.indexOf(char);
                    const mapped = alphabet[pos];
                    process += `${char} → ${mapped} `;
                } else {
                    process += `${char} `;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static xenocryptProcess(key, plaintext, ciphertext, mode) {
        return this.substitutionProcess(key, plaintext, ciphertext, mode);
    }

    static hill2x2Process(key, plaintext, ciphertext, mode) {
        const keyParts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        const matrix = [
            [keyParts[0], keyParts[1]],
            [keyParts[2], keyParts[3]]
        ];
        
        let process = '<div class="process-step"><strong>Hill 2x2 Cipher Process:</strong></div>';
        process += '<div class="process-step">Matrix Key:</div>';
        process += `<div class="process-matrix">[${matrix[0][0]} ${matrix[0][1]}]<br>[${matrix[1][0]} ${matrix[1][1]}]</div>`;
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            const text = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
            for (let i = 0; i < text.length; i += 2) {
                const pair = [
                    text.charCodeAt(i) - 65,
                    text.charCodeAt(i + 1) - 65
                ];
                const result = [
                    (matrix[0][0] * pair[0] + matrix[0][1] * pair[1]) % 26,
                    (matrix[1][0] * pair[0] + matrix[1][1] * pair[1]) % 26
                ];
                process += `<div class="process-step">[${matrix[0][0]} ${matrix[0][1]}] [${pair[0]}] = [${result[0]}] mod 26 → ${String.fromCharCode(65 + result[0])}</div>`;
                process += `<div class="process-step">[${matrix[1][0]} ${matrix[1][1]}] [${pair[1]}] = [${result[1]}] mod 26 → ${String.fromCharCode(65 + result[1])}</div>`;
            }
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += '<div class="process-step">Decryption requires matrix inversion (complex).</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static hill3x3Process(key, plaintext, ciphertext, mode) {
        const keyParts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        let process = '<div class="process-step"><strong>Hill 3x3 Cipher Process:</strong></div>';
        process += '<div class="process-step">Matrix Key (3x3):</div>';
        process += `<div class="process-matrix">[${keyParts[0]} ${keyParts[1]} ${keyParts[2]}]<br>[${keyParts[3]} ${keyParts[4]} ${keyParts[5]}]<br>[${keyParts[6]} ${keyParts[7]} ${keyParts[8]}]</div>`;
        process += '<div class="process-step">Process: Multiply 3-letter blocks by the matrix mod 26</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static affineProcess(key, plaintext, ciphertext, mode) {
        const parts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        const [a, b] = parts;
        let process = '<div class="process-step"><strong>Affine Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: a = ${a}, b = ${b}</div>`;
        
        if (mode === 'encrypt') {
            process += '<div class="process-step">Formula: E(x) = (ax + b) mod 26</div>';
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const x = char.charCodeAt(0) - 65;
                    const y = (a * x + b) % 26;
                    const mapped = String.fromCharCode(65 + y);
                    process += `${char}: (${a} × ${x} + ${b}) mod 26 = ${y} → ${mapped}<br>`;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            const aInv = this.modInverse(a, 26);
            process += '<div class="process-step">Formula: D(x) = a⁻¹(x - b) mod 26</div>';
            process += `<div class="process-step">a⁻¹ = ${aInv}</div>`;
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < ciphertext.length; i++) {
                const char = ciphertext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const x = char.charCodeAt(0) - 65;
                    const y = (aInv * (x - b + 26)) % 26;
                    const mapped = String.fromCharCode(65 + y);
                    process += `${char}: ${aInv} × (${x} - ${b}) mod 26 = ${y} → ${mapped}<br>`;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static baconianProcess(plaintext, ciphertext, mode) {
        const baconMap = {
            'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB', 'E': 'AABAA',
            'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB', 'I': 'ABAAA', 'J': 'ABAAB',
            'K': 'ABABA', 'L': 'ABABB', 'M': 'ABBAA', 'N': 'ABBAB', 'O': 'ABBBA',
            'P': 'ABBBB', 'Q': 'BAAAA', 'R': 'BAAAB', 'S': 'BAABA', 'T': 'BAABB',
            'U': 'BABAA', 'V': 'BABAB', 'W': 'BABBA', 'X': 'BABBB', 'Y': 'BBAAA',
            'Z': 'BBAAB'
        };
        
        let process = '<div class="process-step"><strong>Baconian Cipher Process:</strong></div>';
        process += '<div class="process-step">Each letter is encoded as a 5-letter sequence of A and B</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    process += `${char} → ${baconMap[char]}<br>`;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            const reverseMap = {};
            for (const [letter, code] of Object.entries(baconMap)) {
                reverseMap[code] = letter;
            }
            const codes = ciphertext.split(/\s+/);
            process += '<div class="process-chars">';
            for (const code of codes) {
                if (reverseMap[code]) {
                    process += `${code} → ${reverseMap[code]}<br>`;
                }
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static fractionatedMorseProcess(key, plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Fractionated Morse Cipher Process:</strong></div>';
        process += '<div class="process-step">1. Convert text to Morse code</div>';
        process += '<div class="process-step">2. Fractionate into trigrams</div>';
        process += '<div class="process-step">3. Substitute using key</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static portaProcess(key, plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Porta Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: <strong>${key}</strong></div>`;
        process += '<div class="process-step">Uses a digraphic table based on the key letter</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static dancingMenProcess(plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Dancing Men Cipher Process:</strong></div>';
        process += '<div class="process-step">Each letter is represented by a unique symbol pattern</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static rsaProcess(key, plaintext, ciphertext, mode) {
        const parts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        const [n, exp] = parts;
        let process = '<div class="process-step"><strong>RSA Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: n = ${n}, exponent = ${exp}</div>`;
        
        if (mode === 'encrypt') {
            process += '<div class="process-step">Formula: c = m^e mod n</div>';
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const m = char.charCodeAt(0) - 65;
                    const c = this.modPow(m, exp, n) % 26;
                    const mapped = String.fromCharCode(65 + c);
                    process += `${char}: ${m}^${exp} mod ${n} = ${c} → ${mapped}<br>`;
                }
            }
            process += '</div>';
        } else {
            process += '<div class="process-step">Formula: m = c^d mod n</div>';
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
        }
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static runningKeyProcess(key, plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Running Key Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: <strong>${key}</strong></div>`;
        process += '<div class="process-step">Each letter is shifted by the corresponding key letter</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            const keyUpper = key.toUpperCase();
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const keyChar = keyUpper[i % keyUpper.length];
                    const shift = keyChar.charCodeAt(0) - 65;
                    const pos = char.charCodeAt(0) - 65;
                    const newPos = (pos + shift) % 26;
                    const mapped = String.fromCharCode(65 + newPos);
                    process += `${char} + ${keyChar}(${shift}) = ${mapped} `;
                }
            }
            process += '</div>';
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-chars">';
            const keyUpper = key.toUpperCase();
            for (let i = 0; i < ciphertext.length; i++) {
                const char = ciphertext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const keyChar = keyUpper[i % keyUpper.length];
                    const shift = keyChar.charCodeAt(0) - 65;
                    const pos = char.charCodeAt(0) - 65;
                    const newPos = (pos - shift + 26) % 26;
                    const mapped = String.fromCharCode(65 + newPos);
                    process += `${char} - ${keyChar}(${shift}) = ${mapped} `;
                }
            }
            process += '</div>';
        }
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static railfenceProcess(key, plaintext, ciphertext, mode) {
        const rails = parseInt(key) || 3;
        let process = '<div class="process-step"><strong>Railfence Cipher Process:</strong></div>';
        process += `<div class="process-step">Number of rails: <strong>${rails}</strong></div>`;
        process += '<div class="process-step">Text is written in a zigzag pattern across the rails</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-step">Writing pattern:</div>';
            // Show a simple visualization
            const text = plaintext.replace(/\s/g, '');
            for (let r = 0; r < rails; r++) {
                let railText = '';
                let pos = r;
                let direction = 1;
                let row = Array(text.length).fill(' ');
                for (let i = 0; i < text.length; i++) {
                    if (i === pos) {
                        row[i] = text[i];
                        pos += (rails - 1) * 2;
                    }
                }
                // Simplified display
                process += `<div class="process-step">Rail ${r + 1}: ${text.split('').filter((_, i) => {
                    let p = r;
                    let d = 1;
                    let result = [];
                    for (let j = 0; j < text.length; j++) {
                        if (j === p) result.push(text[j]);
                        p += (rails - 1) * 2 * d;
                        if (p >= text.length || p < 0) d = -d;
                    }
                    return result;
                }).join('')}</div>`;
            }
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Reconstructing the zigzag pattern</div>';
        }
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static cryptarithmProcess(key, plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Cryptarithm Process:</strong></div>';
        process += '<div class="process-step">Substitution cipher with letter-to-letter mapping</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'decrypt' ? plaintext : ciphertext}</strong></div>`;
        return process;
    }

    static columnarProcess(key, plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Complete Columnar Transposition Process:</strong></div>';
        process += `<div class="process-step">Key: <strong>${key}</strong></div>`;
        process += '<div class="process-step">1. Write text in rows</div>';
        process += '<div class="process-step">2. Sort columns by key order</div>';
        process += '<div class="process-step">3. Read down columns</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static polluxProcess(plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Pollux Cipher Process:</strong></div>';
        process += '<div class="process-step">1. Convert to Morse code</div>';
        process += '<div class="process-step">2. Map: . = 1, - = 2, separator = 0</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static morbitProcess(key, plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Morbit Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: <strong>${key}</strong> (9 digits for 9 Morse pairs)</div>`;
        process += '<div class="process-step">1. Convert to Morse code</div>';
        process += '<div class="process-step">2. Group into pairs</div>';
        process += '<div class="process-step">3. Map pairs to digits using key</div>';
        process += `<div class="process-result">Result: <strong>${mode === 'encrypt' ? ciphertext : plaintext}</strong></div>`;
        return process;
    }

    static modInverse(a, m) {
        for (let x = 1; x < m; x++) {
            if ((a * x) % m === 1) {
                return x;
            }
        }
        return 1;
    }

    static modPow(base, exp, mod) {
        let result = 1;
        base = base % mod;
        while (exp > 0) {
            if (exp % 2 === 1) {
                result = (result * base) % mod;
            }
            exp = Math.floor(exp / 2);
            base = (base * base) % mod;
        }
        return result;
    }
}

