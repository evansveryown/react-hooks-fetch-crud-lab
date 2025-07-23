import React, { useState, useEffect } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([]);

  // Fetch questions when app loads
  useEffect(() => {
    fetch("http://localhost:4000/questions")
      .then((r) => r.json())
      .then(setQuestions);
  }, []);

  // Add new question to state
  function handleAddQuestion(newQuestion) {
    setQuestions([...questions, newQuestion]);
  }

  // Delete question from state
  function handleDeleteQuestion(deletedId) {
    const updated = questions.filter((q) => q.id !== deletedId);
    setQuestions(updated);
  }

  // Update correctIndex in state
  function handleUpdateQuestion(updatedQuestion) {
  const updated = questions.map((q) =>
    q.id === updatedQuestion.id ? updatedQuestion : q
  );
  setQuestions(updated);
}


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm onAddQuestion={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onUpdateQuestion={handleUpdateQuestion}
        />
      )}
    </main>
  );
}

export default App;
