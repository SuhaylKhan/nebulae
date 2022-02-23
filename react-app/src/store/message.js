const SET_MESSAGES = 'message/SET_MESSAGES';

const initialState = {};

const setMessages = messages => ({
  type: SET_MESSAGES,
  payload: messages
})

export const loadMessages = channelId => async dispatch => {
  const response = await fetch(`/api/channels/${channelId}/messages`);

  if (response.ok) {
    const data = await response.json()
    console.log(data)
    dispatch(setMessages(data.messages));
    return;
  }
}

export default function reducer(state = initialState, action) {
  let newState = {...state};
  switch (action.type) {
    case SET_MESSAGES:
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
