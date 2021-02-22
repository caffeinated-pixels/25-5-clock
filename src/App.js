import React, { Component } from 'react'

class App extends Component {
  state = {
    timerDisplay: '25:00',
    breakLength: 5,
    workLength: 25,
    isTimerRunning: false
  }

  render() {
    return (
      <main className="main-wrapper">
        <Header />
        <Timer />
        <SessionBtns />
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
        <button id="start_stop" className="start-stop">
          P
        </button>
        <div id="time-left" className="time-left">
          25:00
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
          <div>5</div>
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
          <div>5</div>
          <button id="session-decrement" className="settings-btn">
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
