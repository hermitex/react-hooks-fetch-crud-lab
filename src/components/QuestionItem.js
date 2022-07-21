import React from "react";

function QuestionItem({ question, onDeleteQuestion, updatedAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleClick(question) {
    fetch(`http://localhost:4000/questions/${question.id}`, {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
    })
      .then((response) => response.json())
      .then(() => onDeleteQuestion(question));
  }

  function handleChange(event, question) {
    let {value} = event.target;
    fetch(`http://localhost:4000/questions/${value}`, {
      method: "PATCH",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        correctIndex: +value,
      }),
    })
      .then((response) => response.json())
      .then(() => updatedAnswer(question));
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select
          defaultValue={correctIndex}
          onChange={(event) => handleChange(event, question)}
        >
          {options}
        </select>
      </label>
      <button onClick={() => handleClick(question)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
