# Cipher Practice Tool

A comprehensive web application for practicing encryption and decryption with 20 different cipher algorithms.

## Features

- **Home Screen**: Choose from 20 different ciphers to practice
- **Practice Mode**: Unlimited practice questions with random keys and texts
- **Answer Checking**: Verify your solutions instantly
- **Statistics Tracking**: Track your progress, solved count, and current streak
- **Unlimited Questions**: Practice as long as you want with new questions generated each time
- **Modern UI**: Beautiful, responsive design with gradient backgrounds

## Supported Ciphers

1. **AtBash** - Simple mirror alphabet substitution
2. **Caesar** - Shift cipher with configurable shift amount
3. **Aristocrat** - Monoalphabetic substitution cipher
4. **Aristocrat Misspelled** - Same as Aristocrat (handles typos)
5. **Patristocrat** - Similar to Aristocrat with word breaks
6. **Xenocrypt** - Spanish substitution cipher (includes Ñ)
7. **Hill 2x2** - Matrix-based cipher using 2x2 matrix
8. **Hill 3x3** - Matrix-based cipher using 3x3 matrix
9. **Affine** - Linear cipher: E(x) = (ax + b) mod 26
10. **Baconian** - Binary encoding using A and B
11. **Fractionated Morse** - Morse code-based fractionation cipher
12. **Porta** - Digraphic cipher with table
13. **Dancing Men** - Visual cipher (text representation)
14. **RSA** - Public-key cipher (simplified)
15. **Running Key** - Vigenère variant with long key
16. **Railfence** - Zigzag transposition cipher
17. **Cryptarithm** - Alphametic puzzle solver
18. **Complete Columnar** - Columnar transposition cipher
19. **Pollux** - Morse code to numbers
20. **Morbit** - Morse code pairs to digits

## Usage

1. Open `index.html` in a web browser
2. **Home Screen**: Click on any cipher card to start practicing
3. **Practice Mode**: 
   - You'll be given a random question (encrypt or decrypt)
   - The question will show you the key and either plaintext (for encryption) or ciphertext (for decryption)
   - Enter your answer in the text box
   - Click "Check Answer" to verify your solution
   - If correct, click "Next Question" to continue practicing
   - Practice unlimited questions - each one is randomly generated
4. **Statistics**: Track your progress in the statistics panel on the right
5. **Navigation**: Click "Back to Home" to return to the cipher selection screen

## Key Formats

- **AtBash, Baconian, Dancing Men, Pollux**: No key required
- **Caesar**: Shift amount (0-25), e.g., "3"
- **Aristocrat variants**: 26 unique letters
- **Xenocrypt**: 27 unique letters (including Ñ)
- **Hill 2x2**: 4 numbers, e.g., "2 1 3 4"
- **Hill 3x3**: 9 numbers
- **Affine**: Two numbers "a, b" where gcd(a,26)=1
- **RSA**: "n, e" for encryption or "n, d" for decryption
- **Railfence**: Number of rails, e.g., "3"
- **Morbit**: 9 digits
- **Others**: Word or phrase

## Files

- `index.html` - Main HTML structure
- `styles.css` - Styling and layout
- `ciphers.js` - All cipher algorithm implementations
- `app.js` - Application logic and UI interactions

## Browser Compatibility

Works in all modern browsers that support ES6 JavaScript features.

## Notes

- Some ciphers (like Hill 3x3 decryption) have limitations due to complexity
- RSA implementation is simplified for educational purposes
- Text is automatically converted to uppercase for most ciphers
- Non-alphabetic characters are preserved where possible

