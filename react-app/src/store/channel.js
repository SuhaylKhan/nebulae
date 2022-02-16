const SET_CHANNELS = 'channels/SET_CHANNELS';
const ADD_CHANNEL = 'channels/ADD_CHANNEL';

const initialState = {}

const setChannels = channels => ({
  type: SET_CHANNELS,
  payload: channels
})

const addChannel = channel => ({
  type: ADD_CHANNEL,
  payload: channel
})

export const loadChannels = serverId => async dispatch => {
  const response = await fetch(`/api/servers/${serverId}/channels`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setChannels(data.channels));
    return;
  }
}

export const createChannel = newChannel => async dispatch => {
  const response = await fetch('/api/channels/new', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      server_id: newChannel.serverId,
      name: newChannel.name,
      description: newChannel.description
    })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addChannel(data));
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
  let newState = {...state};
  switch (action.type) {
    case SET_CHANNELS:
      newState = action.payload.reduce((a, b) => {
        return {
          ...a,
          [b.id]: b
        }
      }, {})
      return newState;
    default:
      return state;
  }
}
