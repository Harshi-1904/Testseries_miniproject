let questions = [];
let currentQuestionIndex = 0;
let selectedOptions = {};

async function loadQuestions() {
    try {
        const response = await fetch("/questions");
        questions =
        [
            {
              "question": "Which of the following is the primary advantage of a hash table over an array?",
              "options": ["Faster access to elements" ,"Better memory usage ","Supports dynamic resizing" ," Faster insertion and deletion operations "],
              "correctAnswer":3 ,
              "category": "DS"
            },
            {
              "question": "Which of the following operations has a time complexity of O(log n) in a Binary Search Tree?",
              "options": ["Insertion ","Deletion" ,"Searching for an element" ," All of the above  "],
              "correctAnswer": 1 ,
              "category": "DS"
            }, {
                "question": "What is the primary disadvantage of using an array for dynamic data storage? ",
                "options": ["Limited size "," Slow access time "," Complexity in resizing" ," All of the above  "],
                "correctAnswer": 2 ,
                "category": "DS"
              }, {
                "question": "Which of the following operations takes O(1) time in a stack data structure?",
                "options": [" Push "," Pop" ,"Peek ","All of the above "],
                "correctAnswer": 1 ,
                "category": "DS"
              }, {
                "question": "Which of the following is not a characteristic of a binary search tree (BST)?",
                "options": ["Left child is smaller than the parent" ,"Right child is larger than the parent " ,"Elements are stored in sorted order "," Each node can have at most two children "],
                "correctAnswer": 0,
                "category": "DS"
              }, {
                "question": "What is the time complexity of finding the minimum element in a Binary Search Tree (BST)?",
                "options": [" O(1)", " O(log n)", "O(n) "," O(n^2) "],
                "correctAnswer": 0 ,
                "category": "DS"
              }, {
                "question": "If a Binary Search Tree (BST) is completely unbalanced (i.e., it forms a linked list), what is the time complexity of a search operation?",
                "options": [" O(1)", "O(log n)" ," O(n)", " O(n^2)"],
                "correctAnswer": 1 ,
                "category": "DS"
              }, {
                "question": ".What is the time complexity of dequeue operation in a queue implemented using a linked list? ",
                "options": [" O(1)", "O(log n)" ," O(n)", " O(n^2)"],
                "correctAnswer": 2,
                "category": "DS"
              }, {
                "question": ".Which of the following data structures is best suited for implementing a LIFO (Last In, First Out) operation?",
                "options": [" Queue","Stack","Array ","Linked List "],
                "correctAnswer":1 ,
                "category": "DS"
              }, {
                "question": "In a hash table, what happens if two elements have the same hash value?",
                "options": ["A collision occurs" ," The first element is overwritten "," The second element is ignored", " Both elements are placed in the same bucket"],
                "correctAnswer": 1,
                "category": "DS"
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
