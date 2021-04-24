import React from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';
import './styles/home.css';

function Register() {
  const [form, setForm] = React.useState({
    email: '',
    username: '',
    password: '',
    confrimPass: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    birthdate: ''
  })

  const [step, setStep] = React.useState(1)

  const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: [e.target.value]
    });
  }

  return (
    <div className="login-reg-wrapper">
      <div className="login-reg-box">
        <img src={logo} />
        <h1>Create Account</h1>
        <div className="input-box">
          <form
            id="/userregister"
            action="back_end/server/createUser"
            method="POST"
          >
            {step === 1 ? (
              <div>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={updateForm}
                />
                <br />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={updateForm}
                />
                <br />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={updateForm}
                />
                <br />
                <input
                  type="password"
                  name="confirmPass"
                  placeholder="Confirm Password"
                  id="confirm-password"
                  onChange={updateForm}
                />
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  onChange={updateForm}
                />
                <br />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  onChange={updateForm}
                />
                <br />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  id="city"
                  onChange={updateForm}
                />
                <br />
                <input
                  type="text"
                  name="state"
                  placeholder="State"
                  id="state"
                  onChange={updateForm}
                />
                <br />
                <label for="DOB">Date of birth</label><br />
                <input
                  type="date"
                  name="birthdate"
                  placeholder="Date of Birth"
                  id="DOB"
                  onChange={updateForm}
                />
                <br />
                <input type="submit" value="Register" /><br />
              </div>
            ) : null}
            {step === 1 ? (
              <button type="button" onClick={() => setStep(step + 1)}>Next</button>
            ) : null}
          </form>
          <br />
        </div>
        <a href="/login">Log in instead</a><br />

        {/* 
          ------- Data check -------
          <p>email: {form.email}</p>
          <p>username: {form.username}</p>
          <p>password: {form.password}</p>
          <p>confirmPass: {form.confirmPass}</p>
          <p>firstName: {form.firstName}</p>
          <p>lastName: {form.lastName}</p>
          <p>city: {form.city}</p>
          <p>state: {form.state}</p>
          <p>DOB: {form.birthdate}</p>
          */}
      </div>
    </div>
  );
}

export default Register;
