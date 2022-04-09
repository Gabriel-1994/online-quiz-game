import React, { useState, useEffect, useRef } from "react";
import {flushSync} from "react-dom";

function Question({question,totalQuestions,currentQuestion,setAnswer}){
    const [selectedOption, setselectedOption] = useState(null);
    const timer = useRef(null);
    const progressBar = useRef(null);
    

    function goToNextQuestion(){
        if(timer.current){
            clearTimeout(timer.current);
        }
        flushSync(()=>{
            setAnswer(selectedOption);
        });
        setselectedOption(null);
    }
    
    useEffect(()=>{                
        progressBar.current.classList.remove("active");
        setTimeout(()=>{
            progressBar.current.classList.add("active");
        },0);
        timer.current = setTimeout(goToNextQuestion, 10*1000);                
    },[question]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className="question">
            <div className="progress-bar" ref={progressBar}></div>
            <div className="question-count">
                <b> {currentQuestion} </b>
                of
                <b> {totalQuestions} </b>
            </div>
            <div className="main">
                <div className="title">
                    <span>Question:</span>
                    <p>{question.question}</p>
                </div>
                <div className="options">
                    {
                        question.incorrect_answers.map((option,index)=>{
                            return (
                                <div className={index===selectedOption ? "option active" : "option"}
                                key={index}
                                onClick={()=>setselectedOption(index)}
                                >
                                    {option}
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="control">
                <button onClick={goToNextQuestion}>Next</button>
            </div>
        </div>
    )
}

export default Question;