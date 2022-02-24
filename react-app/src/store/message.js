const SET_MESSAGES = 'message/SET_MESSAGES';
const ADD_MESSAGE = 'message/ADD_MESSAGE';
const REMOVE_ONE = 'message/REMOVE_ONE';
const EDIT_MESSAGE = 'message/EDIT_MESSAGE';

const initialState = {};

const setMessages = messages => ({
  type: SET_MESSAGES,
  payload: messages
})

const addMessage = message => ({
  type: ADD_MESSAGE,
  payload: message
})

const removeOne = messageId => ({
  type: REMOVE_ONE,
  payload: messageId
})

const editMessage = message => ({
  type: EDIT_MESSAGE,
  payload: message
})

export const loadMessages = channelId => async dispatch => {
  const response = await fetch(`/api/channels/${channelId}/messages`);

  if (response.ok) {
    const data = await response.json()
    dispatch(setMessages(data.messages));
    return;
  }
}

export const createMessage = message => async dispatch => {
  const response = await fetch(`/api/messages/new`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: message.userId,
      channel_id: message.channelId,
      content: message.content
    })
  })

  if (response.ok) {
    const data = await response.json();
    dispatch(addMessage(data));
    return;
  }
}

export const deleteMessage = message => async dispatch => {
  const response = await fetch(`/api/messages/${message.messageId}/delete`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeOne(message.messageId));
    return;
  }
}

export const updateMessage = message => async dispatch => {
  const response = await fetch(`/api/messages/${message.messageId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      content: message.content
    })
  })
  if (response.ok) {
    const data = await response.json();

    if (data.errors) {
      return data.errors;
    }

    dispatch(editMessage(data));
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
    case ADD_MESSAGE:
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_ONE:
      delete newState[action.payload];
      return newState;
    case EDIT_MESSAGE:
      newState[action.payload.id] = action.payload;
      return newState;
    default:
      return state;
  }
}
