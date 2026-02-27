
export const quiz = {
    id: 101,
    questions: [
        {
            id: 1,
            question: "What is the color of Cat?",
            options: [
                { id: 1, value: "Black" },
                { id: 2, value: "Blue" },
                { id: 3, value: "White" },
                { id: 4, value: "Brown" }
            ]
            , answer: 1
        },
        {
            id: 2,
            question: "Which planet is known as the Red Planet?",
            options: [
                { id: 1, value: "Mars" },
                { id: 2, value: "Venus" },
                { id: 3, value: "Jupiter" },
                { id: 4, value: "Saturn" }
            ]
            , answer: 1
        },
        {
            id: 3,
            question: "What is the capital of France?",
            options: [
                { id: 1, value: "Paris" },
                { id: 2, value: "London" },
                { id: 3, value: "Berlin" },
                { id: 4, value: "Madrid" }
            ],
            answer: 1
        },
        {
            id: 4,
            question: "Which element has the chemical symbol 'O'?",
            options: [
                { id: 1, value: "Oxygen" },
                { id: 2, value: "Gold" },
                { id: 3, value: "Silver" },
                { id: 4, value: "Hydrogen" }
            ],
            answer: 1
        },
        {
            id: 5,
            question: "What is the largest ocean on Earth?",
            options: [
                { id: 1, value: "Pacific Ocean" },
                { id: 2, value: "Atlantic Ocean" },
                { id: 3, value: "Indian Ocean" },
                { id: 4, value: "Arctic Ocean" }
            ],
            answer: 1
        }
    ]
};


export const quizParticipant = {
    quizId: 123,
    patternId: 432,
    userId: 133,
    answers: [
        {
            queId: 1,
            ansId: 2,
        },
        {
            queId: 2,
            ansId: 1,
        }
    ]
};




export const randomizedQuiz = {
    "id": 101,
    "questionOrder": [
        1,
        5,
        4,
        2,
        3
    ],
    "optionOrder": {
        "1": [
            2,
            1,
            4,
            3
        ],
        "2": [
            2,
            4,
            3,
            1
        ],
        "3": [
            1,
            2,
            4,
            3
        ],
        "4": [
            1,
            2,
            3,
            4
        ],
        "5": [
            1,
            3,
            2,
            4
        ]
    },
    "answers": [
        1,
        0,
        0,
        3,
        0
    ]
}




/**
 * Evaluates a quiz participant's answers against the shuffled quiz skeleton.
 * @param {Object} quizParticipant - The participant's answers object
 * @param {Object} shuffledQuizSkeleton - The quiz skeleton with answers (indices)
 * @returns {Object} - { totalQuestions, attemptedQuestions, totalMarks, percentage, averageScore }
 */
export function evaluateQuiz(quizParticipant, shuffledQuizSkeleton) {
    const totalQuestions = shuffledQuizSkeleton.questionOrder.length;
    let attemptedQuestions = 0;
    let totalMarks = 0;

    // Map queId to answer index in skeleton
    const queIdToIndex = {};
    shuffledQuizSkeleton.questionOrder.forEach((qid, idx) => {
        queIdToIndex[qid] = idx;
    });

    // Build a map of participant answers for quick lookup
    const participantAnswers = {};
    quizParticipant.answers.forEach(ans => {
        participantAnswers[ans.queId] = ans.ansId;
    });

    shuffledQuizSkeleton.questionOrder.forEach((qid, idx) => {
        const userAnsId = participantAnswers[qid];
        if (userAnsId !== undefined && userAnsId !== null) {
            attemptedQuestions++;
            // Get the correct answer index for this question
            const correctIndex = shuffledQuizSkeleton.answers[idx];
            // Get the shuffled optionOrder for this question
            const shuffledOptions = shuffledQuizSkeleton.optionOrder[qid];
            // Find the user's selected index in the shuffled options
            const userIndex = shuffledOptions.indexOf(userAnsId);
            if (userIndex === correctIndex) {
                totalMarks++;
            }
        }
    });

    const percentage = totalQuestions > 0 ? (totalMarks / totalQuestions) * 100 : 0;
    const averageScore = totalQuestions > 0 ? totalMarks / totalQuestions : 0;

    return {
        totalQuestions,
        attemptedQuestions,
        totalMarks,
        percentage,
        averageScore
    };
}
// shaffledQuizContrucotr.js

/**
 * Constructs a quiz object in shuffled order for presentation to the user.
 * @param {Object} quiz - The original quiz object
 * @param {Object} shuffledQuiz - The shuffledQuiz mapping (questionOrder, optionOrder)
 * @returns {Object} constructedQuiz - Quiz with questions and options in shuffled order
 */
export function getShuffledQuiz(quiz, shuffledQuiz) {
    // Map questions by ID for quick lookup
    const questionMap = {};
    quiz.questions.forEach(q => {
        questionMap[q.id] = q;
    });

    // Build shuffled questions
    const questions = shuffledQuiz.questionOrder.map(qid => {
        const original = questionMap[qid];
        // Map options by ID
        const optionMap = {};
        original.options.forEach(opt => {
            optionMap[opt.id] = opt;
        });
        // Build shuffled options
        const options = shuffledQuiz.optionOrder[qid].map(optId => optionMap[optId]);
        // Find the new answer index
        const answerIndex = shuffledQuiz.optionOrder[qid].indexOf(original.answer);
        return {
            id: original.id,
            question: original.question,
            options,
            answer: answerIndex
        };
    });

    return {
        id: quiz.id,
        questions
    };
}

// shuffledQuizGenerator.js

/**
 * Returns a shuffledQuiz mapping for the given quiz object.
 * The mapping contains shuffled question IDs and shuffled option IDs for each question.
 * @param {Object} quiz - The original quiz object
 * @returns {Object} shuffledQuiz
 */
export function getShuffledQuizSkeleton(quiz) {
    // Helper to shuffle an array
    function shuffle(array) {
        const arr = array.slice();
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }

    // Shuffle question IDs
    const questionOrder = shuffle(quiz.questions.map(q => q.id));

    // Shuffle option IDs for each question
    const optionOrder = {};
    quiz.questions.forEach(q => {
        optionOrder[q.id] = shuffle(q.options.map(opt => opt.id));
    });

    // Build answers array: for each question in questionOrder, find the index of the correct answer in the shuffled optionOrder
    const answers = questionOrder.map(qid => {
        const question = quiz.questions.find(q => q.id === qid);
        if (!question) return null;
        const shuffledOptions = optionOrder[qid];
        // Find the index in shuffledOptions where optionId === question.answer
        return shuffledOptions.indexOf(question.answer);
    });

    return {
        id: quiz.id,
        questionOrder,
        optionOrder,
        answers
    };
}