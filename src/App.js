import React, { Component } from 'react'

class App extends Component {
  state = {
    intClock: 1500,
    min: '25',
    secs: '00',
    breakLength: 5,
    workLength: 25,
    isTimerRunning: false
  }

  handleStartStop = () => {
    console.log('Start button clicked')
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
