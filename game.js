//Getting my question by id
const question = document.getElementById("question");


//Getting my choices by class name & converting them to an array
const choices = Array.from(document.getElementsByClassName("choice-test"));

const progressText = document.getElementById("progressText");


const scoreText = document.getElementById("score");

const progressbarfull = document.getElementById("progressbarfull");

const loader = document.getElementById("loader");

const game = document.getElementById("game");


//the current question you are answering
let currentQuestion = {};

//this is so that we can create a delay between answering a current question and the next question
let acceptingAnswers = false;


//a score that starts at 0
let score = 0;

//Question-counter is basically the question that you are on
let questionCounter = 0;

//the full question set where questions will be taken from
let availableQuestions = [];



let questions = [];

fetch("questions.json")
.then(res =>{
  // console.log(res);
  return res.json();
}).then(loadedQuestions =>{
  console.log(loadedQuestions.results);

// questions =  loadedQuestions.results.map(loadedQuestion =>{
//     const formattedQuestion = {
//       question : loadedQuestion.question
//     };
//     const answerChoices = [...loadedQuestion.incorrect_answers];
//     formattedQuestion.answer = Math.floor(Math.random()* 3) + 1;
//     answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.incorrect_answers);

//     answerChoices.forEach((choice, index) => {
//       formattedQuestion["choice" + (index+1)] = choice;
//     });
//     return formattedQuestion;
//   });

  questions = loadedQuestions;
  startGame();
})

.catch(err =>{
  console.log(err);
});


//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

//the{...questtion}: a spread operator is used here because, it takes each of the item and put them in a separate array
//math.random gives you a decimal between 0 and 1 you can make it an integer by using mathFloor


startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  console.log(availableQuestions);
  getNewQuestion();
  game.classList.remove("hidden");
  loader.classList.add("hidden");
};

getNewQuestion = () => {

    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
      //when we end the game, i want it to save the player's score so that we can access it in the end page
      
      localStorage.setItem("mostRecentScore", score);

        //go to the end page
     return   window.location.assign("/end.html");
    }
  questionCounter++;
//everytime the question increases, the progressbar should get updated
progressbarfull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;
//   questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
//this dynamically increases the number of question answered
progressText.innerText = `Question${questionCounter}/${MAX_QUESTIONS}`

  //math.random gives you a decimal between 0 and 1.. you can multiply it by any number to get an integer between the number you're multiplying with.
  //math.floor gives you an integer
  //it is used here to help navigate through the numbers of the questions. that is why availablequestions.length is used
  const questionIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerText = currentQuestion.question;

  //this is going to iterate through each choices, it's going to give us reference to each choice
  //the choice.dataset is getting the number property out of the data-set. you can find this in the html
  choices.forEach(choice =>{
      const number = choice.dataset["number"];
      choice.innerText = currentQuestion["choice" + number];
  });

  //this splices(remove) the question that has been used..because when we get a new question we dont want to be choosing from question that has already been used.
availableQuestions.splice(questionIndex, 1);

acceptingAnswers = true;
};

choices.forEach(choice =>{
    choice.addEventListener('click', e =>{
// console.log(e.target);
if (!acceptingAnswers) return ;
acceptingAnswers = false;
const selectedChoice = e.target;
const selectedAnswer =selectedChoice.dataset["number"];

//a ternary operator
const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

if(classToApply=="correct"){
    incrementScore(CORRECT_BONUS);
}

selectedChoice.parentElement.classList.add(classToApply);

setTimeout(() => {
    
    getNewQuestion();
    selectedChoice.parentElement.classList.remove(classToApply);
}, 1000);

// console.log(classToApply);

    });
});

//a function that dynamically increase the score
incrementScore = num =>{
score +=num;
scoreText.innerText = score;
}



