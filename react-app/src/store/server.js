const ADD_SERVER = 'server/ADD_SERVER';
const SET_SERVERS = 'server/SET_SERVERS';
const REMOVE_ALL = 'server/REMOVE_ALL';

const initialState = {}

const addServer = server => ({
  type: ADD_SERVER,
  payload: server
})

const setServers = servers => ({
  type: SET_SERVERS,
  payload: servers
})

const removeAll = () => ({
  type: REMOVE_ALL
})

export const createServer = newServer => async dispatch => {
  const response = await fetch('/api/servers/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      admin_id: newServer.adminId,
      name: newServer.name,
    })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addServer(data));
    return data;

  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data;
    }

  } else {
    return { errors: ['An error occurred. Please try again.']}
  }
}

export const loadServers = userId => async dispatch => {
  const response = await fetch(`api/users/${userId}/servers`)

  if (response.ok) {
    const data = await response.json();
    dispatch(setServers(data.servers));
    return;
  }
}

export const removeAllServers = () => async dispatch => {
  dispatch(removeAll());
  return;
}

export default function reducer(state = initialState, action) {
  let newState = {...state}
  switch (action.type) {
    case ADD_SERVER:
      newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState;
    case SET_SERVERS:
      newState = action.payload.reduce((a, b) => {
        return {
          ...a,
          [b.id]: b
        }
      }, {})
      return newState;
    case REMOVE_ALL:
      newState = {};
      return newState;
    default:
      return state;
  }
}
