import { csrfFetch } from "./csrf";

const ADD_CLIENT = "clients/add-clients";
const GET_CLIENT_LIST = "clients/get-all-clients";
const DELETE_CLIENT = "clients/delete-client";
const RESET_CLIENT_LIST = "clients/reset-client-list";

export const fetchClients = (clientList) => {
  return {
    type: GET_CLIENT_LIST,
    clientList,
  };
};

export const fetchClientList = () => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/clients`);
    if (response.ok) {
      const allClients = await response.json();
      dispatch(fetchClients(allClients));
      return allClients;
    }
  } catch (err) {
    throw err;
  }
};

export const addClient = (newClient) => {
  return {
    type: ADD_CLIENT,
    newClient,
  };
};

export const addNewClient = (clientInfo) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/clients/add`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(clientInfo),
    });
    if (response.ok) {
      const newClientCreated = await response.json();
      dispatch(addClient(newClientCreated));
      return newClientCreated;
    }
  } catch (err) {
    throw err;
  }
};

const deleteClient = (deletedClient) => {
  return {
    type: DELETE_CLIENT,
    deletedClient,
  };
};

export const deleteFromClients = (clientId) => async (dispatch) => {
  try {
    const response = await csrfFetch(`/api/clients/delete/${clientId}`, {
      method: "DELETE",
    });
    const clientDeleted = await response.json();
    dispatch(deleteClient(clientDeleted));
    dispatch(fetchClientList());
    return clientDeleted;
  } catch (err) {
    throw err;
  }
};

export const resetClient = () => {
  return {
    type: RESET_CLIENT_LIST,
  };
};

const initialState = {
  clients: [],
};

const clientReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CLIENT:
      return {
        ...state,
        clients: [...state.clients, action.newClient],
      };
    case GET_CLIENT_LIST:
      return {
        ...state,
        clients: action.clientList,
      };
    case DELETE_CLIENT:
      // Ensure state.clients is an array before applying filter
      const clientsArray = Array.isArray(state.clients) ? state.clients : [];

      const updatedClients = clientsArray.filter(
        (client) => client.id !== action.deletedClient.id
      );
      return {
        ...state,
        clients: updatedClients,
      };
    case RESET_CLIENT_LIST:
      const logoutState = {
        ...state,
        clients: null,
      };
      return logoutState;
    default:
      return state;
  }
};

export default clientReducer;
