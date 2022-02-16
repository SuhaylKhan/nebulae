import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

function Servers() {
  const history = useHistory();

  const servers = useSelector(state => state.servers);

  return (
    <>
      <h1>User's Servers</h1>
      {Object.keys(servers).map(serverId => {
        const server = servers[serverId]
        return (
          <button
            key={server.id}
            onClick={() => history.push(`/servers/${server.id}/channels`)}
          >{server.name}</button>
        )
      })}
    </>
  )
}

export default Servers;
