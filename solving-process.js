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
        process += '<div class="process-step">Formula: [C₁ C₂] = [P₁ P₂] × Matrix (mod 26)</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            const text = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
            for (let i = 0; i < text.length; i += 2) {
                const char1 = text[i];
                const char2 = text[i + 1] || 'X';
                const pair = [
                    char1.charCodeAt(0) - 65,
                    char2.charCodeAt(0) - 65
                ];
                const calc1 = matrix[0][0] * pair[0] + matrix[0][1] * pair[1];
                const calc2 = matrix[1][0] * pair[0] + matrix[1][1] * pair[1];
                const result = [
                    calc1 % 26,
                    calc2 % 26
                ];
                process += `<div class="process-step"><strong>Pair: ${char1}${char2}</strong></div>`;
                process += `<div class="process-chars">${char1} = ${pair[0]}, ${char2} = ${pair[1]}</div>`;
                process += `<div class="process-chars">C₁ = (${matrix[0][0]} × ${pair[0]} + ${matrix[0][1]} × ${pair[1]}) mod 26 = ${calc1} mod 26 = ${result[0]} → ${String.fromCharCode(65 + result[0])}</div>`;
                process += `<div class="process-chars">C₂ = (${matrix[1][0]} × ${pair[0]} + ${matrix[1][1]} × ${pair[1]}) mod 26 = ${calc2} mod 26 = ${result[1]} → ${String.fromCharCode(65 + result[1])}</div>`;
            }
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += '<div class="process-step"><strong>Decrypting:</strong></div>';
            process += '<div class="process-step">Step 1: Calculate determinant</div>';
            const det = (matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0] + 26) % 26;
            process += `<div class="process-chars">det = (${matrix[0][0]} × ${matrix[1][1]} - ${matrix[0][1]} × ${matrix[1][0]}) mod 26 = ${det}</div>`;
            process += '<div class="process-step">Step 2: Find modular inverse of determinant</div>';
            const invDet = this.modInverse(det, 26);
            process += `<div class="process-chars">det⁻¹ = ${invDet}</div>`;
            process += '<div class="process-step">Step 3: Calculate inverse matrix</div>';
            const invMatrix = [
                [(matrix[1][1] * invDet) % 26, (-matrix[0][1] * invDet + 26) % 26],
                [(-matrix[1][0] * invDet + 26) % 26, (matrix[0][0] * invDet) % 26]
            ];
            process += `<div class="process-matrix">Inverse Matrix:<br>[${invMatrix[0][0]} ${invMatrix[0][1]}]<br>[${invMatrix[1][0]} ${invMatrix[1][1]}]</div>`;
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static hill3x3Process(key, plaintext, ciphertext, mode) {
        const keyParts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        let process = '<div class="process-step"><strong>Hill 3x3 Cipher Process:</strong></div>';
        process += '<div class="process-step">Matrix Key (3x3):</div>';
        process += `<div class="process-matrix">[${keyParts[0]} ${keyParts[1]} ${keyParts[2]}]<br>[${keyParts[3]} ${keyParts[4]} ${keyParts[5]}]<br>[${keyParts[6]} ${keyParts[7]} ${keyParts[8]}]</div>`;
        process += '<div class="process-step">Formula: [C₁ C₂ C₃] = [P₁ P₂ P₃] × Matrix (mod 26)</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            const text = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
            for (let i = 0; i < text.length; i += 3) {
                const char1 = text[i] || 'X';
                const char2 = text[i + 1] || 'X';
                const char3 = text[i + 2] || 'X';
                const triple = [
                    char1.charCodeAt(0) - 65,
                    char2.charCodeAt(0) - 65,
                    char3.charCodeAt(0) - 65
                ];
                const calc1 = keyParts[0] * triple[0] + keyParts[1] * triple[1] + keyParts[2] * triple[2];
                const calc2 = keyParts[3] * triple[0] + keyParts[4] * triple[1] + keyParts[5] * triple[2];
                const calc3 = keyParts[6] * triple[0] + keyParts[7] * triple[1] + keyParts[8] * triple[2];
                const result = [
                    calc1 % 26,
                    calc2 % 26,
                    calc3 % 26
                ];
                process += `<div class="process-step"><strong>Triple: ${char1}${char2}${char3}</strong></div>`;
                process += `<div class="process-chars">${char1} = ${triple[0]}, ${char2} = ${triple[1]}, ${char3} = ${triple[2]}</div>`;
                process += `<div class="process-chars">C₁ = (${keyParts[0]}×${triple[0]} + ${keyParts[1]}×${triple[1]} + ${keyParts[2]}×${triple[2]}) mod 26 = ${calc1} mod 26 = ${result[0]} → ${String.fromCharCode(65 + result[0])}</div>`;
                process += `<div class="process-chars">C₂ = (${keyParts[3]}×${triple[0]} + ${keyParts[4]}×${triple[1]} + ${keyParts[5]}×${triple[2]}) mod 26 = ${calc2} mod 26 = ${result[1]} → ${String.fromCharCode(65 + result[1])}</div>`;
                process += `<div class="process-chars">C₃ = (${keyParts[6]}×${triple[0]} + ${keyParts[7]}×${triple[1]} + ${keyParts[8]}×${triple[2]}) mod 26 = ${calc3} mod 26 = ${result[2]} → ${String.fromCharCode(65 + result[2])}</div>`;
            }
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += '<div class="process-step">Decryption requires 3x3 matrix inversion (complex).</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
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
        const morseMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..'
        };
        
        let process = '<div class="process-step"><strong>Fractionated Morse Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: <strong>${key}</strong></div>`;
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-step">Step 1: Convert to Morse code</div>';
            process += '<div class="process-chars">';
            let morse = '';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (morseMap[char]) {
                    process += `${char} → ${morseMap[char]}<br>`;
                    morse += morseMap[char] + 'x';
                }
            }
            process += '</div>';
            process += `<div class="process-step">Morse code: ${morse}</div>`;
            process += '<div class="process-step">Step 2: Group into trigrams (3 symbols each)</div>';
            process += '<div class="process-step">Step 3: Map each trigram to a letter using the key</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Reverse the substitution and convert Morse back to letters</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static portaProcess(key, plaintext, ciphertext, mode) {
        let process = '<div class="process-step"><strong>Porta Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: <strong>${key}</strong></div>`;
        process += '<div class="process-step">Each key letter determines which row of the Porta table to use</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-chars">';
            const keyUpper = key.toUpperCase();
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (char >= 'A' && char <= 'Z') {
                    const keyChar = keyUpper[i % keyUpper.length];
                    process += `${char} (key: ${keyChar}) → [lookup in Porta table] `;
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
                    process += `${char} (key: ${keyChar}) → [reverse lookup] `;
                }
            }
            process += '</div>';
        }
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
        process += '<div class="process-step">Text is written in a zigzag pattern, then read row by row</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            const text = plaintext.replace(/\s/g, '').toUpperCase();
            process += '<div class="process-step">Step 1: Write text in zigzag pattern</div>';
            
            // Create rail visualization
            const railArrays = Array(rails).fill(null).map(() => []);
            let rail = 0;
            let direction = 1;
            
            for (let i = 0; i < text.length; i++) {
                railArrays[rail].push(text[i]);
                rail += direction;
                if (rail === 0 || rail === rails - 1) {
                    direction = -direction;
                }
            }
            
            for (let r = 0; r < rails; r++) {
                process += `<div class="process-chars">Rail ${r + 1}: ${railArrays[r].join('')}</div>`;
            }
            
            process += '<div class="process-step">Step 2: Read across all rails</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Step 1: Determine pattern length and distribute letters to rails</div>';
            process += '<div class="process-step">Step 2: Reconstruct zigzag pattern</div>';
            process += '<div class="process-step">Step 3: Read in zigzag order</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
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
        const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
        const cols = keyUpper.length;
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            const text = plaintext.replace(/\s/g, '').toUpperCase();
            const rows = Math.ceil(text.length / cols);
            process += `<div class="process-step">Step 1: Write text in ${rows} rows × ${cols} columns</div>`;
            
            // Show key order
            const keyOrder = keyUpper.split('').map((char, idx) => ({
                char,
                idx,
                order: char.charCodeAt(0) - 65
            })).sort((a, b) => {
                if (a.order !== b.order) return a.order - b.order;
                return a.idx - b.idx;
            });
            
            process += '<div class="process-step">Step 2: Sort columns by alphabetical order of key letters</div>';
            process += '<div class="process-chars">';
            for (let i = 0; i < keyOrder.length; i++) {
                process += `Column ${keyOrder[i].idx + 1} (${keyOrder[i].char}) → Position ${i + 1}<br>`;
            }
            process += '</div>';
            process += '<div class="process-step">Step 3: Read down columns in sorted order</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Step 1: Determine column order from key</div>';
            process += '<div class="process-step">Step 2: Distribute ciphertext into columns</div>';
            process += '<div class="process-step">Step 3: Rearrange columns to original order</div>';
            process += '<div class="process-step">Step 4: Read across rows</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static polluxProcess(plaintext, ciphertext, mode) {
        const morseMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..'
        };
        
        let process = '<div class="process-step"><strong>Pollux Cipher Process:</strong></div>';
        process += '<div class="process-step">Mapping: . = 1, - = 2, letter separator = 0</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-step">Step 1: Convert each letter to Morse code</div>';
            process += '<div class="process-chars">';
            let morse = '';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (morseMap[char]) {
                    process += `${char} → ${morseMap[char]}<br>`;
                    morse += morseMap[char] + 'x';
                }
            }
            process += '</div>';
            process += '<div class="process-step">Step 2: Convert Morse to numbers</div>';
            process += '<div class="process-chars">';
            for (let i = 0; i < morse.length; i++) {
                const symbol = morse[i];
                if (symbol === '.') process += '. → 1 ';
                else if (symbol === '-') process += '- → 2 ';
                else if (symbol === 'x') process += 'x → 0 ';
            }
            process += '</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Step 1: Convert numbers back to Morse</div>';
            process += '<div class="process-chars">1 → ., 2 → -, 0 → separator</div>';
            process += '<div class="process-step">Step 2: Convert Morse code back to letters</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
        return process;
    }

    static morbitProcess(key, plaintext, ciphertext, mode) {
        const morseMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..'
        };
        
        const pairs = ['..', '.-', '.x', '-.', '--', '-x', 'x.', 'x-', 'xx'];
        
        let process = '<div class="process-step"><strong>Morbit Cipher Process:</strong></div>';
        process += `<div class="process-step">Key: <strong>${key}</strong></div>`;
        process += '<div class="process-step">Key mapping (9 possible Morse pairs):</div>';
        process += '<div class="process-chars">';
        for (let i = 0; i < 9; i++) {
            process += `${pairs[i]} → ${key[i]}<br>`;
        }
        process += '</div>';
        
        if (mode === 'encrypt') {
            process += `<div class="process-step"><strong>Encrypting "${plaintext}":</strong></div>`;
            process += '<div class="process-step">Step 1: Convert to Morse code</div>';
            let morse = '';
            for (let i = 0; i < plaintext.length; i++) {
                const char = plaintext[i].toUpperCase();
                if (morseMap[char]) {
                    morse += morseMap[char] + 'x';
                }
            }
            process += `<div class="process-chars">Morse: ${morse}</div>`;
            process += '<div class="process-step">Step 2: Group into pairs and map to digits</div>';
            process += `<div class="process-result">Result: <strong>${ciphertext}</strong></div>`;
        } else {
            process += `<div class="process-step"><strong>Decrypting "${ciphertext}":</strong></div>`;
            process += '<div class="process-step">Step 1: Map digits back to Morse pairs</div>';
            process += '<div class="process-step">Step 2: Reconstruct Morse code</div>';
            process += '<div class="process-step">Step 3: Convert Morse to letters</div>';
            process += `<div class="process-result">Result: <strong>${plaintext}</strong></div>`;
        }
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

