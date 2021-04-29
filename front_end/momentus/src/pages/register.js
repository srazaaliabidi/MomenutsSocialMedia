import React, { useEffect, useState } from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentuslogo.png';
import './styles/home.css';
import axios from "axios";

function Register() {
  const [form, setForm] = useState({
    email: '',
    username: '',
    password: '',
    confirmPass: '',
    firstName: '',
    lastName: '',
    city: '',
    state: '',
    birthdate: ''
  });
  const [step, setStep] = useState(1);


  function submit(e) {
    e.preventDefault();
    axios.post('/newUser', {
      email: form.email,
      username: form.username,
      password: form.password,
      firstName: form.firstName,
      lastName: form.lastName,
      city: form.city,
      state: form.state,
      birthdate: form.birthdate
    })
      .then(result => {
        console.log(result.data)
      })
  }

  function updateForm(e) {
    const formdata = { ...form }
    formdata[e.target.name] = e.target.value
    setForm(formdata)
    console.log(formdata)
  }
  /*const updateForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
try {
    axios
    .post ('newUser',form)
      .then (response => {console.log(response)});
    }
    catch (err) {
      console.error(err.message);
    }
*/
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
            onSubmit={(e) => submit(e)}
          >
            {step === 1 ? (
              <div>
                <input
                  type="email"
                  value={form.email}
                  name="email"
                  placeholder="Email"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.username}
                  name="username"
                  placeholder="Username"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="password"
                  value={form.password}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="password"
                  name="confirmPass"
                  placeholder="Confirm Password"
                  id="confirm-password"
                  onChange={(e) => updateForm(e)}
                />
              </div>
            ) : null}

            {step === 2 ? (
              <div>
                <input
                  type="text"
                  value={form.firstName}
                  name="firstName"
                  placeholder="First Name"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.city}
                  name="city"
                  placeholder="City"
                  id="city"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.state}
                  name="state"
                  placeholder="State"
                  id="state"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <label htmlFor="DOB">Date of birth</label><br />
                <input
                  type="date"
                  value={form.birthdate}
                  name="birthdate"
                  placeholder="Date of Birth"
                  id="DOB"
                  onChange={(e) => updateForm(e)}
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
