import React from 'react';
import {Link} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const Navbar = ({ auth: { isAuthenticated } }) => {
	const logout =()=>{
		localStorage.clear()
		window.location.replace("/login");
	}
	   const renderList = ()=>{
	   	
       if(isAuthenticated){

           return [
            	<Link to="/" className="black">        <div className="home text-white">  Home     </div></Link>,
			    <button className="btn" onClick={logout}> Logout </button>,
				<Link to="/find" className="black">   <span className="text-white"> Find  </span> </Link>
           ]
       }else{
         return [
				<Link to="/signup">    <span className="text-white">  signup     </span> </Link>,
				<Link to="/login">   <span className="text-white"> login  </span> </Link>

         
         ]
       }
     }
      const me = ()=>{
       if(localStorage.getItem("user")){
           return (
           		<div className="loggeddiv">
           		<Link to="/me" className="black"><img src={JSON.parse(localStorage.getItem("user")).photo} alt="dp" className="loggedin"/></Link>
           			<Link to="/me" className="black"><h3 className="loggedname">{JSON.parse(localStorage.getItem("user")).name}</h3></Link>

           		</div>
           	)
           
       }
   }
	return ( 

		<div className="navbar">
			<div className="text-flex">
			
			   {renderList()}
			   {me()}
			</div>
		</div>
		
	)
}
Navbar.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Navbar);

