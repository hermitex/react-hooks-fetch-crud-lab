import React, { useEffect, useState } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((response) => response.json())
      .then((questions) => setQuestions(questions));
  }, []);

  function onDeleteQuestion(deletedQuestion){
    let newQuestions = questions.filter(question => question.id !== deletedQuestion.id);
    setQuestions(newQuestions);
  }

  function updatedAnswer(updatedQuestion){
    let newQuestions = questions.map(question =>{
      if(question.id === updatedQuestion.id) return updatedQuestion;
      return question;
    })
    setQuestions(newQuestions);
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem key={question.id} question={question} onDeleteQuestion={onDeleteQuestion} updatedAnswer={updatedAnswer}/>
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
