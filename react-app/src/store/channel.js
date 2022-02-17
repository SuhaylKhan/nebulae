const SET_CHANNELS = 'channels/SET_CHANNELS';
const ADD_CHANNEL = 'channels/ADD_CHANNEL';
const UPDATE_CHANNEL = 'channels/UPDATE_CHANNEL';
const REMOVE_ONE = 'channels/REMOVE_ONE';

const initialState = {}

const setChannels = channels => ({
  type: SET_CHANNELS,
  payload: channels
})

const addChannel = channel => ({
  type: ADD_CHANNEL,
  payload: channel
})

const updateChannel = channel => ({
  type: UPDATE_CHANNEL,
  payload: channel
})

const removeOne = channelId => ({
  type: REMOVE_ONE,
  payload: channelId
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

export const editChannel = channel => async dispatch => {
  const response = await fetch(`/api/channels/${channel.channelId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      channel_id: channel.channelId,
      name: channel.channelName,
      description: channel.channelDescription
    })
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(updateChannel(data));
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

export const deleteChannel = channelId => async dispatch => {
  const response = await fetch(`/api/channels/${channelId}/delete`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeOne(channelId))
    return 'DELETE SUCCESSFUL';
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
    case ADD_CHANNEL:
      newState[action.payload.id] = action.payload;
      return newState;
    case UPDATE_CHANNEL:
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_ONE:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
