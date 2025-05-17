let questions = [];
let currentQuestionIndex = 0;
let selectedOptions = {};

async function loadQuestions() {
    try {
        const response = await fetch("/questions");
        questions =
        [
            {
              "question": "Which of the following is a divide-and-conquer algorithm? ",
              "options": [" Binary Search" ,"Selection Sort" , "Insertion Sort" ," Bubble Sort"],
              "correctAnswer": 0,
              "category": "DAA"
            },{
                "question": "Which sorting algorithm is the fastest in the worst case?",
                "options": ["Quick Sort ","Bubble Sort","Merge Sort" ,"Insertion Sort"],
                "correctAnswer": 2 ,
                "category": "DAA"
              },            {
                "question": ".In a Depth-First Search (DFS) traversal, what is the time complexity for visiting all nodes and edges in a graph with V vertices and E edges? ",
                "options": [" O(V)" ," O(E)", " O(V + E) "," O(V^2)"],
                "correctAnswer": 2,
                "category": "DAA"
              },  {
                "question": "What is the space complexity of Depth-First Search (DFS) in a graph implemented using recursion? ",
                "options": ["O(V)" ,"O(E)" ,"O(V + E)", " O(log V)"],
                "correctAnswer": 3,
                "category": "DAA"
              },  {
                "question": "What is the time complexity of Matrix Multiplication for two matrices of size n x n using the naive approach? ",
                "options": [" O(n log n)" ," O(n^2)","O(n^3)","O(n)"],
                "correctAnswer": 2,
                "category": "DAA"
              },            {
                "question": "Which of the following is not a typical greedy algorithm problem? ",
                "options": ["Huffman Coding", " Fractional Knapsack Problem", "Dijkstras Algorithm for Shortest Path", " 0/1 Knapsack Problem "],
                "correctAnswer": 3 ,
                "category": "DAA"
              },            {
                "question": "What is the minimum no. of comparisons needed if there are 100 elements in an array to find the maximum element in an array? ",
                "options": ["148", "34", "10000" ,"150 "],
                "correctAnswer": 0 ,
                "category": "DAA"
              },      {
                "question": "Which of the following best describes the recurrence relation for Quick Sort?",
                "options": ["Kruskals Algorithm" ,"Floyd-Warshall Algorithm ","Prims Algorithm "," Both a and c "],
                "correctAnswer": 2,
                "category": "DAA"
              },            {
                "question": "Which of the following is a greedy algorithm used to find the Minimum Spanning Tree?",
                "options": ["It is faster when the graph is sparse" ," It works better on graphs with fewer edges "," It is easier to implement ","It is more efficient for dense graphs"],
                "correctAnswer":3 ,
                "category": "DAA"
              },            {
                "question": "What is the primary advantage of Prims Algorithm over Kruskals Algorithm? ",
                "options": ["It is faster when the graph is sparse ","It works better on graphs with fewer edges","It is easier to implement "," It is more efficient for dense graphs "],
                "correctAnswer": 2,
                "category": "DAA"
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
