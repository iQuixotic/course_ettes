import * as React from "react";
import { API } from "../../utils";


class RegisterPg extends React.Component{
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
        console.log(this.state)
    }

    registerSubmitHandler = () => {
        API.addNewUser(this.state)
            .then(res => console.log(res))
            .catch(err => { throw err })
    }

   

    

  // -----------------------------------
  render() {
      return(
        <div className="register-pg">

        <div className="left-side">
            <div className="left-side-page-info">
            <h4>The Amazing </h4>
                        <h4>Notecard App</h4>
                {/* <div className="actions">
                    <a className="btns" href="/register">Create an Account</a>
                </div> */}
                <div className="whats-new">
                    {/* <a className="btns" href="/register">Create an Account</a> */}
                    <a href="/#">About</a>
                    <a href="/#">Offer Support</a>
                    <a href="/#">Subscribe</a>
                </div>
            </div>
            <div id="dot1" className="dots"></div>
            <div id="dot2" className="dots"></div>
            <div id="dot3" className="dots"></div>
            <div id="dot4" className="dots"></div>
            <div id="dot5" className="dots"></div>
            <div id="dot6" className="dots"></div>
            <div id="dot7" className="dots"></div>
            <div id="dot8" className="dots"></div>
        </div>
        <div className="right-side">
            <div className="login-inputs-div">
            <h3>Welcome to Course-ettes!</h3>
                <div className="padding-around">
                    <label htmlFor="firstName">First Name: </label>
                    <input onChange={e => this.inputChangeHandler(e)}
                        name='firstName' type="text" />
                </div>
                <div className="padding-around">
                    <label htmlFor="lastName">Last Name: </label>
                    <input onChange={e => this.inputChangeHandler(e)}
                        name='lastName' type="text" />
                </div>
                <div className="padding-around">
                    <label htmlFor="email">Email </label>
                    <input onChange={e => this.inputChangeHandler(e)}
                        name='email' type="text" />
                </div>
                <div className="padding-around">
                    <label htmlFor="password">Password: </label>
                    <input onChange={e => this.inputChangeHandler(e)}
                        type='password' name='password' />
                </div>
    
                <div className="padding-around">
                    <label htmlFor="conf-password">Confirm Password: </label>
                    <input onChange={e => this.inputChangeHandler(e)}
                        type='password' name='conf-password' />
                </div>


                <div className="login-and-register-btns">
                    <button className="btns login" onClick={() => this.registerSubmitHandler()}>Submit</button>
                    <a className="btns register" href="/login">Login</a>
                </div>
                {/* <div className="forgot-password">
                    <a  href="#">Forgot Password</a>

                </div> */}
            </div>

        </div>


    </div>
      )
  }
}

export default RegisterPg;