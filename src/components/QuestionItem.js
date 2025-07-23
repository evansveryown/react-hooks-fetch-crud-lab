import React from "react";

function QuestionItem({ question, onDelete, onUpdate }) {
  const { id, prompt, answers, correctIndex } = question;

  function handleDeleteClick() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    }).then(() => onDelete(id));
  }

  function handleChangeCorrectIndex(e) {
  const updatedIndex = parseInt(e.target.value);

  // Immediately update the parent state for test and UI to reflect
  onUpdate({ ...question, correctIndex: updatedIndex });

  // Then make the PATCH request in the background
  fetch(`http://localhost:4000/questions/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ correctIndex: updatedIndex }),
  })
    .then((r) => r.json())
    .catch((err) => console.error("Failed to update:", err));
}



  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>{prompt}</h4>
      <label>
        Correct Answer:
        <select value={String(correctIndex)} onChange={handleChangeCorrectIndex}>

          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
