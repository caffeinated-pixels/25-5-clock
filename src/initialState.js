const initialState = {
  intClock: 1500, // internal seconds countdown; default = 1500 secs
  isTimerRunning: false, // self-explantory really!
  intervalId: null, // store the setInterval() id so we can stop the timer
  workTime: true, // true = work timer; false = break timer
  breakLength: 5, // default = 5; min = 1; max = 60
  workLength: 25, // default = 25; min = 1; max = 60
  audioUnlocked: false
}

export default initialState
