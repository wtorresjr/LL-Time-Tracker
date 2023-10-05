const LOAD_HOURS = "hours/loadhours";

export const loadHours = (employeehours) => {
  return {
    type: LOAD_HOURS,
    employeehours,
  };
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
