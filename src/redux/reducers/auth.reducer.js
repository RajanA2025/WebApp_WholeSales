import { todoConstants } from '../constants';
import {toast} from 'react-toastify';
const authO = localStorage.getItem("authO");
const initialState = {

	loggedIn:authO
};

const todoReducer = (state = initialState, action) => {

	switch(action.type){
		case todoConstants.LOGGED_IN:
			return {
				...state,
				loggedIn:true
			}
		case todoConstants.LOGGED_OUT:
		toast.success("Logged Out Successfully.", {
							position: "top-right",
							autoClose: 2000,
							hideProgressBar: true,
							closeOnClick: true,
							pauseOnHover: true,
							draggable: true,
							progress: undefined,
						});
			return {
				...state,
				loggedIn:false
			}
		
		default:
			return state;
	}
}

export default todoReducer;