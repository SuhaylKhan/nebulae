import { createContext, useContext, useState } from 'react';

export const ServerContext = createContext();

export function useServerContext() {
  return useContext(ServerContext);
}

export function ServerProvider(props) {
  const [serverId, setServerId] = useState('');

  return (
    <ServerContext.Provider value={{ serverId, setServerId }}>
      {props.children}
    </ServerContext.Provider>
  )
}
