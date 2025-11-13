// Main application logic for Practice Mode

const cipherNames = {
    'atbash': 'AtBash Cipher',
    'caesar': 'Caesar Cipher',
    'aristocrat': 'Aristocrat Cipher',
    'aristocrat-misspelled': 'Aristocrat Misspelled',
    'patristocrat': 'Patristocrat Cipher',
    'xenocrypt': 'Xenocrypt Cipher',
    'hill-2x2': 'Hill 2x2 Cipher',
    'hill-3x3': 'Hill 3x3 Cipher',
    'affine': 'Affine Cipher',
    'baconian': 'Baconian Cipher',
    'fractionated-morse': 'Fractionated Morse Cipher',
    'porta': 'Porta Cipher',
    'dancing-men': 'Dancing Men Cipher',
    'rsa': 'RSA Cipher',
    'running-key': 'Running Key Cipher',
    'railfence': 'Railfence Cipher',
    'cryptarithm': 'Cryptarithm',
    'complete-columnar': 'Complete Columnar Transposition',
    'pollux': 'Pollux Cipher',
    'morbit': 'Morbit Cipher'
};

let currentCipher = null;
let currentQuestion = null;
let questionNumber = 0;
let stats = {
    solved: 0,
    streak: 0,
    total: 0
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Home screen elements
    const homeScreen = document.getElementById('home-screen');
    const practiceScreen = document.getElementById('practice-screen');
    const cipherCards = document.querySelectorAll('.cipher-card');
    const backBtn = document.getElementById('back-btn');

    // Practice screen elements
    const practiceCipherName = document.getElementById('practice-cipher-name');
    const questionNum = document.getElementById('question-num');
    const questionType = document.getElementById('question-type');
    const questionDescription = document.getElementById('question-description');
    const givenKey = document.getElementById('given-key');
    const givenPlaintext = document.getElementById('given-plaintext');
    const givenCiphertext = document.getElementById('given-ciphertext');
    const keyBox = document.getElementById('key-box');
    const plaintextBox = document.getElementById('plaintext-box');
    const ciphertextBox = document.getElementById('ciphertext-box');
    const userAnswer = document.getElementById('user-answer');
    const checkAnswerBtn = document.getElementById('check-answer-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');
    const answerFeedback = document.getElementById('answer-feedback');
    const solvingProcess = document.getElementById('solving-process');
    const solvedCount = document.getElementById('solved-count');
    const streakCount = document.getElementById('streak-count');
    const totalCount = document.getElementById('total-count');

    // Navigate to practice screen
    function goToPractice(cipherType) {
        currentCipher = cipherType;
        questionNumber = 0;
        stats.solved = 0;
        stats.streak = 0;
        stats.total = 0;
        
        practiceCipherName.textContent = `🔐 ${cipherNames[cipherType]}`;
        homeScreen.classList.remove('active');
        practiceScreen.classList.add('active');
        
        loadNewQuestion();
        updateStats();
    }

    // Navigate back to home
    function goToHome() {
        homeScreen.classList.add('active');
        practiceScreen.classList.remove('active');
        currentCipher = null;
        currentQuestion = null;
        userAnswer.value = '';
        answerFeedback.className = 'answer-feedback';
        answerFeedback.style.display = 'none';
        nextQuestionBtn.style.display = 'none';
    }

    // Load a new question
    function loadNewQuestion() {
        if (!currentCipher) return;

        questionNumber++;
        currentQuestion = QuestionGenerator.generateQuestion(currentCipher);
        
        if (!currentQuestion) {
            answerFeedback.textContent = 'Error generating question. Please try again.';
            answerFeedback.className = 'answer-feedback incorrect';
            answerFeedback.style.display = 'block';
            return;
        }

        // Update question number
        questionNum.textContent = questionNumber;

        // Update question type and description
        questionType.textContent = currentQuestion.mode === 'encrypt' ? 'ENCRYPT' : 'DECRYPT';
        questionDescription.textContent = currentQuestion.question;

        // Show/hide given information
        if (currentQuestion.key) {
            givenKey.textContent = currentQuestion.key;
            keyBox.style.display = 'block';
        } else {
            keyBox.style.display = 'none';
        }

        if (currentQuestion.plaintext) {
            givenPlaintext.textContent = currentQuestion.plaintext;
            plaintextBox.style.display = 'block';
        } else {
            plaintextBox.style.display = 'none';
        }

        if (currentQuestion.ciphertext) {
            givenCiphertext.textContent = currentQuestion.ciphertext;
            ciphertextBox.style.display = 'block';
        } else {
            ciphertextBox.style.display = 'none';
        }

        // Clear previous answer and feedback
        userAnswer.value = '';
        answerFeedback.className = 'answer-feedback';
        answerFeedback.style.display = 'none';
        solvingProcess.classList.remove('active');
        solvingProcess.innerHTML = '';
        nextQuestionBtn.classList.add('hidden');
        checkAnswerBtn.disabled = false;
    }

    // Check answer
    function checkAnswer() {
        if (!currentQuestion) return;

        const userAnswerText = userAnswer.value.trim().toUpperCase().replace(/\s+/g, ' ');
        const correctAnswer = currentQuestion.answer.trim().toUpperCase().replace(/\s+/g, ' ');

        stats.total++;

        // Generate and show solving process
        const process = SolvingProcess.generateProcess(
            currentCipher,
            currentQuestion.question,
            currentQuestion.key,
            currentQuestion.plaintext || '',
            currentQuestion.ciphertext || '',
            currentQuestion.mode
        );
        solvingProcess.innerHTML = process;
        solvingProcess.classList.add('active');

        // Compare answers (case-insensitive, normalize spaces)
        const userClean = userAnswerText.replace(/\s+/g, '');
        const correctClean = correctAnswer.replace(/\s+/g, '');

        if (userClean === correctClean) {
            stats.solved++;
            stats.streak++;
            answerFeedback.textContent = '✓ Correct! Well done!';
            answerFeedback.className = 'answer-feedback correct';
            answerFeedback.style.display = 'block';
            checkAnswerBtn.disabled = true;
        } else {
            stats.streak = 0;
            answerFeedback.textContent = `✗ Incorrect. The correct answer is: ${correctAnswer}`;
            answerFeedback.className = 'answer-feedback incorrect';
            answerFeedback.style.display = 'block';
        }
        
        // Always show next question button after checking
        nextQuestionBtn.classList.remove('hidden');

        updateStats();
    }

    // Update statistics display
    function updateStats() {
        solvedCount.textContent = stats.solved;
        streakCount.textContent = stats.streak;
        totalCount.textContent = stats.total;
    }

    // Event listeners
    cipherCards.forEach(card => {
        card.addEventListener('click', () => {
            const cipherType = card.getAttribute('data-cipher');
            goToPractice(cipherType);
        });
    });

    backBtn.addEventListener('click', goToHome);

    checkAnswerBtn.addEventListener('click', checkAnswer);

    nextQuestionBtn.addEventListener('click', () => {
        loadNewQuestion();
    });

    // Allow Enter key to check answer
    userAnswer.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            checkAnswer();
        }
    });
});
