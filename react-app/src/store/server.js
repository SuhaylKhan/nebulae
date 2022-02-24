import { removeAllChannels } from "./channel";

const ADD_SERVER = 'server/ADD_SERVER';
const SET_SERVERS = 'server/SET_SERVERS';
const REMOVE_ALL = 'server/REMOVE_ALL';
const UPDATE_SERVER = 'server/UPDATE_SERVER';
const REMOVE_ONE = 'server/REMOVE_ONE';

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

const updateServer = server => ({
  type: UPDATE_SERVER,
  payload: server
})

const removeOne = serverId => ({
  type: REMOVE_ONE,
  payload: serverId
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
  const response = await fetch(`/api/users/${userId}/servers`)

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

export const editServer = (serverId, serverName) => async dispatch => {
  const response = await fetch(`/api/servers/${serverId}/edit`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: serverName
    })
  })

  if (response.ok) {
    const data = await response.json()
    dispatch(updateServer(data));
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

export const deleteServer = serverId => async dispatch => {
  const response = await fetch(`/api/servers/${serverId}/delete`, {
    method: 'DELETE'
  })

  if (response.ok) {
    dispatch(removeOne(serverId));
    return 'DELETE SUCCESSFUL';
  } else {
    return { errors: ['An error occurred. Please try again.']}
  }
}

export const joinServer = (inviteLink, userId) => async dispatch => {
  const linkComponents = inviteLink.split('/');
  let serverName;
  let serverId;

  if (linkComponents.length === 4) {
    const serverDetails = linkComponents[3].split('#');
    linkComponents.splice(3, 1, ...serverDetails);
    serverName = linkComponents[3];
    serverId = parseInt(linkComponents[4], 10);

    if (linkComponents[0] !== 'https:' || linkComponents[1] !== '' ||
        linkComponents[2] !== 'nebulae.gg' || isNaN(serverId)) {
          return {errors: ['Link is invalid']};
    }
  } else if (linkComponents.length === 1) {
    const serverDetails = linkComponents[0].split('#');
    linkComponents.splice(0, 1, ...serverDetails);
    serverName = linkComponents[0];
    serverId = parseInt(linkComponents[1], 10);

    if (isNaN(serverId)) {
      return {errors: ['Link is invalid']};
    }
  } else {
    return {errors: ['Link is invalid']};
  }

  const response = await fetch(`/api/servers/${serverId}/join`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: userId,
      server_id: serverId,
      server_name: serverName
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

export const leaveServer = (serverId, userId) => async dispatch => {
  const response = await fetch(`/api/servers/${serverId}/leave`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      user_id: userId,
      server_id: serverId
    })
  })

  if (response.ok) {
    dispatch(removeOne(serverId));
    dispatch(removeAllChannels());
    return 'LEAVE SUCCESSFUL';
  } else {
    return { errors: ['An error occurred. Please try again.']}
  }
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
    case UPDATE_SERVER:
      newState[action.payload.id] = action.payload;
      return newState;
    case REMOVE_ONE:
      delete newState[action.payload];
      return newState;
    default:
      return state;
  }
}
