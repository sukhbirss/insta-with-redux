import React,{useState,useEffect} from 'react';
import { showAlert,chghtmlsignup } from './../extra/extra';
import {useHistory} from 'react-router-dom';
import { signup } from "./../actions/user_actions";

import './signup.css';

const Signup = () => {

    const [photo,setPhoto] = useState("");
    const [picurl,setPicUrl] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [name, setName] = useState("");
  	const history = useHistory()

    const validateForm = () => {return email.length > 0 && password.length > 0;}
    const handleSubmit = (event) => {
    		event.preventDefault();
 			if(password !== passwordConfirm){
		       showAlert('erorr', 'password and confirm Password doest match');  
    		}
    	}
 	useEffect(()=>{
 		if(picurl){

   			let dataToSubmit = {name,
				 				email,
				 				password,
				 				passwordConfirm,
				 				photo:picurl
				 			};
 		if(password === passwordConfirm){
   			signup(dataToSubmit).then(response => {
	     		if(response.payload.status === "success"){		     
		         	 showAlert('success', 'signup successfully!');  
		         	 localStorage.setItem('jwt', response.payload.token);
		     		 localStorage.setItem('user',JSON.stringify(response.payload.user));
				 	 history.push('/')
		         }})}
	 		}
		
 	},[picurl])
	
	const userPic = () =>{
			
			if(photo !== ""){
				chghtmlsignup();
				const data = new FormData();
			    data.append("file",photo)
				data.append("upload_preset","sukhbir-insta")
				data.append("cloud_name","sukhbir")

				fetch("https://api.cloudinary.com/v1_1/sukhbir/image/upload",{
					method:"post",
					body:data
				})
				.then(res=>res.json())
				.then((data) => {
					console.log(data);
					setPicUrl(data.secure_url)
					console.log(picurl)
				})
				.catch(err =>console.log(err))
		}
		else{
		      showAlert('error', 'Please choose a pic');  

		}

};
	return (
		<>	
			<div className="container">
				<div className="wrapper">
				<div className="white-box">
					<div className="instagram-logo">
					    <img src="https://i.imgur.com/zqpwkLQ.png" />	    
					   
					    <p className="sukhbir">Instagram's Lil bro- by sukhbir singh</p>
					</div>
					<div className="form-signup">
						<form onSubmit={handleSubmit}>
							<input type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} className="input-1"/> <br/>
							<input type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} className="input-1"/> <br/>
							<input type="password" placeholder="Enter pass" value={password} onChange={e => setPassword(e.target.value)} className="input-1"/> <br/>
							<input type="password" placeholder="confirm pasword" value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} className="input-1" /> <br/>
							<input type="file" className="file" onChange={(e)=>setPhoto(e.target.files[0])} /> <br/> <br/>
							<button className="btn-signup" disabled={!validateForm()} type="submit" onClick={() => userPic()} > Signup </button>
						</form>
					</div>
				</div>
				</div>
			</div>
		</>
		);
};

export default Signup;