import React from 'react';
import './styles/settings.css'

function Settings() {
  const [settingsForm, setSettingsForm] = React.useState({
    usernameChange: '',
    emailChange: '',
    passwordChange: '',
    passChangeConfirm: ''
  })

  const handleChange = (e) => {
    setSettingsForm({
      [e.target.name]: [e.target.value]
    })
  }

  return (
    <div class="centergrid">
      <div className="settings-container">
        <form>
          <label for="usernameChange">Change Username</label>
          <input type="text" id="usernameChange" placeholder="Username" onChange={handleChange} />
          <label for="emailChange">Change Email</label>
          <input type="email" id="emailChange" placeholder="Email" onChange={handleChange} />
          <label for="passwordChange">Change Password</label>
          <input type="text" id="passwordChange" placeholder="Username" onChange={handleChange} />
          <label for="passChangeConfirm">Confirm Password</label>
          <input type="text" id="passConfirmChange" placeholder="Username" onChange={handleChange} />
        </form>
      </div>
    </div>
  );
}

export default Settings;
