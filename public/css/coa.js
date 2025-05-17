let questions = [];
let currentQuestionIndex = 0;
let selectedOptions = {};

async function loadQuestions() {
    try {
        const response = await fetch("/questions");
        questions =
        [
            {
              "question": "Which of the following addressing modes are suitable for program relocation at run time?",
              "options": ["Absolute addressing ","Register addressing","Based addressing ","Indirect addressing"],
              "correctAnswer": 2,
              "category": "COA"
            }, {
                "question": "Consider a 4 -way set associative cache consisting of 128 lines with a line size of 64 words. The CPU generates a 20 − bit address of a word in main memory. The number of bits in the TAG is",
                "options": ["9","7","8","6"],
                "correctAnswer": 0,
                "category": "COA"
              }, {
                "question": "if all the values are zeroes in ieee 754 representation then its corresponding value is  ",
                "options": ["+0","-0","NaN","None "],
                "correctAnswer": 0,
                "category": "COA"
              }, {
                "question": "which among of the following has more interrupt priority?",
                "options": ["cpu temperature sensor "," hard disk","keyboard","none"],
                "correctAnswer": 0,
                "category": "COA"
              }, {
                "question": " Which of the following is a faster  memory? ",
                "options": ["cache memory","main memory","tape memory","hard disk"],
                "correctAnswer": 0,
                "category": "COA"
              }, {
                "question": "Which of the following is not a type of CPU register? ",
                "options": ["program counter","stack pointer","index register","databus"],
                "correctAnswer": 3,
                "category": "COA"
              }, {
                "question": "Which register holds the address of the next instruction to be fetched?  ",
                "options": ["a) MAR "," PC (Program Counter)   "," IR (Instruction Register) "," SP (Stack Pointer)"],
                "correctAnswer": 1,
                "category": "COA"
              }, {
                "question": "What is the main purpose of a cache memory? ",
                "options": ["a) Store permanent data  "," Store frequently accessed data for faster access "," Hold all data in a computer ","Process data with minimal power consumption "],
                "correctAnswer": 1,
                "category": "COA"
              }, {
                "question": "Which of the following is a characteristic of RISC (Reduced Instruction Set Computer) architecture?",
                "options": ["a) Complex instruction set  "," Large number of instructions "," Smaller and simpler instructions "," Multiple memory addressing modes  "],
                "correctAnswer": 2,
                "category": "COA"
              }, {
                "question": "What is the main advantage of pipelining in CPU architecture? ",
                "options": [" It reduces memory access time "," It increases instruction throughput ","It reduces the number of registers required","It speeds up the clock cycle"],
                "correctAnswer": 3,
                "category": "COA"
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
