import React, { Component } from 'react'

const initialState = {
  intClock: 1500, // the real clock! default = 1500 secs
  min: '25', // quotient of intClock / 60
  secs: '00', // remainder of intClock / 60 (ie intClock % 60)
  isTimerRunning: false,
  intervalId: null, // store the setInterval() id so we can stop the timer
  workTime: true, // are we on the work session?; false = break session
  breakLength: 5, // default = 5; min = 1; max = 60
  workLength: 25 // default = 25; min = 1; max = 60
}

class App extends Component {
  state = { ...initialState } // initialize state values

  handleStartStop = () => {
    if (!this.state.isTimerRunning) {
      console.log('clock start')

      // we need to put the intervalId into state so that we can stop later using clearInterval()
      const newIntervalId = setInterval(() => {
        this.setState(prevState => {
          if (prevState.intClock === 0 && prevState.workTime) {
            // switch to break clock
            console.log('switch to breaktime')
            return {
              ...prevState,
              intClock: prevState.breakLength * 60,
              workTime: false
            }
          } else if (prevState.intClock === 0 && !prevState.workTime) {
            // switch to work clock
            console.log('switch to worktime')
            return {
              ...prevState,
              intClock: prevState.workLength * 60,
              workTime: true
            }
          }

          const newTime = prevState.intClock - 1

          let newMin = String(Math.floor(newTime / 60)) // get quotient
          let newSecs = String(newTime % 60) // get remainder

          // need to add zero for single digit numbers
          if (newMin.length === 1) newMin = '0' + newMin
          if (newSecs.length === 1) newSecs = '0' + newSecs

          return {
            ...prevState,
            intClock: newTime,
            min: newMin,
            secs: newSecs,
            isTimerRunning: true,
            intervalId: newIntervalId
          }
        })
      }, 1000)
    } else {
      console.log('clock stop')
      this.setState(prevState => {
        clearInterval(prevState.intervalId)
        return { ...prevState, isTimerRunning: false }
      })
    }
  }

  handleReset = () => {
    console.log('reset clicked')
    clearInterval(this.state.intervalId) // stop timer if running

    // reset all values in state
    this.setState({ ...initialState })
  }

  handleIncrement = input => {
    this.setState(prevState => {
      // only increment if <60 and timer stopped
      if (prevState[input] < 60 && !this.state.isTimerRunning) {
        return { ...prevState, [input]: prevState[input] + 1 }
      } else {
        return { ...prevState }
      }
    })
  }

  handleDecrement = input => {
    this.setState(prevState => {
      // only decrement if >1 and timer stopped
      if (prevState[input] > 1 && !this.state.isTimerRunning) {
        return { ...prevState, [input]: prevState[input] - 1 }
      } else {
        return { ...prevState }
      }
    })
  }

  render() {
    return (
      <main className="main-wrapper">
        <Header />
        <Timer
          min={this.state.min}
          secs={this.state.secs}
          handleStartStop={this.handleStartStop}
          handleReset={this.handleReset}
          workTime={this.state.workTime}
        />
        <SessionBtns
          breakLength={this.state.breakLength}
          workLength={this.state.workLength}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
      </main>
    )
  }
}

const Header = () => {
  return <h1>Pomodoro Clock</h1>
}

const Timer = props => {
  let timerLabel // assign text based on state.workTime
  props.workTime
    ? (timerLabel = 'Work it baby!')
    : (timerLabel = 'Slacking time!')

  return (
    <div>
      <div id="timer-label" className="timer-label">
        {timerLabel}
      </div>
      <div className="timer-wrapper">
        <button
          id="start_stop"
          className="start-stop"
          onClick={props.handleStartStop}
        >
          P
        </button>
        <div id="time-left" className="time-left">
          {props.min}:{props.secs}
        </div>
        <button id="reset" className="reset" onClick={props.handleReset}>
          R
        </button>
      </div>
    </div>
  )
}

const SessionBtns = props => {
  return (
    <div className="outer-settings-wrapper">
      <div className="break-wrapper">
        <div id="break-label" className="settings-label">
          Breaktime
        </div>
        <div className="settings-wrapper">
          <button
            id="break-increment"
            className="settings-btn"
            onClick={() => props.handleIncrement('breakLength')}
          >
            +
          </button>
          <div id="break-length">{props.breakLength}</div>
          <button
            id="break-decrement"
            className="settings-btn"
            onClick={() => props.handleDecrement('breakLength')}
          >
            -
          </button>
        </div>
      </div>

      <div className="session-wrapper">
        <div className="settings-wrapper"></div>
        <div id="session-label" className="settings-label">
          Worktime
        </div>
        <div className="settings-wrapper">
          <button
            id="session-increment"
            className="settings-btn"
            onClick={() => props.handleIncrement('workLength')}
          >
            +
          </button>
          <div id="session-length">{props.workLength}</div>
          <button
            id="session-decrement"
            className="settings-btn"
            onClick={() => props.handleDecrement('workLength')}
          >
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
