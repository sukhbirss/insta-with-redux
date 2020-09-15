import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { showAlert } from './../extra/extra'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { followUser } from "./../actions/user_actions";
import { unFollowUser } from "./../actions/user_actions";
import { getAllUser } from "./../actions/user_actions";


const Follow = ({ followUser,getAllUser,unFollowUser, auth: {user}, userData:{allUser,followerids,followingids} }) => {
  useEffect(()=>{

    getAllUser();       
    
},[getAllUser]);

	return (<>
     {allUser !== null && followingids !== null ? 
	   <div className="adjust4">
      {allUser.map((el,i)=>{
    			 return(

    			     <div className="follow">                         
                  <img src={el.photo} alt="hfhd" className="dp"/>
                   <Link to={"/profile/"+el._id} className="black"><h2 className="fitthis">{el.name}</h2></Link>
                   {followingids.includes(el._id)

                   ?
                   <div>
                      <button className="follow-btn" onClick={() => unFollowUser(el._id)}>unfollow</button>  
                    </div>     
                  :
                   <div>
                      <button className="follow-btn" onClick={() => followUser(el._id)}>follow</button>  
                   </div>     

                   
                 }
           
                </div>
    			)
    })}
	</div>
   :
      <div className="loading">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
      </div>
            
     
     }
                    </>

		);
};

Follow.propTypes = {
  getAllUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired,
  unFollowUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  userData: state.userData
});

export default connect(mapStateToProps, { getAllUser,followUser,unFollowUser })(Follow);

