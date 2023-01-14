
function Quiz(question) {
    this.score = 0;
    this.question = question;
    this.quesIndex = 0;
}

Quiz.prototype.getQuesByIndex = function() {
    return this.question[this.quesIndex]
}

Quiz.prototype.checkOptionWithAns = function(ans) {
    if(this.getQuesByIndex().isCorrectAns(ans)) {
        this.score++;
    }

    this.quesIndex++;
}

Quiz.prototype.isEnded = function() {
    return this.quesIndex === this.question.length;
}

function Question(text,choices,answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAns = function(choice) {
    return this.answer === choice;
}

const question = [
    new Question('Javascript supports?',['Functions', 'XHTML','CSS','HTML'], 'Functions'),
    new Question('Which Language is used for styling web pages?',['HTML', 'Jquery','CSS','XML'], 'CSS'),
    new Question('Which is not javascript Framework?',['Jquery', 'Python script','Django','Nodejs'], 'Django'),
    new Question('Which is used for connect to Database?',['HTML', 'PHP','JS','ALL'], 'PHP'),
    new Question('Javascript is a?',['Development', 'Programming language','Language','ALL'], 'Programming language'),
];


const loadQuestions = () => {
    if(quiz.isEnded()) {
        showScores();
    }else {
        let element = document.getElementById('question');
        element.innerHTML = quiz.getQuesByIndex().text; 

        let choices = quiz.getQuesByIndex().choices;
        for(let i=0;i<choices.length;i++) {
            var choice = document.getElementById('choice' + i);
            choice.innerHTML = choices[i];
            handleOptionBtn('btn'+i,choices[i]);
        }

        showProgress();
    }
}

function showScores() {
    let result = '<h1>Result</h1>';
    result+="<h2 id='score'>Your Score: " + quiz.score + " . Percentage is: " + (quiz.score/question.length*100) + "% </h2>"
    let element = document.getElementById('quiz');
    element.innerHTML = result; 
}

function showProgress() {
    let currentOptNumb = quiz.quesIndex + 1;
    let element = document.getElementById('progress');
    element.innerHTML = "Question " + currentOptNumb + ' of ' + quiz.question.length; 
}

function handleOptionBtn(id,choice) {
    let button = document.getElementById(id);
   
    button.onclick = function() {
        quiz.checkOptionWithAns(choice);
        loadQuestions();
    }
}

let quiz = new Quiz(question);

loadQuestions();