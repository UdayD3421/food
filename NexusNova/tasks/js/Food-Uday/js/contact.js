document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contactForm');
    const responseMessage = document.getElementById('responseMessage');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Clear previous error messages
        clearErrors();

        // Validate form fields
        const isValid = await validateForm();
        if (!isValid) return;

        // Prepare form data
        const formData = {
            name: form.name.value,
            email: form.email.value,
            subject: form.subject.value,
            message: form.message.value,
        };

        // Submit form data to mock API
        try {
            const response = await fetch('http://localhost:3000/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            showResponseMessage('Form submitted successfully!', 'success');
            form.reset(); // Reset the form after successful submission
        } catch (error) {
            showResponseMessage('There was an error submitting the form: ' + error.message, 'error');
        }
    });

    async function validateForm() {
        let isValid = true;

        // Validate name
        const name = form.name.value.trim();
        if (name === '') {
            setError('name', 'Name is required.');
            isValid = false;
        }

        // Validate email
        const email = form.email.value.trim();
        if (email === '') {
            setError('email', 'Email is required.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            setError('email', 'Please enter a valid email address.');
            isValid = false;
        }

        // Validate subject
        const subject = form.subject.value.trim();
        if (subject === '') {
            setError('subject', 'Subject is required.');
            isValid = false;
        }

        // Validate message
        const message = form.message.value.trim();
        if (message === '') {
            setError('message', 'Message is required.');
            isValid = false;
        }

        return isValid;
    }

    function setError(field, message) {
        const errorElement = document.getElementById(field + 'Error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function clearErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach((element) => {
            element.textContent = '';
            element.style.display = 'none';
        });
    }

    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function showResponseMessage(message, type) {
        responseMessage.textContent = message;
        responseMessage.style.color = type === 'success' ? 'green' : 'red';
    }
});

// chatbot
const chatbotToggler = document.querySelector(".chatbot-toggler");
  const chatbox = document.querySelector(".chatbox");
  const chatInput = document.querySelector(".chat-input textarea");
  const sendChatBtn = document.querySelector(".chat-input span");
  const chatList = document.getElementById("chat-list");

  chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
  });

  sendChatBtn.addEventListener("click", handleSendMessage);
  chatInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  });

  function handleSendMessage() {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;
    appendMessage(userMessage, "outgoing");
    chatInput.value = "";
    simulateResponse(userMessage);
  }

  function appendMessage(message, type) {
    const messageElement = document.createElement("li");
    messageElement.classList.add("chat", type);
    messageElement.innerHTML = `<p>${message}</p>`;
    chatList.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
  }

  function simulateResponse(userMessage) {
    const typingIndicator = document.createElement("li");
    typingIndicator.classList.add("chat", "incoming");
    typingIndicator.innerHTML = `<p>...</p>`;
    chatList.appendChild(typingIndicator);
    chatbox.scrollTop = chatbox.scrollHeight;

    new Promise((resolve) => {
      setTimeout(() => {
        resolve(getBotResponse(userMessage));
      }, 1500);
    }).then((response) => {
      chatList.removeChild(typingIndicator);
      appendMessage(response, "incoming");
    });
  }

  function getBotResponse(userMessage) {
    const lower = userMessage.toLowerCase();

    if (lower.includes("mobile") || lower.includes("contact")) {
      return "+91 976543210";
    } else if (lower.includes("name")) {
      return "Food Display Site";
    } else if (lower.includes("email")) {
      return "food@gmail.in";
    } else if (lower.includes("service")) {
      return "We provide detailed information about Indian cuisines!";
    } else {
      return "I'm sorry, I didn't understand that.";
    }
  }

// Map Marker Click
document.querySelectorAll(".marker").forEach(marker => {
  marker.addEventListener("click", () => {
    document.getElementById("locationInfo").textContent = marker.dataset.info;
  });
});


//quiz part started
const quizContainer = document.getElementById('quiz');
const nextBtn = document.getElementById('nextBtn');
const resultContainer = document.getElementById('result');

const questions = [
    {
        question: "What's your favorite flavor?",
        answers: [
            { text: 'Spicy', value: 'spicy' },
            { text: 'Sweet', value: 'sweet' },
            { text: 'Savory', value: 'savory' },
            { text: 'Sour', value: 'sour' }
        ]
    },
    {
        question: "How do you like your food?",
        answers: [
            { text: 'Hot and spicy', value: 'spicy' },
            { text: 'Cold and sweet', value: 'sweet' },
            { text: 'Warm and savory', value: 'savory' },
            { text: 'Tangy and fresh', value: 'sour' }
        ]
    },
    {
        question: "What meal do you enjoy the most?",
        answers: [
            { text: 'Dinner', value: 'spicy' },
            { text: 'Dessert', value: 'sweet' },
            { text: 'Lunch', value: 'savory' },
            { text: 'Snacks', value: 'sour' }
        ]
    }
];

let currentQuestionIndex = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    nextBtn.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    // Clear previous content
    quizContainer.innerHTML = `<h2>${question.question}</h2>`;
    
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('answer-btn');
        button.addEventListener('click', () => selectAnswer(answer.value));
        quizContainer.appendChild(button);
    });
}

function selectAnswer(selectedValue) {
    const correctValue = 'spicy'; // Example correct answer

    // Remove any existing feedback
    const existingFeedback = document.querySelector('.feedback');
    if (existingFeedback) {
        existingFeedback.remove();
    }

    const feedback = document.createElement('div');
    feedback.classList.add('feedback');

    if (selectedValue === correctValue) {
        feedback.innerText = 'Correct!';
        feedback.classList.add('correct');
    } else {
        feedback.innerText = 'Incorrect!';
        feedback.classList.add('incorrect');
    }

    quizContainer.appendChild(feedback);
    setTimeout(() => {
        feedback.classList.remove('correct', 'incorrect');
        feedback.style.backgroundColor = 'transparent';
    }, 1000);

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        nextBtn.classList.remove('hidden');
    } else {
        nextBtn.classList.add('hidden');
        showResult();
    }
}

nextBtn.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    }
});

function showResult() {
    resultContainer.classList.remove('hidden');
    resultContainer.innerHTML = `<h2>Quiz Completed!</h2><p>Thank you for participating!</p>`;
}

startQuiz();