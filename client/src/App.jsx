import React,{ useReducer,useEffect } from 'react';
import { Route,Switch,useHistory } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login'
import PostIt from './components/PostIt'
import Follow from './components/Follow'
import Following from './components/Following'
import follower from './components/Follower'
import Me from './components/Me'
import Card2 from './components/Card2'
import ForgotPassword from './components/SendResetToken'
import ResetPassword from './components/ResetPassword'
import Navbar from './Navbar'
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from "./actions/user_actions";
import { LOGOUT} from './actions/types';


const Routing = ()=>{
  return(
  			<Switch>
			    <Route exact path="/" component={Card2}/>
			    <Route path="/signup" component={Signup}/>
			    <Route exact path="/login" component={Login}/>
			    <Route path="/post" component={PostIt}/>
			    <Route path="/find" component={Follow}/>
			    <Route path="/following" component={Following}/>
			    <Route path="/follower" component={follower}/>
			    <Route path="/me" component={Me}/>
			    <Route path="/forgotpassword" component={ForgotPassword}/>
			    <Route path="/reset/:token" component={ResetPassword}/>
			</Switch>
  )
}

const App = () => {
  useEffect(() => {

  	if(localStorage.jwt){
  		store.dispatch(loadUser());
  	}

    if (!localStorage.getItem("jwt") && window.location.pathname !=="/login") {
		window.location.replace("/login");
    }

	window.addEventListener('storage', () => {
      if (!localStorage.jwt) store.dispatch({ type: LOGOUT });
      window.location.replace("/login");
    });

  }, []);

	return (
		<>
		    <Provider store={store}>
				<Navbar/>	
 			 	<Routing />
    		</Provider>
		</>
		);
};
export default App;