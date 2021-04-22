(function () {
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
        `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div>
            <div class="answers"> ${answers.join('')} </div>
      </div>`
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

  function slideShow(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      preButton.style.display = 'none';
    } else {
      preButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
    } else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function nextSlide() {
    slideShow(currentSlide + 1);
  }
  function previousSlide() {
    slideShow(currentSlide - 1);
  }
  const quizHolder = document.getElementById('quiz');
  const resultsHolder = document.getElementById('results');
  const submitButton = document.getElementById('submit');

  const myQuestions = [
    {
      question: '<b>(1).</b> Which heading tag offers the biggest output?',
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
        "(2). What is the index of Nissan?  let cars = ['Ford', 'Nissan', 'Honda', 'GMC']",
      answers: {
        a: 2,
        b: 1,
        c: 0,
        d: 3,
      },
      correctAnswer: 'b',
    },
    {
      question: '(3). What way[s] can CSS be added to HTML documents?',
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

  const preButton = document.getElementById('previous');
  const nextButton = document.getElementById('next');
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;

  slideShow(currentSlide);
  submitButton.addEventListener('click', visibleResults);
  preButton.addEventListener('click', previousSlide);
  nextButton.addEventListener('click', nextSlide);
})();
