const startButton = document.querySelector('.start')
const resetButton = document.querySelector('.reset')
const stopButton = document.querySelector('.stop')
const timeBox = document.querySelector('.timeBox')
const leftTime = document.querySelector('.leftTime')
const inputMinutes = document.querySelector('.minutes')
const inputSeconds = document.querySelector('.seconds')
const leftMinutes = document.querySelector('.leftMinutes')
const leftSeconds = document.querySelector('.leftSeconds')
let timeId;
let stopTime = 0  //暫停後存取剩餘時間
// 監聽事件
startButton.addEventListener('click', start)
stopButton.addEventListener('click', stop)
resetButton.addEventListener('click', reset)
//按下開始
function start() {
  const setMinutes = Number(inputMinutes.value)
  const setSeconds = Number(inputSeconds.value)
  resetButton.classList.remove('resetMove')
  if (startButton.style.top === '15px') return
  if (setMinutes > 30 || setMinutes < 0 || setSeconds > 59 || setSeconds < 0 || (setMinutes === 30 && setSeconds > 0)) {
    return alert(`計時器最多計時 30 分鐘\n分鐘請輸入範圍 0 ~ 30\n秒數請輸入範圍 0 ~ 59`)
  } else if (setMinutes === 0 && setSeconds === 0) {
    return alert(`無法計時 0 分 0 秒喔!`)
  }
  if (stopTime) {
    renderLeftTime(stopTime)
    startTikTok(stopTime)
  } else {
    renderLeftTime(setMinutes * 60 + setSeconds)
    startTikTok(setMinutes * 60 + setSeconds)
  }
  timeBox.style.display = 'none'
  leftTime.style.display = 'flex'
  startButton.style.top = '15px'
  stopButton.style.top = null
}
// 按下暫停
function stop() {
  leftTime.style.display === 'none' ? stopButton.style.top = null : stopButton.style.top = '15px'
  startButton.style.top = null
  clearInterval(timeId)
}
// 按下重設
function reset(event) {
  if (startButton.style.top === '15px') return
  resetButton.classList.add('resetMove')
  resetButton.style.top = null
  startButton.style.top = null
  stopButton.style.top = null
  timeBox.style.display = 'flex'
  leftTime.style.display = 'none'
  stopTime = 0
}
//渲染剩餘時間
function renderLeftTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  leftTime.innerHTML = `
    <span class="leftMinutes">${String(minutes).padStart(2, 0)}</span>
    <span class="center-dot">:</span>
    <span class="leftSeconds">${String(seconds).padStart(2, 0)}</span>
  `
}
//開始倒數
function startTikTok(seconds) {
  const timeup = Date.now() + seconds * 1000
  timeId = setInterval(() => {
    const remainingSeconds = Math.round((timeup - Date.now()) / 1000)
    if (remainingSeconds < 0) {
      clearInterval(timeId)
      startButton.style.top = null
      timeBox.style.display = 'flex'
      leftTime.style.display = 'none'
      return alert(`Time's up`)
    }
    stopTime = remainingSeconds
    renderLeftTime(remainingSeconds)
  }, 1000)
}