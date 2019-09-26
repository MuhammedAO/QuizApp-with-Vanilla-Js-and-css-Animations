const username = document.getElementById("username");

const saveScoreBtn = document.getElementById("saveScoreBtn");

const finalScore = document.getElementById("finalScore");

const mostRecentScore = localStorage.getItem("mostRecentScore");

//save High scores in local storage
//it is important to understand that things in local storage are stored as strings
//to convert an array or anything into a string in local storage, you use JSON.stringify
//to convert to an array you use json parse
const highScores = JSON.parse(localStorage.getItem("highScores")) ||[];

const MAX_HIGH_SCORES = 5;
// console.log(highScores);

finalScore.innerText = mostRecentScore;

username.addEventListener("keyup", () =>{
    // console.log(username.value);
    saveScoreBtn.disabled = !username.value;
})




saveHighScore = (e) =>{
// console.log("clicked");
e.preventDefault();
 

const score = {
     score: Math.floor(Math.random()*100),
     name: username.value
     
    };
    
    highScores.push(score);
    //sort through the list and cut off anything >5
    //the sort() returns either <0 || >0 
    //sorting from highest to lowest
    //if the b score is > than the a score, b will come beofre a and vice versa
    //this function carries an implicit return.. you don't need the curly braces and return keeyword
highScores.sort((a,b) => b.score - a.score)
  highScores.splice(5);

  //update the highscores in local storage
localStorage.setItem("highScores", JSON.stringify(highScores));
window.location.assign("/");
    // console.log(highScores);


};