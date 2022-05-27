let yourVoteTo = document.querySelector('.main--screen--1 span');
let title = document.querySelector('.main--screen--2 span');
let dataApplicants = document.querySelector('.main--screen--4');
let footerDescription = document.querySelector('.ballot--footer--screen');
let rightSide = document.querySelector('.ballot--main--screen--right');
let numbers = document.querySelector('.main--screen--3');

let currentStep = 0;
let number = '';
let whiteVote = false;
let votes = [];

function startStep() {
  let step = steps[currentStep];

  let numberHTML = '';
  number = '';
  let whiteVote = false;

  for(i=0; i<step.numbers; i++){
    if(i === 0){
      numberHTML += '<div class="number blinks"></div>'
    } else {
      numberHTML += '<div class="number"></div>'
    }
  }

  yourVoteTo.style.display = 'none';
  title.innerHTML = step.title;
  dataApplicants.innerHTML = '';
  footerDescription.style.display = 'none';
  rightSide.innerHTML = '';
  numbers.innerHTML = numberHTML;
  
}

function updateInterface() {
  let step = steps[currentStep];
  let applicant = step.applicants.filter((item) => {
    if(item.number === number) {
      return true;
    } else {
      return false;
    }
  });
  if(applicant.length > 0 && applicant.number !== null) {
    applicant = applicant[0]
    yourVoteTo.style.display = 'block';
    dataApplicants.innerHTML = `Nome: ${applicant.name}</br>Partido: ${applicant.sides}`;
    footerDescription.style.display = 'block';

    let imageHTML = '';

    for(let i in applicant.images) {
      if(applicant.images[i].small){
        imageHTML += `<div  class="screen--right--image small"><img src="./assets/img/${applicant.images[i].url}" alt="${applicant.images[i].caption}">${applicant.images[i].caption}</div>`;
      } else {
          imageHTML += `<div class="screen--right--image"><img src="./assets/img/${applicant.images[i].url}" alt="${applicant.images[i].caption}">${applicant.images[i].caption}</div>`;
        }
    };

    rightSide.innerHTML = imageHTML;
  } else if(number === '00000' | number === '00') {
    yourVoteTo.style.display = 'block';
    footerDescription.style.display = 'block';
    dataApplicants.innerHTML = `<div class="big--notice blinks">VOTO NULO</div>`
  } else {
    alert('Preencha todos os espaços com o numero 0 (zero) para votar nulo, ou então escolha um candidato')
    startStep()
  }
}

function clicked(n) {
  let elNumber = document.querySelector('.number.blinks')
  if(elNumber !== null) {
    elNumber.innerHTML = n;
    number = `${number}${n}`;

    elNumber.classList.remove('blinks');
    if(elNumber.nextElementSibling !== null) {
      elNumber.nextElementSibling.classList.add('blinks');
    } else {
      updateInterface();
    }
  }
};

function white() {
  number = ''
  whiteVote = true;
  yourVoteTo.style.display = 'block';
  footerDescription.style.display = 'block';
  numbers.innerHTML = '';
  dataApplicants.innerHTML = `<div class="big--notice blinks">VOTO EM BRANCO</div>`;
  rightSide.innerHTML = '';
};

function fixes() {
  startStep();
  whiteVote = false
};

function confirm() {
  let step = steps[currentStep];

  let confirmedVote = false;

  if(whiteVote === true) {
    confirmedVote = true
    console.log('Confirmando como BRANCO...');
    votes.push({
      step: steps[currentStep].title,
      vote: 'BRANCO',
    });
  } else if(number.length === step.numbers) {
    confirmedVote = true;
    console.log(`Confirmando como ${number}...`);
    votes.push({
      step: steps[currentStep].title,
      vote: number,
    });
  };

  if(confirmedVote) {
    currentStep++;

    if(steps[currentStep] !== undefined){
      whiteVote = false
      startStep();
    } else {
      document.querySelector('.ballot--screen').innerHTML = `<div class="giant--notice blinks">FIM</div>`
      console.log(votes);
    }
  }
};

startStep()