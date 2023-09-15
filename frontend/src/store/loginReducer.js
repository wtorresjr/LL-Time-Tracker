const CHECKCRED = "user/auth";


export const checkUserCred = (userCred) => async (dispatch) => {
  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userCred),
  });
  if (response.ok) {
    console.log("User Logged In");
  } else {
    console.log("Log In Failed");
  }
};



const initialState = { entries: [], isLoading: true };

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default loginReducer;
