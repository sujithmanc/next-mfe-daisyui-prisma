import { quiz, randomizedQuiz, getShuffledQuiz, getShuffledQuizSkeleton } from "@/util/quizUtil";
import QuizForm from "@/components/QuizForm";
import QuizService from "@/lib/quiz-service";

// load a Telugu font from Google Fonts
import { Noto_Sans_Telugu } from 'next/font/google';

const teluguFont = Noto_Sans_Telugu({
  weight: ['400','700'],
  subsets: ['telugu'],
});

export default async function QuizPage() {
    // build a shuffled version of the quiz on the server
    const q = await QuizService.getQuizById(1); // <-- this is just to demonstrate fetching the quiz data. You can replace it with actual logic to fetch the quiz you want to display.
    const quizData = {
        id: q.id,
        questions: q.data,
        lang: "telugu"
    } // assuming the quiz JSON is stored in the 'data' field of the database record
    const randomizedQuizSkeleton = getShuffledQuizSkeleton(quizData);
    const sq = getShuffledQuiz(quizData, randomizedQuizSkeleton);

    const shuffledQuiz = {
        id: sq.id,
        questions: sq.questions,
        lang: 'telugu'
    };

    return (
        <div className={`${shuffledQuiz.lang === 'telugu' ? teluguFont.className : ''} p-4`}>
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
            <QuizForm shuffledQuiz={shuffledQuiz} randomizedQuizSkeleton={randomizedQuizSkeleton} />
        </div>
    );
}
