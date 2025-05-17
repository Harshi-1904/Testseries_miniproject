let questions = [];
let currentQuestionIndex = 0;
let selectedOptions = {};

async function loadQuestions() {
    try {
        const response = await fetch("/questions");
        questions =
        [
            {
              "question": "Some code optimizations are carried out on the intermediate code because",
              "options": [" They enhance the portability of the compiler to the target processor ","Program analysis is more accurate on intermediate code than on machine code ","The information from dataflow analysis cannot otherwise be used for optimization ","The information from the front end cannot otherwise be used for optimization"],
              "correctAnswer": 0,
              "category": "CD"
            },
            {
              "question": "In a compiler the module the checks every character of the source text is called ",
              "options": ["The code generator","The code optimiser","The lexical analyser","The syntax analyser"],
              "correctAnswer": 2,
              "category": "CD"
            },
            {
              "question": "Which one of the following statements is FALSE?",
              "options": [" Context-free grammar is used to specify both lexical and syntax rules ","Type checking is done before parsing "," High-level language programs can be translated to different Intermediate Representation "," Arguments to a function can be passed using the program stack"],
              "correctAnswer": 1,
              "category": "CD"
            },
            {
              "question": "To evaluate an expression without any embedded function calls",
              "options": [" One stack is enough ","Two stacks are needed ","As many stacks as the height of the expression tree are needed ","A Turing machine is needed in the general case "],
              "correctAnswer": 0,
              "category": "CD"
            },
            {
              "question": "Which of the following features cannot be captured by context-free grammars?",
              "options": ["Syntax of if-then-else statements","Syntax of recursive procedures "," Whether a variable has been declared before its use ","Variable names of arbitrary length "],
              "correctAnswer": 2,
              "category": "CD"
            },
            {
              "question": "A grammar that is both left and right recursive for a non-terminal, is ",
              "options": ["Ambiguous","Unambiguous" ,"may or may not be ambiguous","none"],
              "correctAnswer": 2,
              "category": "CD"
            },
            {
              "question": "Which data structure in a compiler is used for managing information about variables and their attributes?",
              "options": ["Abstract syntax tree","Symbol table ","Semantic stack"," Parse table "],
              "correctAnswer": 1,
              "category": "CD"
            },
            {
              "question": "One of the purposes of using intermediate code in compilers is to",
              "options": [" make parsing and semantic analysis simpler","improve error recovery and error reporting","increase the chances of reusing the machine-independent code optimizer in other compiers ","improve the registers allocations "],
              "correctAnswer": 2,
              "category": "CD"
            },
            {
              "question": "In a compiler, keywords of a language are recognized during",
              "options": ["parsing of the program ","the code generation "," the lexical analysis of the program ","dataflow analysis "],
              "correctAnswer": 2,
              "category": "CD"
            },
            {
              "question": "In the context of compilers, which of the following is/are an intermediate representation of the source program?",
              "options": ["Three address code ","Abstract Syntax Tree "," Control Flow Graph ","Symbol table "],
              "correctAnswer": 0,
              "category": "CD"
            }
          ]
        console.log(questions);
        loadQuestion(); // Load first question
    } catch (error) {
        console.error("Error fetching questions:", error);
    }
}

function loadQuestion() {
    if (questions.length === 0) return; // Ensure questions are loaded

    const questionElement = document.getElementById("question");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("nextBtn");
    const prevBtn = document.getElementById("prevBtn");
    const submitBtn = document.getElementById("submitBtn");

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
    optionsContainer.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const isChecked = selectedOptions[currentQuestionIndex] === index ? "checked" : "";
        optionsContainer.innerHTML += `
            <div class="form-check">
                <input class="form-check-input" type="radio" name="quizOption" id="option${index}" value="${index}" ${isChecked} onclick="selectOption(${index})">
                <label class="form-check-label" for="option${index}">
                    ${option}
                </label>
            </div>`;
    });

    prevBtn.style.display = currentQuestionIndex === 0 ? "none" : "inline-block";
    
    if (currentQuestionIndex === questions.length - 1) {
        nextBtn.style.display = "none";
        submitBtn.style.display = "inline-block";
    } else {
        nextBtn.style.display = "inline-block";
        submitBtn.style.display = "none";
    }
}

function selectOption(optionIndex) {
    selectedOptions[currentQuestionIndex] = optionIndex;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function calculateScore() {
    let score = 0;
    console.log(selectedOptions);
    const userAnswers = Object.entries(selectedOptions).map(([qIndex, answer]) => ({
        question: questions[qIndex].question,
        selectedAnswer: questions[qIndex].options[answer],
        correctAnswer: questions[qIndex].correctAnswer,
        isCorrect: answer === questions[qIndex].correctAnswer
    }));
    console.log(questions[0].correctAnswer);
    console.log(userAnswers);
    userAnswers.forEach((answer) => {
        if (answer.isCorrect) {
            score += 10;
            console.log(score);
        }
    });
     document.querySelector(".final_ans").value=score;
     document.querySelector(".useranswers").value=userAnswers;
     console.log(userAnswers);
    console.log(score);
    
    return { score, userAnswers };
}
function submitQuiz(username) {
    const { score, userAnswers } = calculateScore();

    fetch(`/score/${username}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score, userAnswers }),
    })
    .then(response => {
        if (response.ok) {
            window.location.href = `/score/${username}`;
        } else {
            console.error("Failed to submit quiz.");
        }
    })
    .catch(error => console.error("Error submitting quiz:", error));
}

window.onload = loadQuestions; // Load questions from database
