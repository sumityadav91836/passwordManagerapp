import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import PasswordItem from '../PasswordItem'
import './style.css'

class PasswordManager extends Component {
  state = {
    websiteName: '',
    username: '',
    password: '',
    passwordList: [],
    checkboxInput: false,
  }

  onChangeWebsite = event => {
    this.setState({
      websiteName: event.target.value,
    })
  }

  onChangeUsername = event => {
    this.setState({
      username: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onAddPassword = event => {
    event.preventDefault()
    const {websiteName, username, password} = this.state

    const newPassword = {
      id: uuidv4(),
      websiteName,
      username,
      password,
    }

    this.setState(prevState => ({
      passwordList: [...prevState.passwordList, newPassword],
      websiteName: '',
      username: '',
      password: '',
      searchInput: '',
      checkboxInput: false,
    }))
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onDeletePassword = uniqueId => {
    const {passwordList} = this.state
    const filteredPasswordData = passwordList.filter(
      eachPassword => eachPassword.id !== uniqueId,
    )

    this.setState({
      passwordList: filteredPasswordData,
    })
  }

  onChangeCheckbox = event => {
    if (event.target.value) {
      this.setState(prevState => ({
        checkboxInput: !prevState.checkboxInput,
      }))
    }
  }

  render() {
    const {
      websiteName,
      username,
      password,
      searchInput,
      passwordList,
      checkboxInput,
    } = this.state
    const searchResult = passwordList.filter(eachPassword =>
      eachPassword.websiteName
        .toLowerCase()
        .includes(searchInput.toLowerCase()),
    )

    const passwordCount = passwordList.length

    return (
      <div className="app-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="password-container">
          <div className="add-new-password-section">
            <h1 className="add-new-password-text">Add New Password</h1>
            <form className="form-control" onSubmit={this.onAddPassword}>
              <div className="input-elements">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                  alt="website"
                  className="logo"
                />
                <input
                  type="text"
                  className="input"
                  value={websiteName}
                  placeholder="Enter Website"
                  onChange={this.onChangeWebsite}
                />
              </div>
              <div className="input-elements">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                  alt="username"
                  className="logo"
                />
                <input
                  type="text"
                  value={username}
                  className="input"
                  placeholder="Enter Username"
                  onChange={this.onChangeUsername}
                />
              </div>
              <div className="input-elements">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png "
                  alt="password"
                  className="logo"
                />
                <input
                  type="password"
                  value={password}
                  className="input"
                  placeholder="Enter Password"
                  onChange={this.onChangePassword}
                />
              </div>
              <button className="add-password-button" type="submit">
                Add
              </button>
            </form>
          </div>
          <div className="password-container-img">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-manager-img"
            />
          </div>
        </div>
        <div className="saved-password-section">
          <div className="header">
            <div className="header-password-count-section">
              <h1 className="header-text">Your Passwords</h1>
              <p className="no-of-passwords">{passwordCount}</p>
            </div>
            <div className="search-container">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="search-icon"
              />
              <input
                type="search"
                placeholder="Search"
                className="search-input"
                onChange={this.onChangeSearchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password-container">
            <input
              type="checkbox"
              className="checkbox"
              id="checkbox"
              onChange={this.onChangeCheckbox}
              value={checkboxInput}
            />
            <label htmlFor="checkbox" className="show-password-text">
              Show Passwords
            </label>
          </div>
          <ul className="password-items">
            {searchResult.map(eachPassword => (
              <PasswordItem
                key={eachPassword.id}
                passwordDetails={eachPassword}
                onDeletePassword={this.onDeletePassword}
                passwordNum={passwordCount}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default PasswordManager
