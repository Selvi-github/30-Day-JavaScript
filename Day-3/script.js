const questions=[
    {
        question:"Which is largest animal in the world?",
        answers:[
            {text:"Shark",correct:false},
             {text:"Blue whale",correct:true},
            {text:"Elephant",correct:false},
            {text:"Giraffe",correct:false},
            
        ]
    },
    {
        question:"Which is the smallest country in the world?",
        answers:[
            {text:"Vatican City",correct:true},
             {text:"Monaco",correct:false},
            {text:"San Marino",correct:false},
            {text:"Nepal",correct:false},
            
        ] 
    },
    {
         question:"Which is largest desert in the world?",
        answers:[
            {text:"Sahara",correct:true},
             {text:"Arabian",correct:false},
            {text:"Gobi",correct:false},
            {text:"Kalahari",correct:false},
            
        ]
    },
    {
         question:"Which is smallest continent in the world?",
        answers:[
            {text:"Australia",correct:true},
             {text:"Antarctica",correct:false},
            {text:"Africa",correct:false},
            {text:"Europe",correct:false},
            
        ]
    }
];
const questionElement=document.getElementById("question");
const scoreElement=document.getElementById("score");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex=0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    nextButton.innerHTML="Next";
    scoreElement.innerHTML=`Score: ${score}/${questions.length}`;
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;
     currentQuestion.answers.forEach(answer=>{
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        if(answer.correct){
            button.dataset.correct="true";
        }
        answerButtons.appendChild(button);
        button.addEventListener("click",selectAnswer);
});
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    scoreElement.innerHTML=`Score: ${score}/${questions.length}`;
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }   
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML=`Your score is ${score} out of ${questions.length}!`;
    scoreElement.innerHTML=`Score: ${score}/${questions.length}`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleQuestion(){
    currentQuestionIndex++;
    showQuestion();
}
nextButton.addEventListener("click",()=>{
    if(nextButton.innerHTML==="Play Again"){
        startQuiz();
        return;
    }
    if(currentQuestionIndex<questions.length-1){
        handleQuestion();
    }
    else{
        showScore();
    }
});

document.addEventListener("DOMContentLoaded",startQuiz);

