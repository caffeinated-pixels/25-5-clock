import SettingsGroup from './SettingsGroup'

const SessionBtns = props => {
  return (
    <div className="outer-settings-wrapper">
      <SettingsGroup
        handleIncrement={props.handleIncrement}
        handleDecrement={props.handleDecrement}
        idText="break"
        fnInput="breakLength"
        timerLength={props.breakLength}
        name="Break timer"
      />
      <SettingsGroup
        handleIncrement={props.handleIncrement}
        handleDecrement={props.handleDecrement}
        idText="session"
        fnInput="workLength"
        timerLength={props.workLength}
        name="Work timer"
      />
    </div>
  )
}

export default SessionBtns
