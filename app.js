
// These are DOM elements selected using document.querySelector 
// which will be manipulated throughout the quiz.

//
//
const questionNumber = document.querySelector(".question-number");
const questionText = document.querySelector(".question-text");
const optionContainer = document.querySelector(".option-container");
const answersIndicatorContainer = document.querySelector(".answers-indicator");
const homeBox = document.querySelector(".home-box");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");

let questionCounter = 0; // Keeps track of the current question number.
let currentQuestions; // Stores the current question object.
let availableQuestions = []; // Array that holds the questions yet to be asked.
let availableOptions = []; // Array that holds the options for the current question
let correctAnswers = 0; // Keeps track of the number of correct answers.
let attempt = 0;  // Tracks the number of attempts the user has made.


// push the questions into availableQuestions array 
function setAvailableQuestions(){
    const totalQuestion = quiz.length;
    for(let i =0; i < totalQuestion; i++){
        availableQuestions.push(quiz[i])
    }
}

// set question number number and question and options

    // This function sets up a new question by:
    // Updating the question number display.
    // Selecting a random question from availableQuestions and displaying it.
    // Removing the selected question from availableQuestions to avoid repetition.
    // Setting up the options for the question and making them clickable.
    //



function getNewQuestion(){
    // set question number
    questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;
    
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
        availableOptions.push(i)
    }

    optionContainer.innerHTML = '';

    let animationDelay = 0.15;
    // create options in HTML
    for(let i = 0; i<optionLen; i++){
        // random option
        const optionIndex = availableOptions[Math.floor(Math.random() * availableOptions.length)];
        // get the position of 'optionIndex' from the availableOptions Array
        const index2 = availableOptions.indexOf(optionIndex);

        // remove the 'optionIndex' from the availableOptions Array, so that the option does not repeat
        availableOptions.splice(index2,1)
        const option = document.createElement("div");
        option.innerHTML = currentQuestions.options[optionIndex];
        option.id = optionIndex;
        option.style.animationDelay = animationDelay + 's';
        animationDelay = animationDelay + 0.15;
        option.className = "option";
        optionContainer.appendChild(option)
        option.setAttribute("onclick", "getResult(this)");
    }
    questionCounter++
}

// get the result of current attempt question 

// This function handles the result of an attempted answer:
    //  Checks if the selected option is correct.
    //  Updates the display and indicators based on the correctness of the answer.
    //  Calls unclickablieOptions to prevent changing the answe
    //

function getResult(element){
    const id = parseInt(element.id);
   
    // get the answer by comparing the id of clicked option 
    if(id === currentQuestions.answer){
        // set the green color to the correct option
        element.classList.add("correct");

        // add the indicator to correct mark
        updateAnswerIndicator("correct");
        correctAnswers++;
    }
    else{
        // set the red color to the incorrect option
        element.classList.add("wrong");

        // add the indicator to wrong mark
        updateAnswerIndicator("wrong");

        // if the answer is incorrect the show the correct option by adding green color the correct option
        const optionLen = optionContainer.children.length;
        for(let i=0; i<optionLen; i++){
            if(parseInt(optionContainer.children[i].id) == currentQuestions.answer){
                optionContainer.children[i].classList.add("correct");
            }
        }
    }
    attempt++;
    unclickablieOptions();
}


// make all the options unclickable once the user select a option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
// This function makes all options unclickable after an option is selected.
function unclickablieOptions(){
    const optionLen = optionContainer.children.length;

    for(let i=0; i<optionLen; i++){
        optionContainer.children[i].classList.add("already-answered");
    }
}

// This function sets up indicators for each question.
function answersIndicator(){

    answersIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
        const indicator = document.createElement("div");
        answersIndicatorContainer.appendChild(indicator);
        
    }

}

// This function updates the indicator for the current question based on the result.
function updateAnswerIndicator(markType){
    answersIndicatorContainer.children[questionCounter-1].classList.add(markType)

}

// This function loads the next question or ends the quiz if all questions have been answered.
function next(){
    if(questionCounter === quiz.length){
        quizOver();
    }
    else{
        getNewQuestion();
    }
}

// This function handles the end of the quiz by hiding the quiz box and showing the result box.
function quizOver(){

    // hide quiz Box
    quizBox.classList.add("hide");
    // show result Box
    resultBox.classList.remove("hide");
    quizResult();

}

// get the quiz Result
// This function calculates and displays the quiz results.
function quizResult(){
    resultBox.querySelector(".total-questions").innerHTML = quiz.length;
    resultBox.querySelector(".total-attempt").innerHTML = attempt;
    resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
    resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
    const percentage = (correctAnswers/quiz.length) *100;
    resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) +"%";
    resultBox.querySelector(".total-score").innerHTML = correctAnswers + " / " + quiz.length;
}

// This function resets the quiz variables.
function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;

}

// This function allows the user to try the quiz again by resetting and starting it.
function tryAgainQuiz(){
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();

}

// This function returns the user to the home screen.
function goToHome(){

    // hide the resultBox
    resultBox.classList.add("hide");
    // show the quizBox
    homeBox.classList.remove("hide");
    resetQuiz();
}


// #### STARTING POINT ####
// This function starts the quiz by setting up the questions and showing the quiz box.
function startQuiz(){

    // hide howe box
    homeBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");

    // first we will set all questions in availableQuestion array 
    setAvailableQuestions();

    // second we will call getNewQuestion(); function
    getNewQuestion();

    // to create indicator of answers
    answersIndicator();
}

// This function sets the total number of questions on the home screen when the window loads.
window.onload = function (){
    homeBox.querySelector(".total-questions").innerHTML = quiz.length;
}

