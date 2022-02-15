const ADD_SERVER = 'server/ADD_SERVER';

const initialState = { servers: null }

const addServer = server => ({
  type: ADD_SERVER,
  payload: server
})

export const createServer = newServer => async dispatch => {
  const response = fetch('/api/servers/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      admin_id: newServer.adminId,
      name: newServer.name
    })
  })

  if (response.ok) {
    const data = await response.json
    if (data.errors) {
      return;
    }

    dispatch(addServer(data));
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_SERVER:
      const newState = {...state};
      newState.servers[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}
