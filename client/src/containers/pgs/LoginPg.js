import * as React from "react";
import { API } from "../../utils";


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

                        <a href="#">Forgot Password...</a>
                        <div className="login-and-register-btns">
                            <button onClick={() => this.loginSubmitHandler()}>Login</button>
                        </div>
                    </div>
                </div>


            </div>
        )
    }
}

export default LoginPg;