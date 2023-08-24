import React, { useEffect, useState } from "react";
import "./App.css";

function Index() {
  // Properties
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const[data,setData]=useState(false)
  const[id,setId]=useState("")

  const questions = [
    {
      text: "What is the capital of India?",
      options: [
        { id: 0, text: "New Delhi", isCorrect: true },
        { id: 1, text: "Kolkata", isCorrect: false },
        { id: 2, text: "Jharkhand", isCorrect: false },
        { id: 3, text: "Bihar", isCorrect: false },
      ],
    },
    {
      text: "What is the capital of west bengal?",
      options: [
        { id: 0, text: "Bihar", isCorrect: false },
        { id: 1, text: "Kolkata", isCorrect: true },
        { id: 2, text: "Amrawati", isCorrect: false },
        { id: 3, text: "Bangaluru", isCorrect: false },
      ],
    },
    {
      text: "Who was the first president of the India?",
      options: [
        { id: 0, text: "Prativa Sing Patil", isCorrect: false },
        { id: 1, text: "Dr. Sarwapalli Radha Krishnan", isCorrect: false },
        { id: 2, text: "Ram Nath Kovind", isCorrect: false },
        { id: 3, text: "Rajendra Prasad", isCorrect: true },
      ],
    },
    {
      text: "What is the largest state in the India?",
      options: [
        { id: 0, text: "Rajasthan", isCorrect: true },
        { id: 1, text: "Amrawati", isCorrect: false },
        { id: 2, text: "Uttar Pradesh", isCorrect: false },
        { id: 3, text: "Jharkhand", isCorrect: false },
      ],
    },
    {
      text: "How many states in India?",
      options: [
        { id: 0, text: "25", isCorrect: false },
        { id: 1, text: "28", isCorrect: true },
        { id: 2, text: "27", isCorrect: false },
        { id: 3, text: "30", isCorrect: false },
      ],
    },
    {
      text: "Who was the first man to step on the moon?",
      options: [
        { id: 0, text: "Thomas Edition", isCorrect: false },
        { id: 1, text: "Neil Armstrong", isCorrect: true },
        { id: 2, text: "Glenn Maxewell", isCorrect: false },
        { id: 3, text: "Jhon Doe", isCorrect: false },
      ],
    },
    {
      text: "Which city is also known as ‘Pink City’?",
      options: [
        { id: 0, text: "Kashmir", isCorrect: false },
        { id: 1, text: "Hyderabad", isCorrect: false },
        { id: 2, text: "Jaipur ", isCorrect: true  },
        { id: 3, text: "Manipur", isCorrect: false },
      ],
    },
    {
      text: "Which city is also known as ‘Pink City’?",
      options: [
        { id: 0, text: "Kashmir", isCorrect: false },
        { id: 1, text: "Hyderabad", isCorrect: false },
        { id: 2, text: "Jaipur ", isCorrect: true  },
        { id: 3, text: "Manipur", isCorrect: false },
      ],
    },
    {
      text: " Which is the smallest state of India?",
      options: [
        { id: 0, text: "Chattisgarg", isCorrect: false },
        { id: 1, text: "Assam", isCorrect: false },
        { id: 2, text: "Goa ", isCorrect: true  },
        { id: 3, text: "Chennai", isCorrect: false },
      ],
    },
    {
      text: " It is also called 'the ship of the desert'?",
      options: [
        { id: 0, text: "Lion", isCorrect: false },
        { id: 1, text: "Elephant", isCorrect: false },
        { id: 2, text: "Camel ", isCorrect: true  },
        { id: 3, text: "Tiger", isCorrect: false },
      ],
    },
  ];

  // Helper Functions
useEffect(()=>{
setData(false)
},[currentQuestion])
  /* A possible answer was clicked */
  const optionClicked = (ids,isCorrect) => {
setData(true)
setId(ids)
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }


  };
const next=(currentQuestion)=>{
  if (currentQuestion + 1 < questions.length) {
    setCurrentQuestion(currentQuestion + 1);
  } else {
    setShowResults(true);
  }
}
const previous=(currentQuestion)=>{
  if(currentQuestion<questions.length){
    setCurrentQuestion(currentQuestion - 1);
  }
}
  /* Resets the game back to default */
  const restartGame = () => {
    setScore(0);
    setCurrentQuestion(0);
    setShowResults(false);
  };

  return (
    <div className="text-center bg-gradient-to-b from-indigo-400 to-white w-full h-full py-4 ">
      {/* 1. Header  */}
<h1 className="font-bold  text-4xl text-white my-10">ONLINE TEST</h1>
<h2 className=" text-3xl text-white font-semibold my-10">MCQ QUESTION</h2>
      {/* 3. Show results or show the question game  */}
      {showResults ? 
      (
        /* 4. Final Results */
        <div className="final-results">
          <h1  className="text-[4vh] font-bold">Final Results</h1>
          {score>=4 ? (<h1 className="text-[4vh] font-bold">You have Cleared the Exam</h1>) : (<h1  className="text-[4vh] font-bold">Sorry,You have not Cleared the exam</h1>)}
          <h2  className="text-[2vh] font-bold">
            {score} out of {questions.length} correct <br/>
            Percentage - (
            {(score / questions.length) * 100}%)
          </h2>
          <button onClick={() => restartGame()} className="mt-4 text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white px-10 py-4 rounded-[10px]">Restart Exam</button>
        </div>
      ) : 
      (
        /* 5. Question Card  */
        <div className="flex items-center justify-center">
        <div className="w-[80%] h-[auto] bg-white rounded-[20px] px-[10px] shadow-xl py-10 ">
          {/* Current Question  */}
          
          <h3 className="text-[darkblue] text-2xl font-bold ">{questions[currentQuestion].text}</h3>

          {/* List of possible answers  */}
          <ul className="mt-5 px-[10%]">
            {questions[currentQuestion].options.map((option) => {
              console.log(option.isCorrect)
              return (
                <li
                  key={option.id}
                  onClick={() => optionClicked(option.id,option.isCorrect)}
                  className={data && option.id===id  ? 
                    " text-white bg-[darkblue]"
                    : "border border-[darkblue] bg-white text-[darkblue] "}
                >
                  {option.text}
                </li>
              );
            })}
          </ul>
          <div className="w-full flex items-center  justify-between px-[18vh] mt-[5vh] max-[425px]:block max-[425px]:px-0">
          <button onClick={()=>previous(currentQuestion)} disabled={currentQuestion<=0} className="text-red-600 border border-red-600 bg-white hover:bg-red-600 hover:text-white px-10 py-4 rounded-[10px] max-[768px]:mr-2">Previous</button>
      <button onClick={()=>next(currentQuestion)} className="text-indigo-600 border border-indigo-600 bg-white hover:bg-indigo-600 hover:text-white px-10 py-4 rounded-[10px]  max-[425px]:mt-2">Next</button></div>
      <h2 className="text-2xl font-bold mt-4 text-gray-600">
         {currentQuestion + 1} out of {questions.length}
      </h2>
        </div>
        </div>
        
      )}
      
    </div>
  );
}

export default Index;