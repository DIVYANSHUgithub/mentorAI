import React, { useState } from 'react';
import axios from 'axios';

function AskQuestion() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:5000/api/ask", { question });
    setAnswer(res.data.answer);
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Ask a question..." 
          value={question} 
          onChange={(e) => setQuestion(e.target.value)} 
          className="p-2 border w-full"
        />
        <button type="submit" className="mt-2 p-2 bg-blue-500 text-white">Ask</button>
      </form>
      {answer && (
        <div className="mt-4 p-2 bg-gray-100 rounded">
          <strong>Answer:</strong>
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default AskQuestion;
