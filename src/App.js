import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar.js";
import QuizScreen from "./components/QuizScreen.js";
import JoinScreen from "./components/JoinScreen.js";
import "./App.css";
import axios from "axios";
import request from 'request';


/*  
class LambdaDemo extends Component {
  
  constructor(props) {
    super(props)
    this.state = { loading: false, msg: null }
  }

  handleClick = api => e => {
    e.preventDefault()

    this.setState({ loading: true })
    fetch("/.netlify/functions/" + api)
      .then(response => response.json())
      .then(json => this.setState({ loading: false, msg: json.msg }))
  }

  render() {
    const { loading, msg } = this.state

    return (
      <p>
        <button onClick={this.handleClick("hello")}>{loading ? "Loading..." : "Call Lambda"}</button>
        <button onClick={this.handleClick("async-dadjoke")}>{loading ? "Loading..." : "Call Async Lambda"}</button>
        <br />
        <span>{msg}</span>
      </p>
    )
  }
}
*/


function App(){
  
  const [QuestionList, setQuestionsList] = useState(null);
  const getAllData = () => {
    axios.get(
    "https://opentdb.com/api.php?amount=100").then((response) => {
      setQuestionsList(response.data['results']);}).catch((error) => {});
    };
  
  useEffect(() => {
      getAllData();
  }, []);

  

  for (var j in QuestionList){
    if(QuestionList[j]['incorrect_answers'].indexOf(QuestionList[j]['correct_answer']) == -1) 
      QuestionList[j]['incorrect_answers'].push(QuestionList[j]['correct_answer'])
    QuestionList[j]['question'] = QuestionList[j]['question'].replace(/&quot;/g, '\"');
    QuestionList[j]['question'] = QuestionList[j]['question'].replace(/&#039;/g, '\'');
    for(var ans in QuestionList[j]['incorrect_answers']){
      QuestionList[j]['incorrect_answers'][ans] = QuestionList[j]['incorrect_answers'][ans].replace(/&quot;/g, '\"');
      QuestionList[j]['incorrect_answers'][ans] = QuestionList[j]['incorrect_answers'][ans].replace(/&#039;/g, '\'');
    }      
  }

  // for(var i in QuestionList)
  //   console.log(QuestionList[i])      
  
  const [isQuizStarted, setisQuizStarted] = useState(false);  
  return (
    <>
    <Navbar/>
    <div className="quiz-container">
      {
        isQuizStarted ? (
          <QuizScreen 
          retry={()=>setisQuizStarted(false)}
          QuestionList={QuestionList}/>
        ) : (
          <JoinScreen start={()=>setisQuizStarted(true)}/>
        )
      }
    </div>
    </>
  );
}

export default App;
