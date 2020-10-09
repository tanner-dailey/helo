import React, {Component} from 'react';
import axios from 'axios';
import {getUser} from '../../ducks/reducer'
import { connect } from 'react-redux';

class Auth extends Component {
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

        axios.post('/api/login', {username, password})
      .then(res => {
        this.props.getUser(res.data)
        this.props.history.push('/dashboard')
      })
      .catch(err => console.log(err))
    }

    handleRegister = () => {
        const {username, password} = this.state

        axios.post('/api/register', {username, password})
        .then(res => {
            this.props.getUser(res.data)
            this.props.history.push('/dashboard')
        })
        .catch(err => console.log(err))
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

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps, {getUser})(Auth)