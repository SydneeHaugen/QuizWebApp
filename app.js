

const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector("option-container");

let questionCounter = 0;
let currentQuestions;
let availableQuestions = [];
let availableOptions = [];

// push the questions into availableQuestions array 
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i =0; i < totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// swr question number number and question and options
function getNewQuestion(){
    // set question number
    questionNumber.innerHTML = "Question" + (questionCounter + 1) + " of " + quiz.length;
    
    // set question text
    // get random question
    const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
    currentQuestions = questionIndex;
    questionText.innerHTML = currentQuestions.q;
   
    // get the position of 'questionIndex' from the availableQuestion Array;
    const index1 = availableQuestions.indexOf(questionIndex);

    // remove the 'questionIndex' from the availableQuestion Array so that the question does not repeat
    availableQuestions.splice(index1,1);
    
    // set options 
    // get the length of options
    const optionLen = currentQuestions.options.length
    // push options into availableOptions Array
    for(let i=0; i<optionLen; i++){
        


    }
    questionCounter++
}

function next(){
    if(questionCounter === quiz.length){
        console.log("quiz over");
    }
    else{
        getNewQuestion();
    }


}



window.onload = function(){

    // first we will set all questions in availableQuestion array 
    setAvailableQuestions();
    // second we will call getNewQuestion(); function
    getNewQuestion();
}