"use client";

import { useState } from "react";
import { evaluateQuiz } from "@/util/quizUtil";

export default function QuizForm({ shuffledQuiz, randomizedQuizSkeleton }) {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  function handleChange(qid, ansId) {
    setAnswers((prev) => ({ ...prev, [qid]: ansId }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const participant = {
      quizId: randomizedQuizSkeleton.id,
      patternId: randomizedQuizSkeleton.id,
      userId: 0,
      answers: Object.entries(answers).map(([qid, ansId]) => ({
        queId: parseInt(qid, 10),
        ansId: parseInt(ansId, 10),
      })),
    };

    const evaluation = evaluateQuiz(participant, randomizedQuizSkeleton);
    
    setResult({ participant, evaluation });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {shuffledQuiz.questions.map((q) => (
          <div key={q.id} className="mb-4">
            <p className="font-semibold">{q.question}</p>
            {q.options.map((opt) => (
              <label key={opt.id} className="flex items-center gap-2">
                <input
                  type="radio"
                  name={`q_${q.id}`}
                  value={opt.id}
                  checked={answers[q.id] === opt.id}
                  onChange={() => handleChange(q.id, opt.id)}
                />
                {opt.value}
              </label>
            ))}
          </div>
        ))}
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {result && (
        <div className="mt-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg shadow-lg border-2 border-blue-200">
          <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">Quiz Results</h2>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Total Questions</p>
              <p className="text-3xl font-bold text-blue-600">{result.evaluation.totalQuestions}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Attempted</p>
              <p className="text-3xl font-bold text-indigo-600">{result.evaluation.attemptedQuestions}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Correct Answers</p>
              <p className="text-3xl font-bold text-green-600">{result.evaluation.totalMarks}</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <p className="text-gray-600 text-sm">Score</p>
              <p className="text-3xl font-bold text-purple-600">{result.evaluation.percentage.toFixed(2)}%</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow text-center">
            <p className="text-gray-600 mb-2">Average Score</p>
            <p className="text-2xl font-bold text-blue-900">{(result.evaluation.averageScore * 100).toFixed(2)}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
