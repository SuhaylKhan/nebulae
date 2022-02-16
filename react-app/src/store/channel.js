const SET_CHANNELS = 'channels/SET_SERVERS';

const initialState = {}

const setChannels = channels => ({
  type: SET_CHANNELS,
  payload: channels
})

export const loadChannels = serverId => async dispatch => {
  const response = await fetch(`/api/servers/${serverId}/channels`);

  if (response.ok) {
    const data = await response.json();
    dispatch(setChannels(data.channels));
    return;
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
