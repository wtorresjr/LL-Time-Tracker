import { csrfFetch } from "./csrf";

const LOAD_HOURS = "hours/loadhours";
const ADD_HOURS = "hours/add-hours";
const DELETE_HOURS = "hours/delete-hours";

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

export const addHours = (addedHours) => {
  return {
    type: ADD_HOURS,
    addedHours,
  };
};

export const addHoursForClient = (hoursWorked, id) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/hours/add-hours/${+id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hoursWorked),
    });
    if (response.ok) {
      const newHoursAdded = await response.json();
      dispatch(addHours(newHoursAdded));
      return newHoursAdded;
    }
  } catch (err) {
    throw err;
  }
};

export const deleteHours = (removedHours) => {
  return {
    type: DELETE_HOURS,
    removedHours,
  };
};

export const deletePaidHours = (dayId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/hours/delete-hours/${dayId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const hoursToDel = await response.json();
      dispatch(deleteHours(hoursToDel));
      return hoursToDel;
    }
  } catch (err) {
    throw err;
  }
};

const initialState = {
  userHours: {
    All_Client_Pay: 0,
  },
  addedHours: {},
  removedHours: {},
};

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_HOURS:
      return { ...state, userHours: { ...action.employeehours } };
    case ADD_HOURS:
      return { ...state, addedHours: { ...action.addedHours } };
    case DELETE_HOURS:
      return { ...state, removedHours: { ...action.deleteHours } };

    default:
      return state;
  }
};

export default hoursReducer;
