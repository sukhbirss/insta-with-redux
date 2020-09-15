import React,{useState} from 'react';
import axios from 'axios';
import {useHistory,useParams} from 'react-router-dom'
import { showAlert } from './../extra/extra'
import './login.css';


const ResetPassword = () => {
  	const history = useHistory()
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
	const {token} = useParams();
	console.log("yoo",token);
    const validateForm = () => {return password.length > 0}
    const handleSubmit = (event) => event.preventDefault();
 
	const newPassword = async() =>{
		try{
		    const res = await axios({
		    	method:'POST',
		    	url: '/users/resetpassword',
		    	data: {
		    		token,
		    		password,
		    		passwordConfirm	    		
		    	}
		    });
		     if(res.data.status === "success"){
		     	showAlert('success', 'Done');
		     	console.log(res)
		     	history.push('/login')
		     }
	    }catch(err){
	    	showAlert('error', "Error");
	    }
	}

	return (
		<>	
			

			<div id="wrapper">
			  <div className="main-content">
			    <div className="header">
			      <img src="https://i.imgur.com/zqpwkLQ.png" alt="logo" />
			    </div>
			    <div className="l-part">
			    	<form onSubmit={handleSubmit}>
						<input type="password" placeholder="Enter new password" value={password} onChange={e => setPassword(e.target.value)} className="input-5"/> <br/>
						<input type="password" placeholder="Confirm pasword" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} className="input-5" /> <br/>
						
						<button block bsSize="large" disabled={!validateForm()} type="submit" onClick={() => newPassword()} className="btn-login"> Reset Password </button>
					</form>
			    </div>
			  </div>
			
			</div>
			
	</>
		);
};

export default ResetPassword;