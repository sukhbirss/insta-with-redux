import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { showAlert } from './../extra/extra'
import {Link} from "react-router-dom";
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMe } from "./../actions/user_actions";
import { deleteMyPost } from "./../actions/user_actions";

import './me.css'


const Me = ({ getMe, auth: {user} , userData:{posts} }) => {

  useEffect(()=>{
      getMe(); 
      
},[getMe]);

const trashPost = async(id,postedById) =>{
    let dataToSubmit = {
            id,
            postedById
          }  
    deleteMyPost(dataToSubmit);

    showAlert('success', 'post deleted successfully!');

};

       
	return (<>
      {posts !== null && user !== null ?
        <div className="adjust-profile">
        <div className="pboxx">

                  <div className="profilepic">
                  {user.photo !== "default.jpg"
                      ?
                      <img src={user.photo} alt="profile pic" className="profilepic" />  
                      :
                      <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="profile pic" className="profilepic" />  

                  }
                  </div>
                  <div className="myname">
                      <h3>{user.name}</h3>
                  </div>
                  <div className="details">
                    <div className="layer">
                       <h2>post</h2>
                    <Link to="/follower" className="black"><h2  className="text-white" >follower</h2></Link>
                    <Link to="/following" className="black" ><h2  className="text-white" >following</h2></Link>

                    </div>
                    <div className="layer layer2">
                       <h2>{posts.length}</h2>
                       <h2>{user.follower.length}</h2>
                    
                       <h2>{user.following.length}</h2>
                    </div>
                    <div className="layer3">
                       <p>Bio coming soon</p>

                    </div>
                  </div>
                </div>
       <div className="adjust3">

          {
            posts.map((el,i)=>{
               return(
                 <div className="boxx" key={i}>

                      <div className="dp-wrap" key={i}>
                            <i class="delete material-icons"  onClick={() => trashPost(el._id,el.postedBy._id)}>delete</i>

                      </div>
                      <div className=" me cardtemp">
                          <img src={el.photo} alt={el.text} className="me image"/>  
                    
                      </div>

                      <div className="me-hc heart-comment">
                                            
                            <i class="material-icons big">favorite_border</i>                           
                              <h4>{el.likes.length} likes</h4>

                           <div className="noofcomments">   
                            <h4>{el.comment.length} comments</h4>
                          </div>
                      </div>

                      

                      <div className="post-info-me">                 
                        <h4>-{el.text}</h4>           
                      </div>

                      <div className="box show-comments">
                          {el.comment.map((ell,i)=>{if(i<3){return(<div className="commsectionn">
                                                                        <h3>{ell.username}:</h3>
                                                                        <h4>{ell.text}</h4>
                                                                      </div>
                                                                  )}})}
                      </div>
                  </div>
                      )
                             }

              )}
       </div>
        <div className="postbtn">
            <Link to="/post" className="black">  <i className="post material-icons">add</i> </Link>
           
        </div>
        </div>
      :
      <div>feching</div>
    }
    </> 
	)
}

Me.propTypes = {
  getMe: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  userData: state.userData,
  auth: state.auth
});

export default connect(mapStateToProps, { getMe })(Me);



