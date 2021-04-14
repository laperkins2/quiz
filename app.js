  function setQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answers = [];

      for (letter in currentQuestion.answers) {
        answers.push(
          `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}"> 
                ${letter} : 
                ${currentQuestion.answers[letter]}
              </label>`
        );
      }
      output.push(
        `<div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>`
      );
    });
    quizHolder.innerHTML = output.join('');
  }

  function visibleResults() {
    const answerHolders = quizHolder.querySelectorAll('.answers');

    let totalCorrect = 0;

    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerHolder = answerHolders[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerHolder.querySelector(selector) || {}).value;
      if (userAnswer === currentQuestion.correctAnswer) {
        totalCorrect++;

        answerHolders[questionNumber].style.color = 'blue';
      } else {
        answerHolders[questionNumber].style.textDecoration = 'line-through';
      }
    });
    resultsHolder.innerHTML = `${totalCorrect} out of ${myQuestions.length}`;
  }
  const quizHolder = document.getElementById('quiz');
  const resultsHolder = document.getElementById('results');
  const submitButton = document.getElementById('submit');

  const myQuestions = [
    {
      question: 'Which heading tag offers the biggest output?',
      answers: {
        a: 'h5',
        b: 'h3',
        c: 'h1',
        d: 'h2',
      },
      correctAnswer: 'c',
    },
    {
      question:
        "What is the index of Nissan?  let cars = ['Ford', 'Nissan', 'Honda', 'GMC']",
      answers: {
        a: 2,
        b: 1,
        c: 0,
        d: 3,
      },
      correctAnswer: 'b',
    },
    {
      question: 'What way[s] can CSS be added to HTML documents?',
      answers: {
        a: 'External',
        b: 'Internal',
        c: 'Inline',
        d: 'All of the above',
      },
      correctAnswer: 'd',
    },
    {
      question:
        '<b>BONUS:</b> I take three steps forward, one step to the right and then two steps back. How many steps forward did I end up taken?',
      answers: {
        a: 'Three',
        b: 'Two',
        c: 'One',
        d: 'Four',
      },
      correctAnswer: 'c',
    },
  ];
  setQuiz();

  submitButton.addEventListener('click', visibleResults);
