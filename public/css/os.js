let questions = [];
let currentQuestionIndex = 0;
let selectedOptions = {};

async function loadQuestions() {
    try {
        const response = await fetch("/questions");
        questions =
        [
            {
              "question": "Which of the following page replacement algorithms suffers from Belady's anomaly?",
              "options": ["Optimal replacement", "LRU", "FIFO", "Both (A) and (C)"],
              "correctAnswer": 2,
              "category": "OS"
            },
            {
              "question": "Consider a disk pack with surfaces, tracks per surface, and sectors per track. The capacity of the disk pack and the number of bits required to specify a particular sector in the disk are respectively",
              "options": ["256 Mbyte, 19 bits", "256 Mbyte, 28 bits", "512 Mbyte, 20 bits", "64 Gbyte, 28 bits"],
              "correctAnswer": 0,
              "category": "OS"
            }, {
                "question": "Consider a sys tem with 3 processes that share 4 instances of the same resource type. Each process can request a maximum of K instances. Resources can be requested and releases only one at a time. The largest value of that will always avoid deadlock is",
                "options": ["2", "3", "4", "5"],
                "correctAnswer": 0,
                "category": "OS"
              },{
                "question": "The data blocks of a very large file in the Unix file system are allocated using",
                "options": ["2", "3", "4", "5"],
                "correctAnswer": 0,
                "category": "OS"
              },{
                "question": "The data blocks of a very large file in the Unix file system are allocated using",
                "options": [" continuous allocation", "linked allocation", "indexed allocation", " an extension of indexed allocation"],
                "correctAnswer": 3,
                "category": "OS"
              },{
                "question": "I/O redirection",
                "options": ["implies changing the name of a file", " can be employed to use an existing file as input file for a program", "implies connecting programs through a pipe", "none of the above"],
                "correctAnswer": 1,
                "category": "OS"
              },{
                "question": "Which one of the following is true for a CPU having a single interrupt request line and a single interrupt grant line? ",
                "options": [" Neither vectored interrupt nor multiple interrupting devices are possible", "Vectored interrupts are not possible but multiple interrupting devices are possible", "Vectored interrupts and multiple interrupting devices are both possible", "Vectored interrupts are possible but multiple interrupting devices are not possible"],
                "correctAnswer": 2,
                "category": "OS"
              },{
                "question": "A 1000 Kbyte memory is managed using variable partitions but no compaction. I26t currently has two partitions of sizes 200 Kbyte and 260Kbyte respectively. The smallest allocation request in Kbyte that could be denied is for",
                "options": ["151", "181", "231", "541"],
                "correctAnswer": 1,
                "category": "OS"
              },{
                "question": "Locality of reference implies that the page reference being made by a process",
                "options": ["will always be to the page used in the previous page reference", "is likely to be to one of the pages used in the last few page references", "will always be to one of the pages existing in memory", "will always lead to a page fault"],
                "correctAnswer": 1,
                "category": "OS"
              },{
                "question": "Consider an arbitrary set of CPU-bound processes with unequal CPU burst lengths submitted at the same time to a computer system. Which one of the  following process  scheduling algorithms would minimize the average waiting time  in the ready queue? ",
                "options": ["Shortest remaining time first", " Round-robin with the time quantum less than the shortest CPU burst", "Uniform random", "Highest priority first with priority proportional to CPU burst length"],
                "correctAnswer": 0,
                "category": "OS"
              },{
                "question": "A critical section is a program segment ",
                "options": [" which should run in a certain amount of time", "which avoids deadlock", " which must be enclosed by a pair of semaphore operations, and V", "where shared regions are accessed"],
                "correctAnswer": 3,
                "category": "OS"
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
