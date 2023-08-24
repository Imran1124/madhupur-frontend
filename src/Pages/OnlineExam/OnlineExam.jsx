import React, { useEffect, useState } from 'react';

const OnlineExam = () => {
  const [showResults, setShowResults] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [data, setData] = useState(false);
  const [id, setId] = useState('');
  const handleOnClick = (index) => {
    setCurrentQuestion(index);
  };
  const subject=[
    {
      id:1,
      subject_name:"English"
    },
    {
      id:2,
      subject_name:"Math"
    }
  ]
  const questions = [
    {
      id: 1,
      text: 'What is the capital of India?',
      options: [
        { id: 0, text: 'New Delhi', isCorrect: true },
        { id: 1, text: 'Kolkata', isCorrect: false },
        { id: 2, text: 'Jharkhand', isCorrect: false },
        { id: 3, text: 'Bihar', isCorrect: false }
      ]
    },
    {
      id: 2,
      text: 'What is the capital of west bengal?',
      options: [
        { id: 0, text: 'Bihar', isCorrect: false },
        { id: 1, text: 'Kolkata', isCorrect: true },
        { id: 2, text: 'Amrawati', isCorrect: false },
        { id: 3, text: 'Bangaluru', isCorrect: false }
      ]
    },
    {
      id: 3,
      text: 'Who was the first president of the India?',
      options: [
        { id: 0, text: 'Prativa Sing Patil', isCorrect: false },
        { id: 1, text: 'Dr. Sarwapalli Radha Krishnan', isCorrect: false },
        { id: 2, text: 'Ram Nath Kovind', isCorrect: false },
        { id: 3, text: 'Rajendra Prasad', isCorrect: true }
      ]
    },
    {
      id: 4,
      text: 'What is the largest state in the India?',
      options: [
        { id: 0, text: 'Rajasthan', isCorrect: true },
        { id: 1, text: 'Amrawati', isCorrect: false },
        { id: 2, text: 'Uttar Pradesh', isCorrect: false },
        { id: 3, text: 'Jharkhand', isCorrect: false }
      ]
    },
    {
      id: 5,
      text: 'How many states in India?',
      options: [
        { id: 0, text: '25', isCorrect: false },
        { id: 1, text: '28', isCorrect: true },
        { id: 2, text: '27', isCorrect: false },
        { id: 3, text: '30', isCorrect: false }
      ]
    },
    {
      id: 6,
      text: 'Who was the first man to step on the moon?',
      options: [
        { id: 0, text: 'Thomas Edition', isCorrect: false },
        { id: 1, text: 'Neil Armstrong', isCorrect: true },
        { id: 2, text: 'Glenn Maxewell', isCorrect: false },
        { id: 3, text: 'Jhon Doe', isCorrect: false }
      ]
    },
    {
      id: 7,
      text: 'Which city is also known as ‘Pink City’?',
      options: [
        { id: 0, text: 'Kashmir', isCorrect: false },
        { id: 1, text: 'Hyderabad', isCorrect: false },
        { id: 2, text: 'Jaipur ', isCorrect: true },
        { id: 3, text: 'Manipur', isCorrect: false }
      ]
    },
    {
      id: 8,
      text: 'Which city is also known as ‘Pink City’?',
      options: [
        { id: 0, text: 'Kashmir', isCorrect: false },
        { id: 1, text: 'Hyderabad', isCorrect: false },
        { id: 2, text: 'Jaipur ', isCorrect: true },
        { id: 3, text: 'Manipur', isCorrect: false }
      ]
    },
    {
      id: 9,
      text: ' Which is the smallest state of India?',
      options: [
        { id: 0, text: 'Chattisgarg', isCorrect: false },
        { id: 1, text: 'Assam', isCorrect: false },
        { id: 2, text: 'Goa ', isCorrect: true },
        { id: 3, text: 'Chennai', isCorrect: false }
      ]
    },
    {
      id: 10,
      text: " It is also called 'the ship of the desert'?",
      options: [
        { id: 0, text: 'Lion', isCorrect: false },
        { id: 1, text: 'Elephant', isCorrect: false },
        { id: 2, text: 'Camel ', isCorrect: true },
        { id: 3, text: 'Tiger', isCorrect: false }
      ]
    }
  ];
  useEffect(() => {
    setData(false);
  }, [currentQuestion]);
  const optionClicked = (ids, isCorrect) => {
    setData(true);
    setId(ids);
    // Increment the score
    if (isCorrect) {
      setScore(score + 1);
    }
  };
  const next = (currentQuestion) => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResults(true);
    }
  };
  const previous = (currentQuestion) => {
    if (currentQuestion < questions.length) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
  console.log(data)
  return (
    <>
      <div className="flex  justify-center mt-[10vh]  flex-wrap">
        {/* <div>
          <h1 className="text-6xl font-semibold text-[#082f49] py-4">
            Entrance Exam
          </h1>
          <hr className="w-[99vw] " />
        </div> */}
      
        <div className="block w-[70%] border border-teal-700 shadow-md m-4 max-[1575px]:flex-wrap">
          <div className='text-white bg-teal-700 w-full py-2 text-[2vh]'>Online Entrance Exam</div>
        <div className='w-full flex items-center justify-between '>  
      <div className="w-[35vh] p-10">
                <select
                  type="text"
                  className={`form-control border border-teal-700 h-10 block bg-white w-full px-3 2xl:py-1.5 py-1 2xl:text-base text-sm font-normal text-gray-700  bg-clip-padding  rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none placeholder-gray-300 shadow-md cursor-pointer`}
                  placeholder="Select subject"
                >
                  <option value="">Select Subject</option>
                  {subject?.map((data, index) => (
                    <option value={data?.id}>{data?.subject_name}</option>
                  ))}
                </select>
                
              </div>
              </div>
          <div className="flex  w-[50vw] ">
            <div
              // style={{ display: activeDiv === index ? "block" : "none" }}
              className="ml-10 pb-10 flex items-center justify-center"
            >
              <div className="block">
                <h1 className="text-[2vh] font-semibold text-[#0F766E] flex items-start justify-start">
                  Q{questions[currentQuestion].id}.{' '}
                  {questions[currentQuestion].text}
                </h1>
                {questions[currentQuestion].options.map((option) => {
                  return (
                    <div className="flex gap-x-3 mt-5 ml-2 ">
                      <div key={option.id}>
                        {' '}
                        <input
                          type="radio"
                          name="selectedOption"
                          checked={data && option.id === id}
                          onChange={() =>
                            optionClicked(option.id, option.isCorrect)
                          }
                          className="h-[2.5vh] w-[2vh] mt-1 ml-[2vh]"
                        />
                      </div>
                      <div className="text-[2vh] font-semibold  text-black ">
                        {' '}
                        <p> {option.text}</p>
                      </div>
                    </div>
                  );
                })}
                <div
                  className={
                      // ? 'flex items-end justify-end gap-x-4 mt-8 w-full max-[801px]:justify-center'
                       'flex  mt-8 w-[30vw]'
                  }
                >
                  <button
                    type="submit"
                    className={
                      currentQuestion === 0
                        ? 'hidden'
                        : 'bg-white text-indigo-600 flex items-start justify-start mx-10 border-indigo-600 border px-3 py-2 rounded-lg hover:text-white text-[2vh] hover:bg-indigo-600'
                    }
                    onClick={() => previous(currentQuestion)}
                    disabled={currentQuestion <= 0}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-white text-[#0F766E] flex items-end justify-end ml-10 border-[#0F766E] border px-8 py-2 rounded-lg hover:text-white text-[2vh] hover:bg-[#0F766E]"
                    onClick={() => next(currentQuestion)}
                  >
                    {currentQuestion === questions?.length - 1
                      ? 'Finish'
                      : 'Next'}
                  </button>
                </div>
                {/* <h1>{score}/{questions.length}</h1> */}
              </div>
            </div>
          </div>
          
        </div>
        <div className=" flex items-start justify-end w-[20%] h-auto border border-teal-700  my-4 max-[1400px]:w-full ">
            <div className="  max-[1575px]:w-full max-[1400px]:ml-[20px]  h-auto   rounded-[5px]">
              <h1 className="text-white bg-teal-700 w-full py-2 text-[2vh]">Select Question</h1>
              <div className="flex flex-wrap justify-start gap-x-2 items-start m-4 px-2">
                {questions.map((eachData, index) => {
                  return (
                    <button
                      onClick={() => handleOnClick(eachData.id - 1)}
                      className={eachData?.id>=currentQuestion+1 ?  "rounded-full bg-gray-300  text-black px-5 py-3 my-4" : "rounded-full bg-[#0F766E]  text-white px-5 py-3 my-4"}
                    >
                      {eachData?.id}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
      </div>
    </>
  );
};

export default OnlineExam;
