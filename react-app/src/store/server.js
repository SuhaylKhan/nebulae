const ADD_SERVER = 'server/ADD_SERVER';

const initialState = {}

const addServer = server => ({
  type: ADD_SERVER,
  payload: server
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

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVER:
      const newState = {...state};
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}
