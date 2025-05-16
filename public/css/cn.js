let questions = [];
let currentQuestionIndex = 0;
let selectedOptions = {};

async function loadQuestions() {
    try {
        const response = await fetch("/questions");
        questions =
        [
            {
              "question": "Which layer of the OSI model is responsible for data encryption and decryption? ",
              "options": [" Application" ,"Network ","Presentation ","Transport"],
              "correctAnswer": 2,
              "category": "CN"
            },
            {
              "question": "Which of the following protocols is used to assign IP addresses dynamically? ",
              "options": [" FTP ","HTTP" ,"DHCP "," SMTP"],
              "correctAnswer": 2,
              "category": "CN"
            },
            {
              "question": "What is the purpose of the ARP (Address Resolution Protocol)?",
              "options": ["To map IP addresses to MAC addresses" ," To encrypt data packets for security", " To route data between different networks "," To manage the IP address allocation "],
              "correctAnswer": 0,
              "category": "CN"
            },
            {
              "question": "Which of the following is a connectionless protocol?",
              "options": [" TCP ","UDP" ," FTP "," SMTP"],
              "correctAnswer": 1,
              "category": "CN"
            },
            {
              "question": "What is the purpose of the DNS (Domain Name System)?",
              "options": [" Assign IP addresses to devices","Resolve domain names to IP addresses", " Transfer files between devices "," Secure communications over the internet"],
              "correctAnswer": 1,
              "category": "CN"
            },
            {
              "question": "Which of the following is a feature of the TCP protocol? ",
              "options": ["It is connectionless ","It provides flow control and congestion control "," It is used for fast, unreliable communication ","It does not guarantee data delivery "],
              "correctAnswer": 1,
              "category": "CN"
            },
            {
              "question": "Which of the following is a commonly used dynamic routing protocol? ",
              "options": ["ARP","RARP","OSPF "," DNS"],
              "correctAnswer": 2,
              "category": "CN"
            },
            {
              "question": "Which of the following IP fields is used to identify fragments of the same original packet? ",
              "options": ["Protocol","Identification","Time-to-live (TTL) ","Source IP address "],
              "correctAnswer": 1,
              "category": "CN"
            },
            {
              "question": "When an IP packet is fragmented, which of the following fields remain unchanged in each fragment?",
              "options": ["Source IP address ","Identification field","Destination IP address","Protocol field"],
              "correctAnswer": 3,
              "category": "CN"
            },
            {
              "question": "Which method allows sending multiple packets before receiving an ack? ",
              "options": ["Stop-and-Wait","Sliding Window","Congestion Control","Acknowledgment"],
              "correctAnswer": 1,
              "category": "CN"
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
