import { useSelector } from 'react-redux';
import ServerPanel from './ServerPanel';

function Servers() {
  const servers = useSelector(state => state.servers);

  return (
    <>
      <h1>User's Servers</h1>
      {Object.keys(servers).map(serverId => {
        const server = servers[serverId]
        return <ServerPanel key={server.id} server={server} />
      })}
    </>
  )
}

export default Servers;
