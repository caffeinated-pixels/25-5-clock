import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons'

const SettingsGroup = props => {
  return (
    <div>
      <div id={`${props.idText}-label`} className="settings-label">
        {props.name}
      </div>
      <div className="settings-wrapper">
        <button
          id={`${props.idText}-increment`}
          className="settings-btn"
          onClick={() => props.handleIncrement(props.fnInput)}
          aria-label={`Increment ${props.idText} timer`}
        >
          <FontAwesomeIcon icon={faPlus} className="icon" />
        </button>
        <div id={`${props.idText}-length`} className="settings-time">
          {props.timerLength}
        </div>
        <button
          id={`${props.idText}-decrement`}
          className="settings-btn"
          onClick={() => props.handleDecrement(props.fnInput)}
          aria-label={`Decrement ${props.idText} timer`}
        >
          <FontAwesomeIcon icon={faMinus} className="icon" />
        </button>
      </div>
    </div>
  )
}

export default SettingsGroup
