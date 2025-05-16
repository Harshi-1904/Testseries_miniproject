let questions = [];
let currentQuestionIndex = 0;
let selectedOptions = {};

async function loadQuestions() {
    try {
        const response = await fetch("/questions");
        questions =
        [
            {
              "question": "Abhishek is elder to Savar. Savar is younger to Anshul. Which of the given conclusions is logically valid and is inferred from the above statements? ",
              "options": ["Abhishek is elder to Anshul ","Anshul is elder to Abhishek "," Abhishek and Anshul are of the same age"," No conclusion follows "],
              "correctAnswer": 3,
              "category": "APP"
            },
            {
              "question": "Four branches of a company are located at , and . is north of at a distance of; is south of at a distance of ; is southeast of O by . What is the distance between and in ?",
              "options": ["5.34 ","6.74","28.5","45.4 "],
              "correctAnswer": 0,
              "category": "APP"
            },
            {
              "question": "If  stands for best of luck and  stands for good wishes, which of the following indicates ace the exam?",
              "options": ["MCHTX","MXHTC","XMHCT","XMHTC"],
              "correctAnswer": 1,
              "category": "APP"
            },
            {
              "question": "P,Q,R,S, T,and are seated around a circular table is seated two places to the right of is seated three places to the left of is seated opposite If and now switch seats, which of the following must necessarily be true?",
              "options": [" P is immediately to the right of R ","T is immediately to the left of P","T is immediately to the left of or is immediately to the right of Q ","U is immediately to the right of or is immediately to the left of T"],
              "correctAnswer": 2,
              "category": "APP"
            },
            {
              "question": "1. Tanya is older than Eric. 2. Cliff is older than Tanya. 3. Eric is older than Cliff. If the first two statements are true, then the third statement is:",
              "options": ["True","False ","Uncertain","Data insufficient"],
              "correctAnswer": 1,
              "category": "APP"
            },
            {
              "question": "If |4X-7|=5then the values of 2|X| - | -X|is:",
              "options": ["2, ( 1/3)","(1/2) ,3 ","(3/2),9 "," (2/3 ), 9 "],
              "correctAnswer": 1,
              "category": "APP"
            },
            {
              "question": "⊕ and ⊙are two operators on p and q such that p ⊙ q = p - q, and p ⊕ q = p x q Then,(9 ⊙ (6 ⊕ 7)) ⊙ (7 ⊕ (6 ⊙ 5)) = (D) ",
              "options": ["40","-26","-33","-40"],
              "correctAnswer": 3,
              "category": "APP"
            },
            {
              "question": "How many integers are there between 100 and 1000all of whose digits are even?",
              "options": ["60","80","100","90"],
              "correctAnswer": 2,
              "category": "APP"
            },
            {
              "question": "Find the smallest number such that is a perfect cube",
              "options": ["24","27","32","36"],
              "correctAnswer": 1,
              "category": "APP"
            },
            {
              "question": "If the radius of a right circular cone is increased by its volume increases by",
              "options": ["75% ","100%","125%","237.5%"],
              "correctAnswer": 2,
              "category": "APP"
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
