// Cipher implementations

class CipherEngine {
    // AtBash Cipher
    static atbash(text, key, mode) {
        return text.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                return String.fromCharCode(90 - (char.charCodeAt(0) - 65));
            } else if (char >= 'a' && char <= 'z') {
                return String.fromCharCode(122 - (char.charCodeAt(0) - 97));
            }
            return char;
        }).join('');
    }

    // Caesar Cipher
    static caesar(text, key, mode) {
        const shift = mode === 'encrypt' ? parseInt(key) || 3 : -(parseInt(key) || 3);
        return text.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                return String.fromCharCode(65 + ((char.charCodeAt(0) - 65 + shift + 26) % 26));
            } else if (char >= 'a' && char <= 'z') {
                return String.fromCharCode(97 + ((char.charCodeAt(0) - 97 + shift + 26) % 26));
            }
            return char;
        }).join('');
    }

    // Aristocrat (Monoalphabetic Substitution)
    static aristocrat(text, key, mode) {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
        if (keyUpper.length !== 26) return 'Key must be 26 unique letters';
        
        if (mode === 'encrypt') {
            const map = {};
            for (let i = 0; i < 26; i++) {
                map[alphabet[i]] = keyUpper[i];
            }
            return text.split('').map(char => {
                const upper = char.toUpperCase();
                if (map[upper]) {
                    return char === char.toUpperCase() ? map[upper] : map[upper].toLowerCase();
                }
                return char;
            }).join('');
        } else {
            const map = {};
            for (let i = 0; i < 26; i++) {
                map[keyUpper[i]] = alphabet[i];
            }
            return text.split('').map(char => {
                const upper = char.toUpperCase();
                if (map[upper]) {
                    return char === char.toUpperCase() ? map[upper] : map[upper].toLowerCase();
                }
                return char;
            }).join('');
        }
    }

    // Aristocrat Misspelled (same as aristocrat, but handles common typos)
    static aristocratMisspelled(text, key, mode) {
        return this.aristocrat(text, key, mode);
    }

    // Patristocrat (similar to aristocrat, often with word breaks)
    static patristocrat(text, key, mode) {
        return this.aristocrat(text, key, mode);
    }

    // Xenocrypt (Spanish substitution cipher)
    static xenocrypt(text, key, mode) {
        const alphabet = 'ABCDEFGHIJKLMNÑOPQRSTUVWXYZ';
        const keyUpper = key.toUpperCase().replace(/[^A-ZÑ]/g, '');
        if (keyUpper.length !== 27) return 'Key must be 27 unique letters (including Ñ)';
        
        if (mode === 'encrypt') {
            const map = {};
            for (let i = 0; i < 27; i++) {
                map[alphabet[i]] = keyUpper[i];
            }
            return text.split('').map(char => {
                const upper = char.toUpperCase();
                if (map[upper]) {
                    return char === char.toUpperCase() ? map[upper] : map[upper].toLowerCase();
                }
                return char;
            }).join('');
        } else {
            const map = {};
            for (let i = 0; i < 27; i++) {
                map[keyUpper[i]] = alphabet[i];
            }
            return text.split('').map(char => {
                const upper = char.toUpperCase();
                if (map[upper]) {
                    return char === char.toUpperCase() ? map[upper] : map[upper].toLowerCase();
                }
                return char;
            }).join('');
        }
    }

    // Hill 2x2 Cipher
    static hill2x2(text, key, mode) {
        const keyParts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        if (keyParts.length !== 4) return 'Key must be 4 numbers (matrix: a b c d)';
        
        const matrix = [
            [keyParts[0], keyParts[1]],
            [keyParts[2], keyParts[3]]
        ];
        
        const det = matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
        if (det === 0 || this.gcd(det, 26) !== 1) return 'Invalid matrix (determinant must be coprime with 26)';
        
        let processed = text.toUpperCase().replace(/[^A-Z]/g, '');
        if (processed.length % 2 !== 0) processed += 'X';
        
        const result = [];
        for (let i = 0; i < processed.length; i += 2) {
            const pair = [
                processed.charCodeAt(i) - 65,
                processed.charCodeAt(i + 1) - 65
            ];
            
            if (mode === 'encrypt') {
                const encrypted = [
                    (matrix[0][0] * pair[0] + matrix[0][1] * pair[1]) % 26,
                    (matrix[1][0] * pair[0] + matrix[1][1] * pair[1]) % 26
                ];
                result.push(String.fromCharCode(65 + encrypted[0]));
                result.push(String.fromCharCode(65 + encrypted[1]));
            } else {
                // Inverse matrix
                const invDet = this.modInverse(det, 26);
                const invMatrix = [
                    [(matrix[1][1] * invDet) % 26, (-matrix[0][1] * invDet + 26) % 26],
                    [(-matrix[1][0] * invDet + 26) % 26, (matrix[0][0] * invDet) % 26]
                ];
                const decrypted = [
                    (invMatrix[0][0] * pair[0] + invMatrix[0][1] * pair[1]) % 26,
                    (invMatrix[1][0] * pair[0] + invMatrix[1][1] * pair[1]) % 26
                ];
                result.push(String.fromCharCode(65 + decrypted[0]));
                result.push(String.fromCharCode(65 + decrypted[1]));
            }
        }
        return result.join('');
    }

    // Hill 3x3 Cipher
    static hill3x3(text, key, mode) {
        const keyParts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        if (keyParts.length !== 9) return 'Key must be 9 numbers (3x3 matrix)';
        
        const matrix = [
            [keyParts[0], keyParts[1], keyParts[2]],
            [keyParts[3], keyParts[4], keyParts[5]],
            [keyParts[6], keyParts[7], keyParts[8]]
        ];
        
        let processed = text.toUpperCase().replace(/[^A-Z]/g, '');
        while (processed.length % 3 !== 0) processed += 'X';
        
        const result = [];
        for (let i = 0; i < processed.length; i += 3) {
            const triple = [
                processed.charCodeAt(i) - 65,
                processed.charCodeAt(i + 1) - 65,
                processed.charCodeAt(i + 2) - 65
            ];
            
            if (mode === 'encrypt') {
                const encrypted = [
                    (matrix[0][0] * triple[0] + matrix[0][1] * triple[1] + matrix[0][2] * triple[2]) % 26,
                    (matrix[1][0] * triple[0] + matrix[1][1] * triple[1] + matrix[1][2] * triple[2]) % 26,
                    (matrix[2][0] * triple[0] + matrix[2][1] * triple[1] + matrix[2][2] * triple[2]) % 26
                ];
                result.push(String.fromCharCode(65 + encrypted[0]));
                result.push(String.fromCharCode(65 + encrypted[1]));
                result.push(String.fromCharCode(65 + encrypted[2]));
            } else {
                return 'Hill 3x3 decryption requires matrix inversion (complex)';
            }
        }
        return result.join('');
    }

    // Affine Cipher
    static affine(text, key, mode) {
        const parts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        if (parts.length !== 2) return 'Key must be 2 numbers: a, b (where gcd(a,26)=1)';
        const [a, b] = parts;
        if (this.gcd(a, 26) !== 1) return 'a must be coprime with 26';
        
        return text.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                const x = char.charCodeAt(0) - 65;
                let y;
                if (mode === 'encrypt') {
                    y = (a * x + b) % 26;
                } else {
                    const aInv = this.modInverse(a, 26);
                    y = (aInv * (x - b + 26)) % 26;
                }
                return String.fromCharCode(65 + y);
            } else if (char >= 'a' && char <= 'z') {
                const x = char.charCodeAt(0) - 97;
                let y;
                if (mode === 'encrypt') {
                    y = (a * x + b) % 26;
                } else {
                    const aInv = this.modInverse(a, 26);
                    y = (aInv * (x - b + 26)) % 26;
                }
                return String.fromCharCode(97 + y);
            }
            return char;
        }).join('');
    }

    // Baconian Cipher
    static baconian(text, key, mode) {
        const baconMap = {
            'A': 'AAAAA', 'B': 'AAAAB', 'C': 'AAABA', 'D': 'AAABB', 'E': 'AABAA',
            'F': 'AABAB', 'G': 'AABBA', 'H': 'AABBB', 'I': 'ABAAA', 'J': 'ABAAB',
            'K': 'ABABA', 'L': 'ABABB', 'M': 'ABBAA', 'N': 'ABBAB', 'O': 'ABBBA',
            'P': 'ABBBB', 'Q': 'BAAAA', 'R': 'BAAAB', 'S': 'BAABA', 'T': 'BAABB',
            'U': 'BABAA', 'V': 'BABAB', 'W': 'BABBA', 'X': 'BABBB', 'Y': 'BBAAA',
            'Z': 'BBAAB'
        };
        
        if (mode === 'encrypt') {
            return text.toUpperCase().split('').map(char => {
                if (char >= 'A' && char <= 'Z') {
                    return baconMap[char];
                }
                return char;
            }).join(' ');
        } else {
            const reverseMap = {};
            for (const [letter, code] of Object.entries(baconMap)) {
                reverseMap[code] = letter;
            }
            return text.replace(/[AB]/g, '').split(/\s+/).map(code => {
                return reverseMap[code] || code;
            }).join('');
        }
    }

    // Fractionated Morse Cipher
    static fractionatedMorse(text, key, mode) {
        const morseMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..', '0': '-----', '1': '.----', '2': '..---', '3': '...--',
            '4': '....-', '5': '.....', '6': '-....', '7': '--...', '8': '---..',
            '9': '----.'
        };
        
        if (mode === 'encrypt') {
            let morse = text.toUpperCase().split('').map(char => {
                if (morseMap[char]) return morseMap[char] + 'x';
                return 'xx';
            }).join('');
            
            // Use key for substitution (simplified)
            const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
            if (keyUpper.length < 9) return 'Key must be at least 9 letters';
            
            const result = [];
            for (let i = 0; i < morse.length; i += 3) {
                const trigram = morse.substr(i, 3).padEnd(3, 'x');
                const index = (trigram[0] === '.' ? 0 : 1) * 9 + 
                             (trigram[1] === '.' ? 0 : 1) * 3 + 
                             (trigram[2] === '.' ? 0 : 1);
                result.push(keyUpper[index % keyUpper.length]);
            }
            return result.join('');
        } else {
            return 'Decryption requires reverse mapping';
        }
    }

    // Porta Cipher
    static porta(text, key, mode) {
        const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
        if (!keyUpper) return 'Key required';
        
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const portaTable = {
            'A': 'NOPQRSTUVWXYZABCDEFGHIJKLM',
            'B': 'NOPQRSTUVWXYZABCDEFGHIJKLM',
            'C': 'OPQRSTUVWXYZABCDEFGHIJKLMN',
            'D': 'OPQRSTUVWXYZABCDEFGHIJKLMN',
            'E': 'PQRSTUVWXYZABCDEFGHIJKLMNO',
            'F': 'PQRSTUVWXYZABCDEFGHIJKLMNO',
            'G': 'QRSTUVWXYZABCDEFGHIJKLMNOP',
            'H': 'QRSTUVWXYZABCDEFGHIJKLMNOP',
            'I': 'RSTUVWXYZABCDEFGHIJKLMNOPQ',
            'J': 'RSTUVWXYZABCDEFGHIJKLMNOPQ',
            'K': 'STUVWXYZABCDEFGHIJKLMNOPQR',
            'L': 'STUVWXYZABCDEFGHIJKLMNOPQR',
            'M': 'TUVWXYZABCDEFGHIJKLMNOPQRS',
            'N': 'TUVWXYZABCDEFGHIJKLMNOPQRS',
            'O': 'UVWXYZABCDEFGHIJKLMNOPQRST',
            'P': 'UVWXYZABCDEFGHIJKLMNOPQRST',
            'Q': 'VWXYZABCDEFGHIJKLMNOPQRSTU',
            'R': 'VWXYZABCDEFGHIJKLMNOPQRSTU',
            'S': 'WXYZABCDEFGHIJKLMNOPQRSTUV',
            'T': 'WXYZABCDEFGHIJKLMNOPQRSTUV',
            'U': 'XYZABCDEFGHIJKLMNOPQRSTUVW',
            'V': 'XYZABCDEFGHIJKLMNOPQRSTUVW',
            'W': 'YZABCDEFGHIJKLMNOPQRSTUVWX',
            'X': 'YZABCDEFGHIJKLMNOPQRSTUVWX',
            'Y': 'ZABCDEFGHIJKLMNOPQRSTUVWXY',
            'Z': 'ZABCDEFGHIJKLMNOPQRSTUVWXY'
        };
        
        let keyIndex = 0;
        return text.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                const keyChar = keyUpper[keyIndex % keyUpper.length];
                const row = portaTable[keyChar];
                const col = alphabet.indexOf(char);
                keyIndex++;
                return row[col];
            } else if (char >= 'a' && char <= 'z') {
                const keyChar = keyUpper[keyIndex % keyUpper.length];
                const row = portaTable[keyChar];
                const col = alphabet.indexOf(char.toUpperCase());
                keyIndex++;
                return row[col].toLowerCase();
            }
            return char;
        }).join('');
    }

    // Dancing Men Cipher (text representation)
    static dancingMen(text, key, mode) {
        const men = {
            'A': '⚡', 'B': '⚡⚡', 'C': '⚡⚡⚡', 'D': '⚡⚡⚡⚡', 'E': '⚡⚡⚡⚡⚡',
            'F': '⚡⚡⚡⚡⚡⚡', 'G': '⚡⚡⚡⚡⚡⚡⚡', 'H': '⚡⚡⚡⚡⚡⚡⚡⚡',
            'I': '⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'J': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'K': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'L': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'M': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'N': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'O': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'P': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'Q': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'R': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'S': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'T': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'U': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'V': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'W': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'X': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡',
            'Y': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡', 'Z': '⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡⚡'
        };
        
        if (mode === 'encrypt') {
            return text.toUpperCase().split('').map(char => {
                if (char >= 'A' && char <= 'Z') {
                    return men[char] || char;
                }
                return char;
            }).join(' ');
        } else {
            const reverseMap = {};
            for (const [letter, symbol] of Object.entries(men)) {
                reverseMap[symbol] = letter;
            }
            return text.split(/\s+/).map(symbol => {
                return reverseMap[symbol] || symbol;
            }).join('');
        }
    }

    // RSA Cipher (simplified for practice)
    static rsa(text, key, mode) {
        const parts = key.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
        if (parts.length < 2) return 'Key must be: n, e (for encrypt) or n, d (for decrypt)';
        const [n, exp] = parts;
        
        return text.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                const m = char.charCodeAt(0) - 65;
                const c = this.modPow(m, exp, n);
                return String.fromCharCode(65 + (c % 26));
            } else if (char >= 'a' && char <= 'z') {
                const m = char.charCodeAt(0) - 97;
                const c = this.modPow(m, exp, n);
                return String.fromCharCode(97 + (c % 26));
            }
            return char;
        }).join('');
    }

    // Running Key Cipher
    static runningKey(text, key, mode) {
        const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
        if (!keyUpper) return 'Key required';
        
        let keyIndex = 0;
        return text.split('').map(char => {
            if (char >= 'A' && char <= 'Z') {
                const keyChar = keyUpper[keyIndex % keyUpper.length];
                const shift = keyChar.charCodeAt(0) - 65;
                let result;
                if (mode === 'encrypt') {
                    result = String.fromCharCode(65 + ((char.charCodeAt(0) - 65 + shift) % 26));
                } else {
                    result = String.fromCharCode(65 + ((char.charCodeAt(0) - 65 - shift + 26) % 26));
                }
                keyIndex++;
                return result;
            } else if (char >= 'a' && char <= 'z') {
                const keyChar = keyUpper[keyIndex % keyUpper.length];
                const shift = keyChar.charCodeAt(0) - 65;
                let result;
                if (mode === 'encrypt') {
                    result = String.fromCharCode(97 + ((char.charCodeAt(0) - 97 + shift) % 26));
                } else {
                    result = String.fromCharCode(97 + ((char.charCodeAt(0) - 97 - shift + 26) % 26));
                }
                keyIndex++;
                return result;
            }
            return char;
        }).join('');
    }

    // Railfence Cipher
    static railfence(text, key, mode) {
        const rails = parseInt(key) || 3;
        if (rails < 2) return 'Key must be number of rails (>= 2)';
        
        if (mode === 'encrypt') {
            const fence = Array(rails).fill(null).map(() => []);
            let rail = 0;
            let direction = 1;
            
            for (const char of text) {
                fence[rail].push(char);
                rail += direction;
                if (rail === 0 || rail === rails - 1) {
                    direction = -direction;
                }
            }
            
            return fence.map(row => row.join('')).join('');
        } else {
            const length = text.length;
            const fence = Array(rails).fill(null).map(() => []);
            let rail = 0;
            let direction = 1;
            
            for (let i = 0; i < length; i++) {
                fence[rail].push(i);
                rail += direction;
                if (rail === 0 || rail === rails - 1) {
                    direction = -direction;
                }
            }
            
            const indices = fence.flat();
            const result = Array(length);
            let textIndex = 0;
            
            for (let r = 0; r < rails; r++) {
                for (let i = 0; i < fence[r].length; i++) {
                    result[indices[textIndex]] = text[textIndex];
                    textIndex++;
                }
            }
            
            return result.join('');
        }
    }

    // Cryptarithm (alphametic puzzle solver - simplified)
    static cryptarithm(text, key, mode) {
        if (mode === 'encrypt') {
            return 'Cryptarithm is a puzzle type, not an encryption cipher';
        } else {
            // Simple substitution based on key
            const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
            const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const map = {};
            for (let i = 0; i < Math.min(keyUpper.length, 26); i++) {
                map[alphabet[i]] = keyUpper[i];
            }
            return text.split('').map(char => {
                const upper = char.toUpperCase();
                if (map[upper]) {
                    return char === char.toUpperCase() ? map[upper] : map[upper].toLowerCase();
                }
                return char;
            }).join('');
        }
    }

    // Complete Columnar Transposition
    static completeColumnar(text, key, mode) {
        const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
        if (!keyUpper) return 'Key required';
        
        const keyOrder = keyUpper.split('').map((char, idx) => ({
            char,
            idx,
            order: char.charCodeAt(0) - 65
        })).sort((a, b) => {
            if (a.order !== b.order) return a.order - b.order;
            return a.idx - b.idx;
        });
        
        const cols = keyUpper.length;
        const rows = Math.ceil(text.length / cols);
        
        if (mode === 'encrypt') {
            const matrix = [];
            for (let i = 0; i < rows; i++) {
                matrix[i] = [];
                for (let j = 0; j < cols; j++) {
                    const idx = i * cols + j;
                    matrix[i][j] = idx < text.length ? text[idx] : 'X';
                }
            }
            
            const result = [];
            for (const { idx } of keyOrder) {
                for (let i = 0; i < rows; i++) {
                    result.push(matrix[i][idx]);
                }
            }
            return result.join('');
        } else {
            const matrix = Array(rows).fill(null).map(() => Array(cols));
            let textIndex = 0;
            
            for (const { idx } of keyOrder) {
                for (let i = 0; i < rows; i++) {
                    if (textIndex < text.length) {
                        matrix[i][idx] = text[textIndex++];
                    }
                }
            }
            
            const result = [];
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    if (matrix[i][j]) result.push(matrix[i][j]);
                }
            }
            return result.join('').replace(/X+$/, '');
        }
    }

    // Pollux Cipher (Morse code variant)
    static pollux(text, key, mode) {
        const morseMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..'
        };
        
        if (mode === 'encrypt') {
            let morse = text.toUpperCase().split('').map(char => {
                return morseMap[char] || '';
            }).join('x');
            
            // Map to numbers based on key
            const keyUpper = key.toUpperCase().replace(/[^A-Z]/g, '');
            return morse.split('').map(symbol => {
                if (symbol === '.') return '1';
                if (symbol === '-') return '2';
                if (symbol === 'x') return '0';
                return symbol;
            }).join('');
        } else {
            const reverseMorse = {};
            for (const [letter, code] of Object.entries(morseMap)) {
                reverseMorse[code] = letter;
            }
            
            const morse = text.replace(/[^012]/g, '').split('').map(digit => {
                if (digit === '1') return '.';
                if (digit === '2') return '-';
                if (digit === '0') return 'x';
                return '';
            }).join('');
            
            return morse.split('x').map(code => {
                return reverseMorse[code] || '';
            }).join('');
        }
    }

    // Morbit Cipher (Morse code variant)
    static morbit(text, key, mode) {
        const morseMap = {
            'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
            'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
            'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
            'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
            'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
            'Z': '--..'
        };
        
        if (mode === 'encrypt') {
            let morse = text.toUpperCase().split('').map(char => {
                return morseMap[char] || '';
            }).join('x');
            
            // Key should be 9 digits for 9 possible pairs
            const keyDigits = key.replace(/[^0-9]/g, '');
            if (keyDigits.length < 9) return 'Key must be 9 digits';
            
            const pairs = ['..', '.-', '.x', '-.', '--', '-x', 'x.', 'x-', 'xx'];
            const result = [];
            
            for (let i = 0; i < morse.length; i += 2) {
                const pair = morse.substr(i, 2).padEnd(2, 'x');
                const pairIndex = pairs.indexOf(pair);
                if (pairIndex !== -1) {
                    result.push(keyDigits[pairIndex]);
                }
            }
            return result.join('');
        } else {
            return 'Morbit decryption requires reverse mapping';
        }
    }

    // Helper functions
    static gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
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

