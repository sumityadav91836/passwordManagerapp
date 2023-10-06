import './style.css'

const PasswordItem = props => {
  const {passwordDetails, onDeletePassword, passwordNum} = props
  const {id, websiteName, username, password, checkboxInput} = passwordDetails
  const {passwordCount} = passwordNum
  const iconNameLatter = websiteName[0].toUpperCase()

  const showOrHidePassword = checkboxInput ? (
    password
  ) : (
    <img
      src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
      alt="stars"
      className="stars"
    />
  )

  const onClickingDeleteButton = () => {
    onDeletePassword(id)
  }

  const renderNoPasswordsSection = () => (
    <li className="list-item-no-password">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
        alt="no passwords"
        className="no-password-img"
      />
      <p className="no-password-text">No Passwords</p>
    </li>
  )

  const renderPasswordSection = () => (
    <li className="password-item-container">
      <div className="icon-container">
        <h1 className="icon">{iconNameLatter}</h1>
      </div>
      <div>
        <p className="password-item-text">{websiteName}</p>
        <p className="password-item-text">{username}</p>
        <p className="password-item-text">{showOrHidePassword}</p>
      </div>
      <button
        data-testid="delete"
        type="button"
        className="del-icon-container"
        onClick={onClickingDeleteButton}
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
          alt="delete"
          className="del-icon"
        />
      </button>
    </li>
  )

  return (
    <>
      {passwordCount === 0
        ? renderNoPasswordsSection()
        : renderPasswordSection()}
    </>
  )
}

export default PasswordItem
