import Axios from "axios";
import Cookie from 'js-cookie';
import {
  USER_SIGNIN_REQUEST, USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL, USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGOUT, USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL
} from "../constants/userConstants";

const update = ({ id, email, password }) => async dispatch => {
  try {
  dispatch({ type: USER_UPDATE_REQUEST, payload: { id, email, password } });
  const { data } = await Axios.put("http://localhost:3000/guestupdate/"+ id, { email, password });
  dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  Cookie.set('userInfo', JSON.stringify(data));
  } catch (error) {
  dispatch({ type: USER_UPDATE_FAIL, payload: error.message });
  }
  Cookie.remove("userInfo");
window.location.replace("http://localhost:3001/");
  };

const signin = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await Axios.post("http://localhost:3000/guest/login", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    console.log(data);
    console.log("-------")
    console.log(Cookie.get('userInfo')+ "cookie signed in")

  } catch (error) {
    dispatch({ type: USER_SIGNIN_FAIL, payload: error.message });
    console.log(error.message+ "not signed in");
  }
}

const register = (name, email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { name, email, password } });
  try {
    const { data } = await Axios.post("http://localhost:3000/guest/addguest", { name, email, password, point: 0, discount: 0 });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
    Cookie.set('userInfo', JSON.stringify(data));
    alert("Register Success")
    alert("Please Sign In")
  } 

  catch (error) {
    dispatch({ type: USER_REGISTER_FAIL, payload: error.message });
  }
}

const logout = () => (dispatch) => {
  Cookie.remove("userInfo");
  dispatch({ type: USER_LOGOUT })
}
export { signin, register, logout, update };