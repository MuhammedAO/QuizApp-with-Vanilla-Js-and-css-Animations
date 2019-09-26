const highScoreList = document.getElementById("highScoreList");


//get the highScore from the localstorage
const highScores = JSON.parse(localStorage.getItem("highScores")) ||[];


//iterate through eat score and for each one of those score, an Li will the added to the uL

highScoreList.innerHTML = highScores.map(score =>{
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
}) 
.join(" ");

