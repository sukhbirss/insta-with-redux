import React,{useState,useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAlert } from './../extra/extra'
import {Link} from "react-router-dom";
import { unFollowUser,followUser } from "./../actions/user_actions";



const MyFollower = ({ unFollowUser,followUser, userData:{followingids} }) => {
  const [data,setData] = useState([]);
  useEffect(()=>{
      fetch("/users/follower",{
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
        setData(res.user.follower); 
        console.log(res)})
      .catch(err =>console.log(err))     
},[]);

  return (
     <div className="adjust4">
      {data.map((el,i)=>{
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
    );
};
MyFollower.propTypes = {
  unFollowUser: PropTypes.func.isRequired,
  followUser: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({

  userData: state.userData
});

export default connect(mapStateToProps, { unFollowUser,followUser })(MyFollower);
