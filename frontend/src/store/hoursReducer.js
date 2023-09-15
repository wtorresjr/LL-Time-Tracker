const LOAD_HOURS = "hours/loadhours";

export const loadHours = (employeehours) => {
  return {
    type: LOAD_HOURS,
    employeehours,
  };
};

export const fetchHours = () => async (dispatch) => {
  const response = await fetch("/api/hours");
  const employeehours = await response.json();

  if (response.ok) {
    dispatch(loadHours(employeehours));
  } else {
    console.log(response.statusText);
  }
};

const initialState = { entries: [], isLoading: true };

const hoursReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_HOURS:
      return { ...state, entries: [...action.employeehours] };
    default:
      return state;
  }
};

export default hoursReducer;
