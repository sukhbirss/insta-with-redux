import React,{useState} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import { showAlert } from './../extra/extra'
import './login.css';


const ForgotPassword = () => {
  	const history = useHistory()
    const [email, setEmail] = useState("");

    const validateForm = () => {return email.length > 0}
    const handleSubmit = (event) => event.preventDefault();
 
	const sendMail = async() =>{
		try{
		    const res = await axios({
		    	method:'POST',
		    	url: '/users/forgotpassword',
		    	data: {
		    		email		    		
		    	}
		    });
		     if(res.data.status === "success"){
		     	showAlert('success', 'Check Your Email');
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
						<input type="text" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)}  className="input-5" />
						<button block bsSize="large" disabled={!validateForm()} type="submit" onClick={() => sendMail()} className="btn-login"> Reset Passwoerd </button>
					</form>
			    </div>
			  </div>
			
			</div>
			
	</>
		);
};

export default ForgotPassword;