import { csrfFetch } from "./csrf";

const LOAD_HOURS = "hours/loadhours";

export const loadHours = (employeehours) => {
  return {
    type: LOAD_HOURS,
    employeehours,
  };
};

export const fetchHours = (employeeId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/hours`);
    const userHours = await response.json();
    dispatch(loadHours(userHours));
    return userHours;
  } catch (err) {
    throw err;
  }
};

const initialState = {};

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_HOURS:
      return { ...state, userHours: { ...action.employeehours } };
    default:
      return state;
  }
};

export default hoursReducer;
