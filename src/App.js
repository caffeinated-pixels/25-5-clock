import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faRedoAlt,
  faPlay,
  faPlus,
  faMinus,
  faPause
} from '@fortawesome/free-solid-svg-icons'
import { faGithubSquare } from '@fortawesome/free-brands-svg-icons'

const initialState = {
  intClock: 1500, // the internal seconds count; default = 1500 secs
  isTimerRunning: false, // self-explantory really!
  intervalId: null, // store the setInterval() id so we can stop the timer
  workTime: true, // true = work timer; false = break timer
  breakLength: 5, // default = 5; min = 1; max = 60
  workLength: 25 // default = 25; min = 1; max = 60
}

class App extends Component {
  state = { ...initialState } // initialize state values

  handleStartStop = () => {
    if (!this.state.isTimerRunning) {
      // runTimer executes setInterval() and returns the intervalId, which we need for clearInterval() to stop the timer
      this.setState({ intervalId: this.runTimer(), isTimerRunning: true })
    } else {
      clearInterval(this.state.intervalId)
      this.setState({ isTimerRunning: false })
    }
  }

  handleReset = () => {
    clearInterval(this.state.intervalId) // stop timer if running

    // reset all values in state
    this.setState({ ...initialState })
    this.refs.alarm.pause() // stop the alarm sound
    this.refs.alarm.currentTime = 0 // rewind the clip
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
  runTimer = () => {
    // we return the value (intervalId) from setInterval so we can stop the timer later using clearInterval(this.state.intervalId)
    return setInterval(() => {
      this.setState(prevState => {
        if (prevState.intClock === 0) {
          // we timer reaches we play the alarm sound and switch to the new timer
          this.refs.alarm.play()
          if (prevState.workTime) {
            // switch to break clock
            return {
              ...prevState,
              intClock: prevState.breakLength * 60,
              workTime: false
            }
          } else {
            // switch to work clock
            return {
              ...prevState,
              intClock: prevState.workLength * 60,
              workTime: true
            }
          }
        }

        const newTime = prevState.intClock - 1

        return {
          ...prevState,
          intClock: newTime
        }
      })
    }, 1000)
  }

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
          calcDisplaytime={this.calcDisplaytime}
          workTime={this.state.workTime}
          intClock={this.state.intClock}
          isTimerRunning={this.state.isTimerRunning}
        />
        <SessionBtns
          breakLength={this.state.breakLength}
          workLength={this.state.workLength}
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
        <Footer />
        <audio
          id="beep"
          src="https://raw.githubusercontent.com/caffeinated-pixels/alarmsounds/main/alarm.mp3"
          preload="auto"
          ref="alarm"
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
  const timeClass = props.intClock < 61 ? 'time-left warning' : 'time-left'

  const playPause = props.isTimerRunning ? faPause : faPlay
  const ariaLabel = props.isTimerRunning ? 'Pause timer' : 'Start timer'

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
          aria-label={ariaLabel}
        >
          <FontAwesomeIcon icon={playPause} className="icon" />
        </button>
        <div id="time-left" className={timeClass}>
          {props.calcDisplaytime()}
          <hr />
        </div>
        <button
          id="reset"
          className="reset"
          onClick={props.handleReset}
          aria-label="Reset timer"
        >
          <FontAwesomeIcon icon={faRedoAlt} className="icon" />
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
          Break timer
        </div>
        <div className="settings-wrapper">
          <button
            id="break-increment"
            className="settings-btn"
            onClick={() => props.handleIncrement('breakLength')}
            aria-label="Increment break timer"
          >
            <FontAwesomeIcon icon={faPlus} className="icon" />
          </button>
          <div id="break-length" className="settings-time">
            {props.breakLength}
          </div>
          <button
            id="break-decrement"
            className="settings-btn"
            onClick={() => props.handleDecrement('breakLength')}
            aria-label="Decrement break timer"
          >
            <FontAwesomeIcon icon={faMinus} className="icon" />
          </button>
        </div>
      </div>

      <div className="session-wrapper">
        <div id="session-label" className="settings-label">
          Work timer
        </div>
        <div className="settings-wrapper">
          <button
            id="session-increment"
            className="settings-btn"
            onClick={() => props.handleIncrement('workLength')}
            aria-label="Increment work timer"
          >
            <FontAwesomeIcon icon={faPlus} className="icon" />
          </button>
          <div id="session-length" className="settings-time">
            {props.workLength}
          </div>
          <button
            id="session-decrement"
            className="settings-btn"
            onClick={() => props.handleDecrement('workLength')}
            aria-label="Decrement work timer"
          >
            <FontAwesomeIcon icon={faMinus} className="icon" />
          </button>
        </div>
      </div>
    </div>
  )
}

const Footer = () => {
  return (
    <footer>
      <p>
        Coded by{' '}
        <a
          href="https://steviegill-webportfolio.netlify.app/"
          title="Stevie's web app portofolio page"
        >
          Stevie Gill
        </a>
        {'; '}
        <a href="#" title="JS calculator Github repo">
          <FontAwesomeIcon icon={faGithubSquare} className="githubIcon" /> repo
        </a>
      </p>
    </footer>
  )
}

export default App
