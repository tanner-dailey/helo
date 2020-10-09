import React, {Component} from 'react';
import axios from 'axios';

export default class Auth extends Component {
    constructor(){
        super();
        this.state = {
            username: '',
            password: ''
        }
    }

    handleInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleLogin = () => {
        const {username, password} = this.state

        axios.post('/auth/login', {username, password})
      .then(res => {
        this.props.getUser(res.data)
        this.setState({username: '', password: ''})
      })
      .catch(err => alert(err.response.request.response))
    }

    handleRegister = () => {
        const {username, password} = this.state

        axios.post('/auth/register', {username, password})
        .then(res => {
            this.setState({username: '', password: ''})
            this.props.getUser(res.data)
        })
        .catch(err => {
            this.setState({username: '', password: ''})
            alert(err.response.request.response)
        })
    }

    render(){
        return(
            <div>
                <h1>Helo</h1>
                <div className='authInput'>
                <p>Username:</p>
                    <input 
                        value={this.state.username}
                        name='username'
                        onChange={(e) => this.handleInput(e)}
                    />
                </div>
                <div className='authInput'>
                    <p>Password:</p>
                    <input 
                        type='password'
                        value={this.state.password}
                        name='password'
                        onChange={(e) => this.handleInput(e)}
                    />
                </div>
                <div className='authButtons'>
                    <button onClick={this.handleLogin}>Login</button>
                    <button onClick={this.handleRegister}>Register</button>
                </div>
            </div>
        )
    }
}