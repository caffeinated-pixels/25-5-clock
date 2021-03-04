import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRedoAlt, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'

const Timer = props => {
  // Conditional rendering
  const timerLabel = props.workTime ? 'Work it baby!' : 'Slacking time!'
  const timeClass = props.intClock < 61 ? 'time-left warning' : 'time-left'

  const playPause = props.isTimerRunning ? faPause : faPlay
  const ariaLabel = props.isTimerRunning ? 'Pause timer' : 'Start timer'

  return (
    <>
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
          <p>{props.calcDisplaytime()}</p>
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
    </>
  )
}

export default Timer
