import * as React from "react";
import { API } from "../../utils";
import { FaceBookLogo, TwitterLogo, GoogleLogo } from '../../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class LoginPg extends React.Component {
    state = {
        username: '',
        password: '',
        role_id: 1,
    }

    inputChangeHandler = (e) => {
        this.setState({
            [e.currentTarget.name]: e.currentTarget.value
        })
        console.log(this.state)
    }

    loginSubmitHandler = () => {
        API.login(this.state)
            .then(res => res.json())
            .then(res => window.localStorage.setItem("token", res.token))
            .catch(err => { throw err })
    }

    // -----------------------------------
    render() {
        return (
            <div className="login-pg">

                <div className="left-side">
                    <div className="left-side-page-info">
                        <h3>Welcome to Course-ettes!</h3>
                        <div className="actions">
                            <a className="btns" href="/register">Create an Account</a>
                        </div>
                        <div className="whats-new">
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
                        <div className="padding-around">
                            <label htmlFor="username">Username: </label>
                            <input onChange={e => this.inputChangeHandler(e)}
                                name='username' type="text" />
                        </div>
                        <div className="padding-around">
                            <label htmlFor="password">Password: </label>
                            <input onChange={e => this.inputChangeHandler(e)}
                                type='password' name='password' />
                        </div>

                        <div className="login-and-register-btns">
                            <button className="btns login" onClick={() => this.loginSubmitHandler()}>Login</button>
                            <a className="btns register" onClick={() => this.registerSubmitHandler()}>Forgot Password</a>
                        </div>
                        {/* <div className="forgot-password">
                            <a  href="#">Forgot Password</a>

                        </div> */}
                    </div>

                    <div className="alt-login-area">
                        <div className="login-with">Login With</div>
                        <div className="alt-login-icons">
                            <i className="alt-children fab fa-google"></i>
                            <i className="alt-children fab fa-facebook"></i>
                            <i className="alt-children fab fa-twitter"></i>
                        </div>

                    </div>

                </div>


            </div>
        )
    }
}

export default LoginPg;