import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useServerContext } from '../../context/ServerContext';

function Servers() {
  const history = useHistory();
  const servers = useSelector(state => state.servers);
  const { setServerId } = useServerContext();

  return (
    <>
      {Object.keys(servers).map(serverId => {
        const server = servers[serverId]
        return (
          <button
            key={server.id}
            onClick={() => {
              setServerId(server.id);
              history.push(`/servers/${server.id}/channels`);
            }}
          >{server.name}</button>
        )
      })}
      <button onClick={() => history.push('/servers/new')}>+</button>
    </>
  )
}

export default Servers;
