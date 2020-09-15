import React,{useState,useContext} from 'react';
import {useHistory} from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert,chghtmllogin } from './../extra/extra'
import './login.css';
import {Link} from "react-router-dom";
import { loginUser } from "./../actions/user_actions";


const Login = ({ loginUser, auth: { token,user,isAuthenticated} }) => {
  	const history = useHistory()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const validateForm = () => {return email.length > 0 && password.length > 0;}
    const handleSubmit = (event) => {
    	event.preventDefault();
		chghtmllogin();
		let dataToSubmit = {
		    		email,
		    		password
		    	}
  		loginUser(dataToSubmit)
}

	if (isAuthenticated) {
		showAlert('success', 'Logged in successfully!');
		localStorage.setItem('jwt', token);
		history.push('/');
      } 


	return (
		<>	
			
			<div className="container">
				<div id="wrapper">
				  <div className="main-content">
				    <div className="header">
				      <img src="https://i.imgur.com/zqpwkLQ.png" />
				    </div>
				    <div className="l-part">
				    	<form onSubmit={handleSubmit}>
	  						
							<input type="text" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}  className="input-5" />
					      <div className="overlap-text">
							<input type="password" placeholder="Enter pass" value={password} onChange={e => setPassword(e.target.value)} className="input-5" />
					        <Link to="/Forgotpassword">Forgot password??</Link>
					      </div>
							<button block bsSize="large" disabled={!validateForm()} type="submit" className="btn-login"> Login </button>
						</form>
				    </div>
				  </div>
				  <div className="sub-content">
				    <div className="s-part">
				      Don't have an account? <Link to="/signup">Sign up </Link>
				    </div>
				  </div>
				</div>
			</div>
			
	</>
		);
};
Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);

