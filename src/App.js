import React, { Component } from 'react'

class App extends Component {
  state = {
    intClock: 10, // the real clock!
    min: '25', // quotient of intClock / 60
    secs: '00', // remainder of intClock / 60 (ie intClock % 60)
    isTimerRunning: false,
    intervalId: null, // store the setInterval() id so we can stop the timer
    workTime: true, // are we on the work session?; false = break session
    breakLength: 5,
    workLength: 25
  }

  handleStartStop = () => {
    if (!this.state.isTimerRunning) {
      console.log('clock start')

      // we need to put the intervalId into state so that we can stop later using clearInterval()
      const newIntervalId = setInterval(() => {
        this.setState(prevState => {
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

  render() {
    return (
      <main className="main-wrapper">
        <Header />
        <Timer
          min={this.state.min}
          secs={this.state.secs}
          handleStartStop={this.handleStartStop}
        />
        <SessionBtns
          breakLength={this.state.breakLength}
          workLength={this.state.workLength}
        />
      </main>
    )
  }
}

const Header = () => {
  return <h1>Pomodoro Clock</h1>
}

const Timer = props => {
  return (
    <div>
      <div id="timer-label" className="timer-label">
        Work it baby!
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
        <button id="reset" className="reset">
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
          <button id="break-increment" className="settings-btn">
            +
          </button>
          <div>{props.breakLength}</div>
          <button id="break-decrement" className="settings-btn">
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
          <button id="session-increment" className="settings-btn">
            +
          </button>
          <div>{props.workLength}</div>
          <button id="session-decrement" className="settings-btn">
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
