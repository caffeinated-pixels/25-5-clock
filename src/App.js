import React, { Component } from 'react'

const initialState = {
  intClock: 1500, // the real clock! default = 1500 secs
  isTimerRunning: false,
  intervalId: null, // store the setInterval() id so we can stop the timer
  workTime: true, // are we on the work session?; false = break session
  breakLength: 5, // default = 5; min = 1; max = 60
  workLength: 25 // default = 25; min = 1; max = 60
}

class App extends Component {
  state = { ...initialState } // initialize state values

  // TODO: need to stop timer before switching to new countdown
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

          return {
            ...prevState,
            intClock: newTime,
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

  // TODO: refactor handleIncrement & handleDecrement into single fn??? Seem to repeat a fair amount of code here
  handleIncrement = input => {
    this.setState(prevState => {
      const newSessionLength = prevState[input] + 1
      const newTime = newSessionLength * 60

      // only increment if <60 and timer stopped
      if (prevState[input] < 60 && !this.state.isTimerRunning) {
        // if currently in work session
        if (prevState.workTime && input === 'workLength') {
          return {
            ...prevState,
            intClock: newTime,
            workLength: newSessionLength
          }
        }

        // if currently in break session
        else if (!prevState.workTime && input === 'breakLength') {
          return {
            ...prevState,
            intClock: newTime,
            breakLength: newSessionLength
          }
        } else {
          return { ...prevState, [input]: newSessionLength }
        }
      } else {
        return { ...prevState }
      }
    })
  }

  handleDecrement = input => {
    this.setState(prevState => {
      const newSessionLength = prevState[input] - 1
      const newTime = newSessionLength * 60

      /* We only want the user to update session times when the timer is stopped.
      If we are currently in the session being changed, the display needs to update */

      // only increment if >1 and timer stopped
      if (prevState[input] > 1 && !this.state.isTimerRunning) {
        // if currently in work session & changing workLength
        if (prevState.workTime && input === 'workLength') {
          return {
            ...prevState,
            intClock: newTime,
            workLength: newSessionLength
          }
        }
        // if currently in break session & changing breakLength
        else if (!prevState.workTime && input === 'breakLength') {
          return {
            ...prevState,
            intClock: newTime,
            breakLength: newSessionLength
          }
        } else {
          return { ...prevState, [input]: newSessionLength }
        }
      } else {
        return { ...prevState }
      }
    })
  }

  // HELPER FUNCTIONS
  calcDisplaytime = () => {
    let newMin = String(Math.floor(this.state.intClock / 60)) // get quotient
    let newSecs = String(this.state.intClock % 60) // get remainder

    // need to add zero for single digit numbers
    if (newMin.length === 1) newMin = '0' + newMin
    if (newSecs.length === 1) newSecs = '0' + newSecs

    return newMin + ':' + newSecs
  }

  // RENDER TIME
  render() {
    return (
      <main className="main-wrapper">
        <Header />
        <Timer
          handleStartStop={this.handleStartStop}
          handleReset={this.handleReset}
          workTime={this.state.workTime}
          calcDisplaytime={this.calcDisplaytime}
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
  // assign text based on state.workTime
  const timerLabel = props.workTime ? 'Work it baby!' : 'Slacking time!'

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
          {props.calcDisplaytime()}
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
