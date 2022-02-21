import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { useServerContext } from '../../context/ServerContext';
import './Servers.css';

function Servers() {
  const servers = useSelector(state => state.servers);
  const { setServerId } = useServerContext();

  return (
    <>
      {Object.keys(servers).map(serverId => {
        const server = servers[serverId]
        return (
          <NavLink
            key={serverId}
            onClick={() => setServerId(server.id)}
            to={`/servers/${server.id}/channels`}
            exact={true}
            className='server-links'
            activeClassName='selected'
          >
            {server.name}
          </NavLink>
        )
      })}
      <NavLink
        to='/servers/new'
        exact={true}
        className='server-links'
        activeClassName='selected'
      >+</NavLink>
    </>
  )
}

export default Servers;
