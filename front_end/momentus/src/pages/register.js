import React, { useEffect, useState } from 'react';
import './styles/login-reg.css';
import logo from '../assets/momentus.png';
import './styles/home.css';
import axios from "axios";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from 'react-alert';
import CryptoJS from 'crypto-js';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/loginActions';


/*
TODO: Fix fields so they fit our requirements (length, etc)
Make it so you can't skip fields, currently you can click to end with blank fields 
*/
function Register() {
  const history = useHistory();
  const dispatch = useDispatch();
  const alert = useAlert();
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
  const [birthdate, setBirthdate] = useState(); // for displaying date in form
  const [step, setStep] = useState(1);

  // "/newUser?email="+email+"&username="+username+"&password="+hash.toString(CryptoJS.enc.Base64)+"&firstName="+firstName+"&lastName="+lastName+"&city="+city+"&state="+state+"&DOB="+DOB
  function submit(e) {
    var hash = CryptoJS.SHA256(form.password);
    e.preventDefault();
    var newUserURL = "/newUser?email=" + form.email + "&username=" + form.username + "&password=" + hash.toString(CryptoJS.enc.Base64) + "&firstName=" + form.firstName + "&lastName=" + form.lastName + "&city=" + form.city + "&state=" + form.state + "&DOB=" + form.birthdate
    console.log(newUserURL)
    axios.post(newUserURL)
      .then(result => {
        console.log(result.data);
        console.log("user registered");
        // log user in after registration if successful
        if (result.data == 1) {
          alert.show('Registration succesful! Welcome to Momentus.')
          loginAfterRegistration();
          //history.push('/login');
        }
      })
  }

  function loginAfterRegistration() {
    // fix this later
    axios.post('/verifyUser', {
      username: form.username,
      password: form.password,
    })
      .then(res => {
        console.log("logged in");
        console.log(res);
      })
      .catch(function (error) {
        console.log(error);
      });
    dispatch(userLogin(form.username));
    history.push('/');
  }

  function updateForm(e) {
    const formdata = { ...form }
    formdata[e.target.name] = e.target.value
    setForm(formdata)
    console.log(formdata)
  }

  // this gets called by handleDate, which formats it properly
  // do not call manually!
  function updateDate(e) {
    const formdata = { ...form }
    formdata.birthdate = e
    setForm(formdata)
    console.log(formdata)
  }


  function handleDate(date) {
    setBirthdate(date)
    let month = '' + (date.getMonth() + 1)
    let day = '' + date.getDate()
    let year = date.getFullYear();
    // add leading zeroes if necessary for sql
    if (day < 10) {
      day = '0' + day;
    }
    if (month < 10) {
      month = '0' + month;
    }
    console.log(month)
    console.log(day)
    console.log(year)
    let fullDOB = new String("")
    fullDOB = year + "-" + month + "-" + day;
    console.log(fullDOB)
    updateDate(fullDOB)
  }

  function nextStep() {
    // checks to see if first part of the form is filled out before moving to next
    if ((form.email != "") && (form.username != "") && (form.password != "") && (form.confirmPass != "")) {
      // check if passwords match
      if (form.password == form.confirmPass) {
        // move to next step
        setStep(step + 1)
      }

      else {
        alert.show('Passwords do not match.')
      }
    }
    else {
      alert.show('Please fill out all fields before continuing.')
    }


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
            onSubmit={(e) => submit(e)}
          >
            {step === 1 ? (
              <div>
                <input
                  type="email"
                  value={form.email}
                  name="email"
                  placeholder="Email"
                  required
                  maxlength="50"
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.username}
                  name="username"
                  placeholder="Username"
                  maxlength="35"
                  required
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="password"
                  value={form.password}
                  name="password"
                  placeholder="Password"
                  maxlength="45"
                  required
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="password"
                  name="confirmPass"
                  placeholder="Confirm Password"
                  id="confirm-password"
                  maxlength="45"
                  required
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
                  maxlength="50"
                  required
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.lastName}
                  name="lastName"
                  placeholder="Last Name"
                  maxlength="50"
                  required
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.city}
                  name="city"
                  placeholder="City"
                  maxlength="45"
                  id="city"
                  required
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <input
                  type="text"
                  value={form.state}
                  name="state"
                  placeholder="State"
                  id="state"
                  maxlength="2"
                  required
                  onChange={(e) => updateForm(e)}
                />
                <br />
                <div className="DOB-box">
                  <label htmlFor="DOB">Date of birth</label>
                  {/* <input
                  type="date"
                  value={form.birthdate}
                  name="birthdate"
                  placeholder="Date of Birth"
                  id="DOB"
                  onChange={(e) => updateForm(e)}
                /> */}
                  <DatePicker
                    id="DOB"
                    name="DOB"
                    selected={birthdate} onChange={date => handleDate(date)}
                  />
                </div>
                <input className="reg-input" type="submit" value="Register" /><br />
              </div>
            ) : null}
            {step === 1 ? (
              <button type="button" className="next-button" onClick={nextStep}>Next</button>
            ) : null}
          </form>
        </div>
        <a href="/login">Log in instead</a>
        <br />
        <br />


        {/* ------- Data check -------
          <p>email: {form.email}</p>
          <p>username: {form.username}</p>
          <p>password: {form.password}</p>
          <p>confirmPass: {form.confirmPass}</p>
          <p>firstName: {form.firstName}</p>
          <p>lastName: {form.lastName}</p>
          <p>city: {form.city}</p>
          <p>state: {form.state}</p>
          <p>DOB: {form.birthdate}</p> */}

      </div>
    </div>
  );
}

export default Register;
