const yearInput = document.getElementById('year-input');
const monthInput = document.getElementById('month-input');
const dayInput = document.getElementById('day-input');
const errorText = document.getElementsByClassName('error-text');
const btn = document.getElementById('btn');
const resulatYear = document.getElementById('result-year');
const resulatMonth = document.getElementById('result-month');
const resulatDay = document.getElementById('result-day');
const presentDate = new Date();
const presentYear = presentDate.getFullYear();
const presentMonth = presentDate.getMonth() + 1;
const presentDay = presentDate.getDate();


function showError(element, index, text) {
  element.style.display = 1;
  element.style.borderColor = 'hsl(0, 100%, 67%)';
  errorText[index].innerText = text;
}

function hideError(element, index) {
  element.style.display = 0;
  element.style.borderColor = '';
  errorText[index].innerText = '';
}

function calculateAge() {

  if (errorText[0].innerHTML === '' && errorText[1].innerHTML === '' && errorText[2].innerHTML === '') {
    const presentDateToHours = (new Date(`${presentYear}-${presentMonth}-${presentDay}`).getTime()) / 1000 / 60 / 60;
    const dateOfBirthToHours = (new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`).getTime()) / 1000 / 60 / 60;
    const age = (presentDateToHours + 473364) - (dateOfBirthToHours + 473364);
    const year = Math.floor(age / 8766);
    const month = Math.floor(age % 8766 / 730.485);
    const day = Math.floor(age % 8766 % 730.485 / 24);

    resulatYear.innerHTML = `${year}`;
    resulatMonth.innerHTML = `${month}`;
    resulatDay.innerHTML = `${day}`;
  }
}

function handleError(input, index, errorMessage, condition) {
  switch (input.value) {
    case '':
      showError(input, index, 'This field is required');
      break;
    default:
      if (condition) {
        showError(input, index, errorMessage);
      } else {
        hideError(input, index);
      }
  }
}

function handleButtonClick() {
  if (yearInput.value !== '' && yearInput.value.length < 4) {
    showError(yearInput, 2, 'Must be a valid year')
  } else {
    handleError(yearInput, 2, 'Must be in the past', yearInput.value > presentYear);
  }

  handleError(monthInput, 1, 'Must be a valid month', monthInput.value > 12);

  handleError(dayInput, 0, 'Must be a valid day', dayInput.value > 31);

  calculateAge()

}

function handleInput(input, index) {

  if (input.value < 0) {
    input.value = 0;
  }
  if (input.value.length++ || input.value.length-- || input.value === '') {
    hideError(input, index)
    resulatYear.innerHTML = '- -';
    resulatMonth.innerHTML = '- -';
    resulatDay.innerHTML = '- -';
  }
}

addEventListener('keyup', (event) => {
  if (event.key === 'Enter') {
    handleButtonClick()
  }
})

btn.addEventListener('click', handleButtonClick)

yearInput.addEventListener('input', function () {
  // Remove non-numeric characters and 'e' or 'E' from the input value
  this.value = this.value.replace(/[eE]/g, '');
  handleInput(yearInput, 2)
})

monthInput.addEventListener('input', function () {
  // Remove non-numeric characters and 'e' or 'E' from the input value
  this.value = this.value.replace(/[eE]/g, '');
  handleInput(monthInput, 1)
})

dayInput.addEventListener('input', function () {
  // Remove non-numeric characters and 'e' or 'E' from the input value
  this.value = this.value.replace(/[eE]/g, '');
  handleInput(dayInput, 0)
})
