import * as React from "react";
import { API } from "../../utils";


class RegisterPg extends React.Component{
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
      return(
          <div>

        <br/><br/>

        <div className="register-inputs-div">
            <div className='input-with-label'>
                <label className='label-area' htmlFor="username">Username: </label>
                <input onChange={e => this.inputChangeHandler(e)} 
                name='username' type="text"/>
            </div>

            <div className='input-with-label'>
                <label className='label-area' htmlFor="username">Email: </label>
                <input onChange={e => this.inputChangeHandler(e)} 
                name='email' type="text"/>
            </div>

            <div className='input-with-label'>
                <label className='label-area' htmlFor="password">Password: </label>
                <input onChange={e => this.inputChangeHandler(e)} 
                type='password' name='password'/>
            </div>
            
            <div className='input-with-label'>
                <label className='label-area' htmlFor="password">Confirm Password: </label>
                <input onChange={e => this.inputChangeHandler(e)} 
                type='confirmPassword' name='password'/>
            </div>

            <div className="login-and-register-btns">
                <button onClick={()=> this.loginSubmitHandler()}>Login</button>
            </div>
        </div>

          </div>
      )
  }
}

export default RegisterPg;