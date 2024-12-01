import axios from "axios";
import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED_SUCCESS,
  LOAD_USER_FAIL,
} from "../auth/types";

export const login = (email, password) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post(
      `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
      body,
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(load_user());
    
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const load_user = () => async (dispatch) => {
  if (localStorage.getItem("access")) {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.getItem("access")}`,
        Accept: "application/json",
      },
    }
    try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/auth/jwt/users/me/`,
          body,
          config
        );
    
        dispatch({
          type: USER_LOADED_SUCCESS,
          payload: res.data,
        });
    
        dispatch(load_user());
      } catch (err) {
        dispatch({
          type: LOAD_USER_FAIL,
        })
      }
    }
    else
    {
        dispatch({
            type: LOAD_USER_FAIL,
        });
    }
  }
};
