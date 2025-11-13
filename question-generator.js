// Question Generator for Practice Mode

class QuestionGenerator {
    static commonWords = [
        'HELLO', 'WORLD', 'CRYPTO', 'SECRET', 'MESSAGE', 'CIPHER', 'ENCODE', 'DECODE',
        'PRACTICE', 'LEARNING', 'CHALLENGE', 'PUZZLE', 'SOLVE', 'ANSWER', 'KEY',
        'TEXT', 'PLAIN', 'CODE', 'BREAK', 'CRACK'
    ];

    static randomText(length = 10) {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    }

    static randomWord() {
        return this.commonWords[Math.floor(Math.random() * this.commonWords.length)];
    }

    static randomPhrase() {
        const wordCount = Math.floor(Math.random() * 3) + 2; // 2-4 words
        const words = [];
        for (let i = 0; i < wordCount; i++) {
            words.push(this.randomWord());
        }
        return words.join(' ');
    }

    static randomShift() {
        return Math.floor(Math.random() * 25) + 1; // 1-25
    }

    static randomAlphabet() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        for (let i = alphabet.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [alphabet[i], alphabet[j]] = [alphabet[j], alphabet[i]];
        }
        return alphabet.join('');
    }

    static randomKeyPhrase() {
        const phrases = [
            'SECRETKEY', 'PASSWORD', 'MYKEY', 'CIPHERKEY', 'ENCRYPTION',
            'DECRYPTION', 'PRACTICE', 'LEARNING', 'CHALLENGE', 'PUZZLE'
        ];
        return phrases[Math.floor(Math.random() * phrases.length)];
    }

    static randomAffineKey() {
        const validA = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25];
        const a = validA[Math.floor(Math.random() * validA.length)];
        const b = Math.floor(Math.random() * 26);
        return `${a}, ${b}`;
    }

    static randomHill2x2Key() {
        // Generate a valid 2x2 matrix
        let valid = false;
        let matrix = [0, 0, 0, 0];
        while (!valid) {
            matrix = [
                Math.floor(Math.random() * 26),
                Math.floor(Math.random() * 26),
                Math.floor(Math.random() * 26),
                Math.floor(Math.random() * 26)
            ];
            const det = (matrix[0] * matrix[3] - matrix[1] * matrix[2] + 26) % 26;
            if (det !== 0 && this.gcd(det, 26) === 1) {
                valid = true;
            }
        }
        return matrix.join(' ');
    }

    static randomHill3x3Key() {
        // Simplified - just generate 9 random numbers
        const matrix = [];
        for (let i = 0; i < 9; i++) {
            matrix.push(Math.floor(Math.random() * 26));
        }
        return matrix.join(' ');
    }

    static randomRSAKey() {
        // Simplified RSA keys for practice
        const n = 143; // 11 * 13
        const e = 7;
        const d = 103;
        return `${n}, ${e}`;
    }

    static randomRails() {
        return Math.floor(Math.random() * 4) + 2; // 2-5 rails
    }

    static randomMorbitKey() {
        const digits = '0123456789'.split('');
        for (let i = digits.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [digits[i], digits[j]] = [digits[j], digits[i]];
        }
        return digits.slice(0, 9).join('');
    }

    static gcd(a, b) {
        while (b !== 0) {
            [a, b] = [b, a % b];
        }
        return a;
    }

    static generateQuestion(cipherType, retryCount = 0) {
        if (retryCount > 5) {
            return null; // Prevent infinite recursion
        }
        const mode = Math.random() < 0.5 ? 'encrypt' : 'decrypt';
        let question, key, plaintext, ciphertext, answer;

        switch (cipherType) {
            case 'atbash':
                plaintext = this.randomPhrase();
                key = '';
                ciphertext = CipherEngine.atbash(plaintext, '', 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using AtBash cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using AtBash cipher.';
                    answer = plaintext;
                }
                break;

            case 'caesar':
                const shift = this.randomShift();
                plaintext = this.randomPhrase();
                key = shift.toString();
                ciphertext = CipherEngine.caesar(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = `Encrypt the plaintext using Caesar cipher with shift ${shift}.`;
                    answer = ciphertext;
                } else {
                    question = `Decrypt the ciphertext using Caesar cipher with shift ${shift}.`;
                    answer = plaintext;
                }
                break;

            case 'aristocrat':
                const alphabet = this.randomAlphabet();
                plaintext = this.randomPhrase();
                key = alphabet;
                ciphertext = CipherEngine.aristocrat(plaintext, key, 'encrypt');
                if (ciphertext && ciphertext.includes('must')) {
                    return this.generateQuestion(cipherType, retryCount + 1);
                }
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using the given substitution key.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using the given substitution key.';
                    answer = plaintext;
                }
                break;

            case 'aristocrat-misspelled':
                const alphabet2 = this.randomAlphabet();
                plaintext = this.randomPhrase();
                key = alphabet2;
                ciphertext = CipherEngine.aristocratMisspelled(plaintext, key, 'encrypt');
                if (ciphertext && ciphertext.includes('must')) {
                    return this.generateQuestion(cipherType, retryCount + 1);
                }
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using the given substitution key.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using the given substitution key.';
                    answer = plaintext;
                }
                break;

            case 'patristocrat':
                const alphabet3 = this.randomAlphabet();
                plaintext = this.randomPhrase();
                key = alphabet3;
                ciphertext = CipherEngine.patristocrat(plaintext, key, 'encrypt');
                if (ciphertext && ciphertext.includes('must')) {
                    return this.generateQuestion(cipherType, retryCount + 1);
                }
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using the given substitution key.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using the given substitution key.';
                    answer = plaintext;
                }
                break;

            case 'xenocrypt':
                // Simplified - use regular alphabet for now
                const xenAlphabet = this.randomAlphabet() + 'Ñ';
                plaintext = this.randomPhrase();
                key = xenAlphabet;
                ciphertext = CipherEngine.xenocrypt(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Xenocrypt cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Xenocrypt cipher.';
                    answer = plaintext;
                }
                break;

            case 'hill-2x2':
                const hill2Key = this.randomHill2x2Key();
                plaintext = this.randomText(8); // Even length
                key = hill2Key;
                ciphertext = CipherEngine.hill2x2(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Hill 2x2 cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Hill 2x2 cipher.';
                    answer = plaintext;
                }
                break;

            case 'hill-3x3':
                const hill3Key = this.randomHill3x3Key();
                plaintext = this.randomText(9); // Multiple of 3
                key = hill3Key;
                ciphertext = CipherEngine.hill3x3(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Hill 3x3 cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Hill 3x3 cipher.';
                    answer = plaintext;
                }
                break;

            case 'affine':
                const affineKey = this.randomAffineKey();
                plaintext = this.randomPhrase();
                key = affineKey;
                ciphertext = CipherEngine.affine(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Affine cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Affine cipher.';
                    answer = plaintext;
                }
                break;

            case 'baconian':
                plaintext = this.randomWord();
                key = '';
                ciphertext = CipherEngine.baconian(plaintext, '', 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Baconian cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Baconian cipher.';
                    answer = plaintext;
                }
                break;

            case 'fractionated-morse':
                const fmKey = this.randomKeyPhrase() + this.randomKeyPhrase();
                plaintext = this.randomWord();
                key = fmKey;
                ciphertext = CipherEngine.fractionatedMorse(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Fractionated Morse cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Fractionated Morse cipher.';
                    answer = plaintext;
                }
                break;

            case 'porta':
                const portaKey = this.randomKeyPhrase();
                plaintext = this.randomPhrase();
                key = portaKey;
                ciphertext = CipherEngine.porta(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Porta cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Porta cipher.';
                    answer = plaintext;
                }
                break;

            case 'dancing-men':
                plaintext = this.randomWord();
                key = '';
                ciphertext = CipherEngine.dancingMen(plaintext, '', 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Dancing Men cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Dancing Men cipher.';
                    answer = plaintext;
                }
                break;

            case 'rsa':
                const rsaKey = this.randomRSAKey();
                plaintext = this.randomWord();
                key = rsaKey;
                ciphertext = CipherEngine.rsa(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using RSA cipher.';
                    answer = ciphertext;
                } else {
                    // For decryption, use the private key
                    const decryptKey = '143, 103'; // n, d
                    key = decryptKey;
                    question = 'Decrypt the ciphertext using RSA cipher.';
                    answer = plaintext;
                }
                break;

            case 'running-key':
                const rkKey = this.randomKeyPhrase();
                plaintext = this.randomPhrase();
                key = rkKey;
                ciphertext = CipherEngine.runningKey(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Running Key cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Running Key cipher.';
                    answer = plaintext;
                }
                break;

            case 'railfence':
                const rails = this.randomRails();
                plaintext = this.randomPhrase();
                key = rails.toString();
                ciphertext = CipherEngine.railfence(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = `Encrypt the plaintext using Railfence cipher with ${rails} rails.`;
                    answer = ciphertext;
                } else {
                    question = `Decrypt the ciphertext using Railfence cipher with ${rails} rails.`;
                    answer = plaintext;
                }
                break;

            case 'cryptarithm':
                const cryptKey = this.randomAlphabet();
                plaintext = this.randomWord();
                key = cryptKey;
                ciphertext = CipherEngine.cryptarithm(plaintext, key, 'decrypt');
                if (mode === 'encrypt') {
                    question = 'This cipher type is for puzzles, not encryption.';
                    answer = '';
                } else {
                    question = 'Decrypt using the given substitution key.';
                    answer = plaintext;
                }
                break;

            case 'complete-columnar':
                const colKey = this.randomKeyPhrase();
                plaintext = this.randomPhrase();
                key = colKey;
                ciphertext = CipherEngine.completeColumnar(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Complete Columnar Transposition.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Complete Columnar Transposition.';
                    answer = plaintext;
                }
                break;

            case 'pollux':
                plaintext = this.randomWord();
                key = '';
                ciphertext = CipherEngine.pollux(plaintext, '', 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Pollux cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Pollux cipher.';
                    answer = plaintext;
                }
                break;

            case 'morbit':
                const morbitKey = this.randomMorbitKey();
                plaintext = this.randomWord();
                key = morbitKey;
                ciphertext = CipherEngine.morbit(plaintext, key, 'encrypt');
                if (mode === 'encrypt') {
                    question = 'Encrypt the plaintext using Morbit cipher.';
                    answer = ciphertext;
                } else {
                    question = 'Decrypt the ciphertext using Morbit cipher.';
                    answer = plaintext;
                }
                break;

            default:
                return null;
        }

        // Validate that we have a valid answer
        if (!answer || answer.includes('must') || answer.includes('Error') || answer.includes('not found')) {
            if (retryCount < 5) {
                return this.generateQuestion(cipherType, retryCount + 1);
            }
            return null;
        }

        return {
            question,
            key,
            plaintext: plaintext, // Store both for solving process
            ciphertext: ciphertext, // Store both for solving process
            answer: answer.toUpperCase().replace(/\s+/g, ' ').trim(),
            mode
        };
    }
}

