import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

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

export default SessionBtns
