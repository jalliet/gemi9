document.addEventListener('DOMContentLoaded', () => {
    // This is the function that is run when the quiz webpage is opened 
    fetchQuizData();
});

let score = 0;

function fetchQuizData() {
    // Fetch data from the API
    fetch('https://api.example.com/quiz')
        .then(response => response.json())
        .then(data => {
            populateQuizCard(data);
        })
        .catch(error => console.error('Error fetching quiz data:', error));
}

function populateQuizCard(data) {
    // Populate image
    const imageElement = document.querySelector('.card-img-top');
    imageElement.src = data.image;
    imageElement.alt = data.title;

    // Populate card title and description
    document.querySelector('.card-title').textContent = data.title;
    document.querySelector('.card-text').textContent = data.description;

    // Populate options
    const optionsElements = document.querySelectorAll('.list-group-item.option');
    optionsElements.forEach((optionElement, index) => {
        optionElement.textContent = data.options[index];
        optionElement.onclick = () => checkAnswer(index, data.correctAnswer);
    });
}

function checkAnswer(selectedOption, correctAnswer) {
    if (selectedOption === correctAnswer) {
        alert('Correct!');
        score++;
    } else {
        alert('Incorrect!');
    }

    // Update the score
    document.getElementById('score').textContent = score;

    // Fetch new quiz data after answering
    fetchQuizData();
}
