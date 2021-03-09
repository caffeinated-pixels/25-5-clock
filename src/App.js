import React, { Component } from 'react'
import initialState from './initialState'
import Header from './Header'
import Timer from './Timer'
import SessionBtns from './SessionBtns'
import Footer from './Footer'
import alarm from './media/alarm.mp3'

class App extends Component {
  state = { ...initialState } // initialize state values

  // EVENT HANDLERS
  handleStartStop = () => {
    if (!this.state.isTimerRunning) {
      // runTimer executes setInterval() and returns the intervalId, which we need for clearInterval() to stop the timer
      this.setState({ intervalId: this.runTimer(), isTimerRunning: true })
    } else {
      clearInterval(this.state.intervalId) // stop the timer
      this.setState({ isTimerRunning: false })
    }
  }

  handleReset = () => {
    clearInterval(this.state.intervalId) // stop timer if running

    this.setState({ ...initialState }) // reset all values in state

    this.refs.alarm.pause() // stop the alarm sound
    this.refs.alarm.currentTime = 0 // rewind the sound clip
  }

  /* For Increment/Decrement, we only update session times when the timer is stopped.
  If we are currently in the session being changed, the display needs to update */
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
    // returns the value (intervalId) from setInterval so we can stop the timer later using clearInterval(this.state.intervalId)
    return setInterval(() => {
      this.setState(prevState => {
        if (prevState.intClock === 0) {
          // if timer reaches 0, play the alarm sound and switch to the new timer
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

        const newTime = prevState.intClock - 1 // decrement intClock

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

    return newMin + ':' + newSecs // retrun in mm:ss format
  }

  // RENDER TIME
  render() {
    return (
      <>
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
          <audio id="beep" src={alarm} preload="auto" ref="alarm" />
        </main>
        <Footer />
      </>
    )
  }
}

export default App
