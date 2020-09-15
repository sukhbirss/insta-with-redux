import axios from 'axios';
import { LOGIN_SUCCESS,GET_ME,USER_LOADED ,DELETE_POST,ALL_USER,FOLLOWING,FOLLOWER,FOLLOW,UNFOLLOW} from '../actions/types';
import store from '../store';

export const loginUser = (dataToSubmit) => dispatch => {
    axios.post('users/login',dataToSubmit)
                .then(response => {
                     dispatch({
                                type: LOGIN_SUCCESS,
                                payload: response.data
                              })
                      dispatch({
                          type: FOLLOWING,
                          payload: response.data
                               })
                      dispatch({
                          type: FOLLOWER,
                          payload: response.data
                      })
                })
                 .catch((err)=>(err.response))         
}

export const loadUser = () => dispatch => {
    axios.get('users',{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
              .then(response => {
    
                    dispatch({
                          type: USER_LOADED,
                          payload: response.data
                      })
                    dispatch({
                          type: FOLLOWING,
                          payload: response.data
                      })
                    dispatch({
                          type: FOLLOWER,
                          payload: response.data
                      })
              })
        .catch((err)=>(err.response))         
}

export const deleteMyPost = (dataToSubmit) =>{

store.dispatch({
          type: DELETE_POST,
         payload: dataToSubmit.id
      
      })

    // axios.delete('/users/post/mypost',data: {id,postedById}{headers:{
    //                         "Content-Type":"application/json",
    //                         "Authorization":"Bearer " + localStorage.getItem("jwt")
    //                       }})
    //           .then(response => 
    //                 dispatch({
    //                       type: DELETE_POST,
    //                       payload: dataToSubmit.id
    //                   })
    //           )
    //     .catch((err)=>(err.response))         
}

export const getMe = (dataToSubmit) => dispatch => {

        fetch("/users/post/mypost",{
        method:'post',
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer " + localStorage.getItem("jwt")
          }
        })
        .then(res=>res.json())
        .then(response => {
              dispatch({
                          type: GET_ME,
                          payload: response
                      })
            }
                  )  
        .catch((err)=>(console.log("error",err)))         
}

export const getAllUser = (dataToSubmit) => dispatch => {
    axios.get('users/alluser')
                .then(response => 
                     dispatch({
                                type: ALL_USER,
                                payload: response.data.user
                              })
                )
                 .catch((err)=>(err.response))              
}
// export const getAllfollowing = (dataToSubmit) => dispatch => {
//     axios.get('users/following')
//                 .then(response => 
//                      dispatch({
//                                 type: POPULATED_FOLLOWING,
//                                 payload: response.data.user.following
//                               })
//                 )
//                  .catch((err)=>(err.response))              
// }

export const followUser = (id) => dispatch => {
    axios.patch('users/follow',{id},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
                .then(response =>{
                          dispatch(loadUser());
                          console.log("this")
                          dispatch({
                                    type: FOLLOW,
                                    payload:id
                                })
                          
                          })
                .catch((err)=>(err.response))                        
}
export const unFollowUser = (id) => dispatch => {
    axios.patch('users/unfollow',{id},{headers:{
                            "Content-Type":"application/json",
                            "Authorization":"Bearer " + localStorage.getItem("jwt")
                          }})
                .then(response =>{
                          dispatch(loadUser());
                          dispatch({
                                    type: UNFOLLOW,
                                    payload:id
                                })
                          
                          })
                .catch((err)=>(err.response))                        
}

export async function signup(dataToSubmit){
    
    const request = await axios.post('/users/signup',dataToSubmit)           
                               .then(response => response.data)
                               .catch((err)=>(err.response))
            
    
    return {
        type: "SIGNUP",
        payload: request
    }
}
