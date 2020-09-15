import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from './../extra/extra'
import {Link} from "react-router-dom";
import { unFollowUser,followUser } from "./../actions/user_actions";

const MyFollowing = ({ unFollowUser,followUser, userData:{followingids} }) => {
  const [data,setData] = useState([]);
  useEffect(()=>{
      fetch("/users/following",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
      })
      .then(res=>res.json())
      .then(res => {
        if(res.message ==="jwt expired"){
          localStorage.clear()
                  window.location.replace("/login");
        }
        setData(res.user.following); 
        console.log(res)})
      .catch(err =>console.log(err))     
},[]);


	return (
	   <div className="adjust4">

      {data.map((el,i)=>{
    			 return(

    			     <div className="follow">                         
                  <img src={el.photo} alt="hfhd" className="dp"/>
                  <Link to={"/profile/"+el._id} className="black"><h2 className="text-white fitthis" >{el.name}</h2></Link>                
                   {followingids.includes(el._id)

                   ?
                   <div>
                      <button className="follow-btn" onClick={() => unFollowUser(el._id)}>unfollow</button>  
                    </div>     
                  :
                   <div>
                      <button className="follow-btn" onClick={() => followUser(el._id)}>undo</button>  
                    </div>   
                   
                 }

                </div>
    			)

    })}
  	</div>
		);
};

MyFollowing.propTypes = {
  unFollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

  userData: state.userData
});

export default connect(mapStateToProps, { unFollowUser,followUser })(MyFollowing);

