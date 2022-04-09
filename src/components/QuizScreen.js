import React, { useState, useEffect } from "react";
import QuizResult from "./QuizResult";
import Question from "./Question.js";
//import QuestionList from "./questions.json";
import axios from "axios";

function QuizScreen({retry, QuestionList}){        
    
    const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
    const [markedAnswers, setmarkedAnswers] = useState(new Array(QuestionList.length/10));
    const isQuestionEnd = currentQuestionIndex === QuestionList.length/10;
    
    
    function calculcateResult(){
        let correct = 0;
        QuestionList.forEach((question,index)=>{
            // if(markedAnswers.indexOf(question) != -1){
            //     correct++;
            // }
            console.log(question.correct_answer)
            console.log(question.incorrect_answers[markedAnswers[index]])
            if(question.correct_answer == question.incorrect_answers[markedAnswers[index]]){
                correct++;
            }
        });
        return {
            total: QuestionList.length/10,
            correct: correct,
            percentage: Math.trunc((correct/(QuestionList.length/10))*100)
        };
    }
    return (
        <div className="quiz-screen">
            {
                isQuestionEnd ? (
                    <QuizResult 
                    result = {calculcateResult()}
                    retry = {retry}
                    />
                ) : (
                    <Question 
                        question = {QuestionList[currentQuestionIndex]}
                        totalQuestions = {QuestionList.length/10}
                        currentQuestion = {currentQuestionIndex + 1}
                        setAnswer = {(index)=>{
                            setmarkedAnswers((arr)=>{
                                let newArr = [...arr];
                                newArr[currentQuestionIndex-1] = index;
                                return newArr;
                            });
                            setcurrentQuestionIndex(currentQuestionIndex + 1);
                        }}
                        />
                )
            }
        </div>
    );
}

export default QuizScreen;