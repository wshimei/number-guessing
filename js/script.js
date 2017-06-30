/* global location */
var random = gRandomNo(100, 1)
var input = document.querySelector('.input')
var inputArr = [0, 100]
var submit = document.querySelector('.submit')
var gameOver = false
var tries = 0

submit.addEventListener('click', checkNumber)
input.addEventListener('keydown', function (e) {
  if (e.keyCode === 13) {
    checkNumber()
  }
})

function gRandomNo (max, min) {
  var randomNo = Math.floor(Math.random() * (max - min) + min)
  return randomNo
}

function changeH1 (str) {
  document.querySelector('h1').textContent = str
}

function changeP () {
  document.querySelector('p').textContent = 'hint: ' + 'between ' + inputArr[0] + ' and ' + inputArr[1]
}

function checkNumber () {
  var inputted = Number(input.value)
  checkBetween()
  if (inputted < random) {
    changeH1('your guess is too low, try again')
  } else if (inputted > random) {
    changeH1('your guess is too high, try again')
  } else if (inputted === random) {
    changeH1('YAY! you are correct!')
    document.querySelector('p').textContent = ('total tries: ' + (tries + 1))
    gameOver = true
  }
  tries += 1
  checkGameOver()
}

function checkBetween () {
  var inputted = Number(input.value)
  if (inputted > random && inputted > inputArr[0]) {
    inputArr.pop()
    inputArr.push(inputted)
  } else if (inputted < random && inputted > inputArr[0]) {
    inputArr.shift()
    inputArr.unshift(inputted)
  } else if (inputted > random && inputted > inputArr[1]) {
    inputArr.shift()
    inputArr.unshift(inputted)
  } else if (inputted < random && inputted < inputArr[1]) {
    inputArr.pop()
    inputArr.push(inputted)
  }
  changeP()
}

function checkGameOver () {
  if (gameOver) {
    gameOver = false

    input.parentNode.removeChild(input)
    submit.parentNode.removeChild(submit)

    var resetButton = document.createElement('button')
    resetButton.textContent = 'play again!'
    document.body.appendChild(resetButton)
    resetButton.addEventListener('click', function () {
      location.reload()
    })
  }
}
