import React from 'react';
import{withRouter, Link} from 'react-router-dom';
import {connect} from 'react-redux'


const Nav = props => {
    console.log(props)
    return (
        <div>
            {
                props.location.pathname !== '/'
                ? (<nav>
                    <Link to='/dashboard'>Home</Link>
                    <Link to='/new'>New Post</Link>
                    <Link to='/'>Logout</Link>
                </nav>)
                : null
            }
        </div>
    )
} 

const mapStateToProps = reduxState => reduxState;

export default connect(mapStateToProps)(withRouter(Nav))