"use client";

import { useEffect, useState } from "react";
import QuizFooter from "./QuizFooter";
import QuizHeader from "./QuizHeader";
import QuizQuestion from "./QuizQuestion";
import QuizResult from "./QuizResult";
import { getQuizzesByTopic, submitQuiz } from "@/services/quizService";
import { useParams } from "next/navigation";

export default function QuizPage() {
  const [quizzes, setQuizzes] = useState([]);
  const [current, setCurrent] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState({});
  const { subjects, topics } = useParams();

  // Fetch quizzes when params change
  useEffect(() => {
    const handleFetchQuizzes = async () => {
      if (!subjects || !topics) return;
      try {
        const res = await getQuizzesByTopic(subjects, topics);
        setQuizzes(res.data);
        setCurrent(0);
        setSelected({});
        setShowResult(false);
      } catch (error) {
        console.error("Failed to handle quizzes:", error);
        setQuizzes([]);
      }
    };

    handleFetchQuizzes();
  }, [subjects, topics]);

  const handleAnswer = (id, answer) => {
    if (selected[id]) return;
    setSelected((prev) => ({ ...prev, [id]: answer }));
  };

  const prepareQuizData = () => {
    if (quizzes.length === 0) return null;
    const answers = quizzes.map((quiz) => ({
      quiz_id: quiz.id,
      answer: selected[quiz.id] || null,
    }));
    return { answers };
  };

  const nextQuestion = () => {
    setCurrent(current + 1);
  };

  const handleSubmit = async () => {
    const data = prepareQuizData();
    if (!data) return console.error("No quizzes or missing selected answer.");
    try {
      const response = await submitQuiz(subjects, topics, data);
      setShowResult(true);
    } catch (e) {
      console.error("Failed to submit quiz:", e);
    }
  };

  if (!quizzes.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-between items-center">
      {!showResult ? (
        <>
          <QuizHeader />
          <QuizQuestion
            quiz={quizzes[current]}
            selected={selected}
            handleAnswer={handleAnswer}
            nextQuestion={nextQuestion}
          />
          <QuizFooter
            current={current}
            total={quizzes.length}
            nextQuestion={nextQuestion}
            onSubmit={handleSubmit}
            currentQuizId={quizzes[current]?.id}
            selected={selected}
            index={current}
          />
        </>
      ) : (
        <QuizResult slug={subjects} quizzes={quizzes} selected={selected} />
      )}
    </div>
  );
}
