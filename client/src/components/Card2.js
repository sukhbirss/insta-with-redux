import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from './../extra/extra'
import {Link,useHistory} from "react-router-dom";
import { loadPost,likePost,unLikePost,commenting } from "../actions/post_actions";

import './card2.css';


const Card2 = ({ loadPost,likePost,unLikePost,commenting, post:{allpost}, auth: {user},userData:{followingids} }) => {


useEffect(()=>{
    
    loadPost();
        
       console.log("yo")
   
},[loadPost]);

  const addComment = async(comment,id) =>{

      commenting(comment,id)
};  




	return (
    <>
    {followingids !== null && followingids.length !== 0 ? 
    <>
          {allpost !== null ? 
            <>
                <div className="adjust2">
                  {
                    allpost.map((el,i)=>{
                       return(
                        <>
                              <div className="dp-wrap" key={i}>
                                  <img  src={el.postedBy.photo} alt={el.text} className="dp"/>
                                  <Link to={"/profile/"+el.postedBy._id} className="blk"> <h2>{el.postedBy.name}</h2> </Link>
                              </div>

                              <div className="cardtemp">
                                  <img src={el.photo} alt={el.text} className="image"/>  
                                  <form onSubmit={(e)=>{
                                    e.preventDefault() 
                                    addComment(e.target[0].value,el._id) }} className="comment" >
                                     <input type="comment" placeholder="Enter text" className="input-3"/> 
                                 </form>              
                              </div>

                              <div className="heart-comment">
                                     {el.likes.includes(user._id)
                                     ?  
                                     <i class="material-icons big icon-red red-text"  onClick={() => unLikePost(el._id)}>favorite</i>
                                     :
                                     <i class="material-icons big"  onClick={() => likePost(el._id)}>favorite_border</i>
                                     }
                                   <div className="nooflikes"> 
                                      <h4>{el.likes.length} likes</h4>
                                  </div>
                                   <div className="noofcomments"> 
                                      <h4>{el.comment.length} comments</h4>
                                  </div>
                              </div>

                              

                              <div className="post-info">                 
                                <h3>{el.postedBy.name}</h3>
                                <h4>-{el.text}</h4>           
                              </div>

                              <div className="fit">
                                  {el.comment.map((ell,i)=>{if(i<3){return(<div className="commsection">
                                                                                <h3>{ell.username}:</h3>
                                                                                <h4>{ell.text}</h4>
                                                                              </div>
                                                                          )}})}
                              </div>
                       </>
                              )
                                     }
                      )}
                </div>
                <div className="version">
                  <p>Version 3.0</p>
                </div>
                <div className="postbtn">
                    <Link to="/post">  <i className="post material-icons">add</i> </Link>
                </div>
              </>
            :
            <div className="loading">
              <div className="bounce1"></div>
              <div className="bounce2"></div>
              <div className="bounce3"></div>
            </div>
            
           
           }
           </>
 :
     <div className="loading2">
          <p>Please Follow someone to see their posts</p>
          <p>------click on Find in Navbar------</p>

     </div>
     
      }
    </>
	)
};

Card2.propTypes = {
  loadPost: PropTypes.func.isRequired,
  likePost: PropTypes.func.isRequired,
  commenting: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired

};

const mapStateToProps = (state) => ({
  auth: state.auth,
  post: state.post,
  userData: state.userData
});

export default connect(mapStateToProps, { loadPost,likePost,unLikePost,commenting })(Card2);

