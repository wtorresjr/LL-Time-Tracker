import { resetClient } from "./clientReducer";
import { csrfFetch } from "./csrf";
import { resetHours } from "./hoursReducer";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const signUpNewUser = (user) => async (dispatch) => {
  try {
    const { firstName, lastName, email, password } = user;
    const response = await csrfFetch("/api/signup", {
      method: "POST",
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password,
      }),
    });
    const data = await response.json();
    dispatch(setUser(data.user));
    return response;
  } catch (err) {
    throw err;
  }
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/login", {
    method: "DELETE",
  });
  dispatch(removeUser());
  dispatch(resetHours());
  dispatch(resetClient());
  return response;
};

export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/login", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  console.log(data, "Session Reducer");
  dispatch(setUser(data.user));
  return response;
};

export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/login");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

const initialState = { user: null };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = { user: null };

      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
